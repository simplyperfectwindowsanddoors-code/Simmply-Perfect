import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const smtpUser = process.env.SMTP_USER;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  // Helps keep the submission process fast
  pool: true,
  maxConnections: 3,
  maxMessages: 50,
  connectionTimeout: 8000,
  greetingTimeout: 8000,
  socketTimeout: 15000,
});

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      service,
      message,
    } = body;

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !service?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    if (!smtpUser) {
      console.error("SMTP_USER is missing");

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured",
        },
        {
          status: 500,
        }
      );
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanPhone = phone.trim();
    const cleanService = service.trim();
    const cleanMessage = message.trim();

    // ============================================================
    // EMAIL 1
    // SEND INQUIRY TO SIMMPLY PERFECT
    // ============================================================

    const adminMail = {
      from: `"Simmply Perfect" <${smtpUser}>`,

      to: "simplyperfectwindowsanddoors@gmail.com",

      // Clicking Reply in Gmail will reply to the person
      // who submitted the form.
      replyTo: cleanEmail,

      subject: `New Website Inquiry - ${cleanService}`,

      text: `
New Contact Form Submission

Name: ${cleanName}
Email: ${cleanEmail}
Phone: ${cleanPhone}
Service: ${cleanService}

Message:
${cleanMessage}

Submitted through:
Simmply Perfect Website
      `.trim(),

      html: `
        <!DOCTYPE html>

        <html>
        <body
          style="
            margin:0;
            padding:0;
            background:#f4f7fb;
            font-family:Arial,Helvetica,sans-serif;
            color:#172033;
          "
        >

          <div
            style="
              max-width:650px;
              margin:30px auto;
              background:#ffffff;
              border-radius:16px;
              overflow:hidden;
              border:1px solid #e5e7eb;
            "
          >

            <!-- HEADER -->

            <div
              style="
                background:#0A2E6F;
                padding:28px;
                color:#ffffff;
              "
            >

              <div
                style="
                  font-size:12px;
                  letter-spacing:1.5px;
                  text-transform:uppercase;
                  opacity:0.8;
                "
              >
                Simmply Perfect
              </div>

              <h2
                style="
                  margin:8px 0 0;
                  font-size:24px;
                "
              >
                New Website Inquiry
              </h2>

            </div>

            <!-- CONTENT -->

            <div style="padding:28px;">

              <p>
                <strong>Name:</strong>
                ${escapeHtml(cleanName)}
              </p>

              <p>
                <strong>Email:</strong>
                ${escapeHtml(cleanEmail)}
              </p>

              <p>
                <strong>Phone:</strong>
                ${escapeHtml(cleanPhone)}
              </p>

              <p>
                <strong>Service:</strong>
                ${escapeHtml(cleanService)}
              </p>

              <p>
                <strong>Message:</strong>
              </p>

              <div
                style="
                  background:#f8fafc;
                  border:1px solid #e2e8f0;
                  padding:16px;
                  border-radius:10px;
                  line-height:1.7;
                  white-space:pre-wrap;
                "
              >
                ${escapeHtml(cleanMessage)}
              </div>

            </div>

            <!-- FOOTER -->

            <div
              style="
                padding:18px 28px;
                background:#f8fafc;
                border-top:1px solid #e5e7eb;
                color:#64748b;
                font-size:12px;
              "
            >
              Submitted through the Simmply Perfect website.
            </div>

          </div>

        </body>
        </html>
      `,
    };

    // ============================================================
    // EMAIL 2
    // SEND CONFIRMATION TO THE USER
    // ============================================================

    const userMail = {
      /*
       * IMPORTANT:
       * This is sent FROM Simmply Perfect.
       */
      from: `"Simmply Perfect" <${smtpUser}>`,

      /*
       * The person who submitted the form.
       */
      to: cleanEmail,

      subject: "Thank You for Contacting Simmply Perfect",

      text: `
Dear ${cleanName},

Thank you for contacting Simmply Perfect.

We have successfully received your inquiry regarding:

${cleanService}

Our team will review your requirements and get back to you as soon as possible.

Your submitted details:

Name: ${cleanName}
Phone: ${cleanPhone}
Service: ${cleanService}

Message:
${cleanMessage}

Thank you for choosing Simmply Perfect.

Regards,
Simmply Perfect
Windows & Doors
      `.trim(),

      html: `
        <!DOCTYPE html>

        <html>
        <body
          style="
            margin:0;
            padding:0;
            background:#f4f7fb;
            font-family:Arial,Helvetica,sans-serif;
            color:#172033;
          "
        >

          <div
            style="
              max-width:650px;
              margin:30px auto;
              background:#ffffff;
              border-radius:16px;
              overflow:hidden;
              border:1px solid #e5e7eb;
            "
          >

            <!-- HEADER -->

            <div
              style="
                background:#0A2E6F;
                padding:32px 28px;
                color:#ffffff;
              "
            >

              <div
                style="
                  font-size:12px;
                  letter-spacing:1.5px;
                  text-transform:uppercase;
                  opacity:0.8;
                "
              >
                Simmply Perfect
              </div>

              <h1
                style="
                  margin:10px 0 0;
                  font-size:26px;
                "
              >
                Thank You for Contacting Us
              </h1>

            </div>

            <!-- CONTENT -->

            <div style="padding:30px;">

              <p
                style="
                  font-size:16px;
                  line-height:1.7;
                "
              >
                Dear <strong>${escapeHtml(cleanName)}</strong>,
              </p>

              <p
                style="
                  font-size:15px;
                  line-height:1.7;
                  color:#475569;
                "
              >
                Thank you for contacting
                <strong>Simmply Perfect</strong>.
                We have successfully received your inquiry and
                our team will review your requirements.
              </p>

              <p
                style="
                  font-size:15px;
                  line-height:1.7;
                  color:#475569;
                "
              >
                We will get back to you as soon as possible.
              </p>

              <!-- INQUIRY DETAILS -->

              <div
                style="
                  margin-top:25px;
                  padding:20px;
                  background:#f8fafc;
                  border:1px solid #e2e8f0;
                  border-radius:12px;
                "
              >

                <h3
                  style="
                    margin-top:0;
                    color:#0A2E6F;
                  "
                >
                  Your Inquiry
                </h3>

                <p>
                  <strong>Service:</strong>
                  ${escapeHtml(cleanService)}
                </p>

                <p>
                  <strong>Phone:</strong>
                  ${escapeHtml(cleanPhone)}
                </p>

                <p>
                  <strong>Message:</strong>
                </p>

                <div
                  style="
                    background:#ffffff;
                    padding:14px;
                    border-radius:8px;
                    border:1px solid #e2e8f0;
                    line-height:1.6;
                    white-space:pre-wrap;
                  "
                >
                  ${escapeHtml(cleanMessage)}
                </div>

              </div>

              <p
                style="
                  margin-top:28px;
                  font-size:15px;
                  line-height:1.7;
                  color:#475569;
                "
              >
                Thank you for choosing
                <strong>Simmply Perfect</strong>.
              </p>

            </div>

            <!-- FOOTER -->

            <div
              style="
                padding:22px 28px;
                background:#f8fafc;
                border-top:1px solid #e5e7eb;
              "
            >

              <p
                style="
                  margin:0;
                  font-size:14px;
                  font-weight:bold;
                  color:#0A2E6F;
                "
              >
                Simmply Perfect
              </p>

              <p
                style="
                  margin:5px 0 0;
                  font-size:12px;
                  color:#64748b;
                "
              >
                Windows & Doors
              </p>

            </div>

          </div>

        </body>
        </html>
      `,
    };

    // ============================================================
    // SEND BOTH EMAILS
    // ============================================================

    await Promise.all([
      transporter.sendMail(adminMail),
      transporter.sendMail(userMail),
    ]);

    // ============================================================
    // SUCCESS
    // ============================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "Inquiry submitted successfully. A confirmation email has been sent to your email address.",
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("EMAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to submit inquiry. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}