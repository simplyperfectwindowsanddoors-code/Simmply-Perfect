import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

/* =========================================================
   CATALOG REQUEST TYPE
========================================================= */

type CatalogRequestBody = {
  name?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  contact?: string;
  message?: string;
};

/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================================
   POST /api/catalogs
========================================================= */

export async function POST(req: Request) {
  try {
    /* =====================================================
       READ REQUEST BODY
    ===================================================== */

    const body = (await req.json()) as CatalogRequestBody;

    /*
     * Supports both naming formats:
     *
     * name / fullName
     * phone / contact
     *
     * This prevents frontend/backend naming mismatch.
     */

    const name = body.name || body.fullName || "";
    const email = body.email || "";
    const phone = body.phone || body.contact || "";
    const message =
      body.message ||
      "Customer requested access to the Simmply Perfect digital catalogue library.";

    /* =====================================================
       VALIDATE REQUIRED FIELDS
    ===================================================== */

    if (!name.trim() || !email.trim() || !phone.trim()) {
      console.error("CATALOG API VALIDATION ERROR:", {
        receivedBody: body,
      });

      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide your full name, email address, and mobile number.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       VALIDATE EMAIL
    ===================================================== */

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       VALIDATE PHONE
    ===================================================== */

    const cleanPhone = phone.replace(/\D/g, "");

    /*
     * Supports:
     *
     * 10-digit Indian mobile number
     * 12-digit number containing country code 91
     */

    if (cleanPhone.length < 10 || cleanPhone.length > 12) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid mobile number.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       GET SMTP ENVIRONMENT VARIABLES
    ===================================================== */

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    /* =====================================================
       CHECK SMTP CONFIGURATION
    ===================================================== */

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.error(
        "CATALOG API ERROR: Missing SMTP environment variables",
      );

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    /* =====================================================
       CREATE SUBMISSION DATE
    ===================================================== */

    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    /* =====================================================
       SANITIZE VALUES
    ===================================================== */

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = escapeHtml(phone.trim());

    const safeMessage = escapeHtml(message.trim()).replace(
      /\n/g,
      "<br />",
    );

    /* =====================================================
       CREATE SMTP TRANSPORTER
    ===================================================== */

    const transporter = nodemailer.createTransport({
      host: smtpHost,

      port: Number(smtpPort),

      secure: Number(smtpPort) === 465,

      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    /* =====================================================
       SEND EMAIL
    ===================================================== */

    const mailResult = await transporter.sendMail({
      from: `"Simmply Perfect Catalogues" <${smtpUser}>`,

      to: smtpUser,

      replyTo: email.trim(),

      subject: `New Catalogue Access Request - ${name.trim()}`,

      text: `
NEW CATALOGUE ACCESS REQUEST

CUSTOMER DETAILS

Full Name: ${name.trim()}
Email Address: ${email.trim()}
Mobile Number: ${phone.trim()}

REQUEST DETAILS

${message.trim()}

SUBMITTED AT

${submittedAt}
      `,

      html: `
        <!DOCTYPE html>

        <html lang="en">
          <head>
            <meta charset="UTF-8" />

            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />

            <title>
              New Catalogue Access Request
            </title>
          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background-color: #f1f5f9;
              font-family: Arial, Helvetica, sans-serif;
            "
          >
            <div
              style="
                width: 100%;
                padding: 30px 15px;
                box-sizing: border-box;
              "
            >
              <div
                style="
                  width: 100%;
                  max-width: 620px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border: 1px solid #e2e8f0;
                  border-radius: 16px;
                  overflow: hidden;
                  box-shadow: 0 10px 40px rgba(15, 23, 42, 0.08);
                "
              >

                <!-- HEADER -->

                <div
                  style="
                    background-color: #071224;
                    padding: 28px 30px;
                  "
                >
                  <p
                    style="
                      margin: 0 0 8px 0;
                      color: #93c5fd;
                      font-size: 11px;
                      font-weight: 700;
                      letter-spacing: 2px;
                      text-transform: uppercase;
                    "
                  >
                    Simmply Perfect Group
                  </p>

                  <h1
                    style="
                      margin: 0;
                      color: #ffffff;
                      font-size: 24px;
                      line-height: 1.3;
                    "
                  >
                    New Catalogue Access Request
                  </h1>

                  <p
                    style="
                      margin: 10px 0 0 0;
                      color: #94a3b8;
                      font-size: 13px;
                      line-height: 1.6;
                    "
                  >
                    A visitor has requested access to the
                    Simmply Perfect digital catalogue library.
                  </p>
                </div>

                <!-- CONTENT -->

                <div
                  style="
                    padding: 28px 30px;
                  "
                >

                  <h2
                    style="
                      margin: 0 0 16px 0;
                      color: #071224;
                      font-size: 17px;
                    "
                  >
                    Customer Details
                  </h2>

                  <table
                    role="presentation"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      width: 100%;
                      border-collapse: collapse;
                    "
                  >

                    <tr>
                      <td
                        style="
                          width: 38%;
                          padding: 12px 0;
                          border-bottom: 1px solid #f1f5f9;
                          color: #64748b;
                          font-size: 13px;
                        "
                      >
                        Full Name
                      </td>

                      <td
                        style="
                          padding: 12px 0;
                          border-bottom: 1px solid #f1f5f9;
                          color: #071224;
                          font-size: 13px;
                          font-weight: 700;
                        "
                      >
                        ${safeName}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          width: 38%;
                          padding: 12px 0;
                          border-bottom: 1px solid #f1f5f9;
                          color: #64748b;
                          font-size: 13px;
                        "
                      >
                        Email Address
                      </td>

                      <td
                        style="
                          padding: 12px 0;
                          border-bottom: 1px solid #f1f5f9;
                          color: #071224;
                          font-size: 13px;
                          font-weight: 700;
                        "
                      >
                        ${safeEmail}
                      </td>
                    </tr>

                    <tr>
                      <td
                        style="
                          width: 38%;
                          padding: 12px 0;
                          border-bottom: 1px solid #f1f5f9;
                          color: #64748b;
                          font-size: 13px;
                        "
                      >
                        Mobile Number
                      </td>

                      <td
                        style="
                          padding: 12px 0;
                          border-bottom: 1px solid #f1f5f9;
                          color: #071224;
                          font-size: 13px;
                          font-weight: 700;
                        "
                      >
                        ${safePhone}
                      </td>
                    </tr>

                  </table>

                  <!-- REQUEST INFORMATION -->

                  <h2
                    style="
                      margin: 28px 0 12px 0;
                      color: #071224;
                      font-size: 17px;
                    "
                  >
                    Request Information
                  </h2>

                  <div
                    style="
                      padding: 16px;
                      background-color: #f8fafc;
                      border: 1px solid #e2e8f0;
                      border-left: 4px solid #0A2E6F;
                      border-radius: 8px;
                      color: #334155;
                      font-size: 13px;
                      line-height: 1.7;
                    "
                  >
                    ${safeMessage}
                  </div>

                  <!-- SUBMISSION DATE -->

                  <div
                    style="
                      margin-top: 26px;
                      padding-top: 20px;
                      border-top: 1px solid #e2e8f0;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        color: #94a3b8;
                        font-size: 11px;
                        line-height: 1.6;
                      "
                    >
                      Submitted on ${submittedAt}
                    </p>
                  </div>

                </div>

                <!-- FOOTER -->

                <div
                  style="
                    padding: 18px 30px;
                    background-color: #f8fafc;
                    border-top: 1px solid #e2e8f0;
                    text-align: center;
                  "
                >
                  <p
                    style="
                      margin: 0;
                      color: #94a3b8;
                      font-size: 10px;
                      line-height: 1.6;
                    "
                  >
                    Automated catalogue access notification
                    from Simmply Perfect Group.
                  </p>
                </div>

              </div>
            </div>
          </body>
        </html>
      `,
    });

    /* =====================================================
       LOG SUCCESS
    ===================================================== */

    console.log("CATALOG EMAIL SENT SUCCESSFULLY:", {
      messageId: mailResult.messageId,
      customer: name.trim(),
      email: email.trim(),
    });

    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Your details have been registered successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    /* =====================================================
       ERROR HANDLING
    ===================================================== */

    console.error("CATALOG EMAIL API ERROR:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Failed to process catalogue access request.";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      {
        status: 500,
      },
    );
  }
}