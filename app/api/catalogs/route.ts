import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

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
   SMTP CONFIGURATION
========================================================= */

const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

/* =========================================================
   REUSABLE SMTP TRANSPORTER
========================================================= */

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,

  secure: smtpPort === 465,

  auth: {
    user: smtpUser,
    pass: smtpPass,
  },

  /*
   * Connection pooling helps avoid creating
   * a completely new SMTP connection every time.
   */
  pool: true,
  maxConnections: 3,
  maxMessages: 50,

  connectionTimeout: 8000,
  greetingTimeout: 8000,
  socketTimeout: 15000,
});

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

    const name = body.name || body.fullName || "";
    const email = body.email || "";
    const phone = body.phone || body.contact || "";

    const message =
      body.message ||
      "Customer requested access to the Simmply Perfect digital catalogue library.";

    /* =====================================================
       VALIDATE REQUIRED FIELDS
    ===================================================== */

    if (
      !name.trim() ||
      !email.trim() ||
      !phone.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please provide your full name, email address, and mobile number.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       VALIDATE EMAIL
    ===================================================== */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       VALIDATE PHONE
    ===================================================== */

    const cleanPhone = phone.replace(/\D/g, "");

    if (
      cleanPhone.length < 10 ||
      cleanPhone.length > 12
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid mobile number.",
        },
        {
          status: 400,
        }
      );
    }

    /* =====================================================
       CHECK SMTP CONFIGURATION
    ===================================================== */

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPass
    ) {
      console.error(
        "CATALOG API ERROR: Missing SMTP configuration."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Email service is not configured.",
        },
        {
          status: 500,
        }
      );
    }

    /* =====================================================
       CLEAN VALUES
    ===================================================== */

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    const safeName =
      escapeHtml(cleanName);

    const safeEmail =
      escapeHtml(cleanEmail);

    const safePhone =
      escapeHtml(phone.trim());

    const safeMessage =
      escapeHtml(cleanMessage).replace(
        /\n/g,
        "<br />"
      );

    /* =====================================================
       SUBMISSION DATE
    ===================================================== */

    const submittedAt =
      new Date().toLocaleString(
        "en-IN",
        {
          timeZone: "Asia/Kolkata",
          dateStyle: "medium",
          timeStyle: "short",
        }
      );

    /* =====================================================
       EMAIL 1
       SEND TO SIMMPLY PERFECT
    ===================================================== */

    const adminEmail = {
      /*
       * Email is sent FROM Simmply Perfect.
       */
      from: `"Simmply Perfect Catalogues" <${smtpUser}>`,

      /*
       * Your Simmply Perfect email.
       */
      to: "simplyperfectwindowsanddoors@gmail.com",

      /*
       * When you press Reply in Gmail,
       * it replies directly to the customer.
       */
      replyTo: cleanEmail,

      subject:
        `New Catalogue Access Request - ${cleanName}`,

      text: `
NEW CATALOGUE ACCESS REQUEST

CUSTOMER DETAILS

Full Name: ${cleanName}
Email Address: ${cleanEmail}
Mobile Number: ${phone.trim()}

REQUEST DETAILS

${cleanMessage}

SUBMITTED AT

${submittedAt}
      `.trim(),

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
    margin:0;
    padding:0;
    background:#f1f5f9;
    font-family:Arial,Helvetica,sans-serif;
  "
>

  <div
    style="
      width:100%;
      padding:30px 15px;
      box-sizing:border-box;
    "
  >

    <div
      style="
        width:100%;
        max-width:620px;
        margin:0 auto;
        background:#ffffff;
        border:1px solid #e2e8f0;
        border-radius:16px;
        overflow:hidden;
      "
    >

      <!-- HEADER -->

      <div
        style="
          background:#071224;
          padding:28px 30px;
        "
      >

        <p
          style="
            margin:0 0 8px;
            color:#93c5fd;
            font-size:11px;
            font-weight:700;
            letter-spacing:2px;
            text-transform:uppercase;
          "
        >
          Simmply Perfect Group
        </p>

        <h1
          style="
            margin:0;
            color:#ffffff;
            font-size:24px;
            line-height:1.3;
          "
        >
          New Catalogue Access Request
        </h1>

        <p
          style="
            margin:10px 0 0;
            color:#94a3b8;
            font-size:13px;
            line-height:1.6;
          "
        >
          A visitor has requested access to the
          Simmply Perfect digital catalogue library.
        </p>

      </div>

      <!-- CONTENT -->

      <div
        style="
          padding:28px 30px;
        "
      >

        <h2
          style="
            margin:0 0 16px;
            color:#071224;
            font-size:17px;
          "
        >
          Customer Details
        </h2>

        <table
          role="presentation"
          cellpadding="0"
          cellspacing="0"
          style="
            width:100%;
            border-collapse:collapse;
          "
        >

          <tr>

            <td
              style="
                width:38%;
                padding:12px 0;
                border-bottom:1px solid #f1f5f9;
                color:#64748b;
                font-size:13px;
              "
            >
              Full Name
            </td>

            <td
              style="
                padding:12px 0;
                border-bottom:1px solid #f1f5f9;
                color:#071224;
                font-size:13px;
                font-weight:700;
              "
            >
              ${safeName}
            </td>

          </tr>

          <tr>

            <td
              style="
                width:38%;
                padding:12px 0;
                border-bottom:1px solid #f1f5f9;
                color:#64748b;
                font-size:13px;
              "
            >
              Email Address
            </td>

            <td
              style="
                padding:12px 0;
                border-bottom:1px solid #f1f5f9;
                color:#071224;
                font-size:13px;
                font-weight:700;
              "
            >
              ${safeEmail}
            </td>

          </tr>

          <tr>

            <td
              style="
                width:38%;
                padding:12px 0;
                border-bottom:1px solid #f1f5f9;
                color:#64748b;
                font-size:13px;
              "
            >
              Mobile Number
            </td>

            <td
              style="
                padding:12px 0;
                border-bottom:1px solid #f1f5f9;
                color:#071224;
                font-size:13px;
                font-weight:700;
              "
            >
              ${safePhone}
            </td>

          </tr>

        </table>

        <!-- REQUEST -->

        <h2
          style="
            margin:28px 0 12px;
            color:#071224;
            font-size:17px;
          "
        >
          Request Information
        </h2>

        <div
          style="
            padding:16px;
            background:#f8fafc;
            border:1px solid #e2e8f0;
            border-left:4px solid #0A2E6F;
            border-radius:8px;
            color:#334155;
            font-size:13px;
            line-height:1.7;
          "
        >
          ${safeMessage}
        </div>

        <div
          style="
            margin-top:26px;
            padding-top:20px;
            border-top:1px solid #e2e8f0;
          "
        >

          <p
            style="
              margin:0;
              color:#94a3b8;
              font-size:11px;
            "
          >
            Submitted on ${submittedAt}
          </p>

        </div>

      </div>

      <!-- FOOTER -->

      <div
        style="
          padding:18px 30px;
          background:#f8fafc;
          border-top:1px solid #e2e8f0;
          text-align:center;
        "
      >

        <p
          style="
            margin:0;
            color:#94a3b8;
            font-size:10px;
          "
        >
          Catalogue request received through
          Simmply Perfect Group website.
        </p>

      </div>

    </div>

  </div>

</body>

</html>
      `,
    };

    /* =====================================================
       EMAIL 2
       SEND CONFIRMATION TO CUSTOMER
    ===================================================== */

    const customerEmail = {
      /*
       * IMPORTANT:
       * The email is sent FROM Simmply Perfect.
       */
      from: `"Simmply Perfect" <${smtpUser}>`,

      /*
       * Customer's email address.
       */
      to: cleanEmail,

      subject:
        "Your Simmply Perfect Catalogue Request",

      text: `
Dear ${cleanName},

Thank you for requesting the Simmply Perfect catalogue.

We have successfully received your details and your catalogue request.

Our team will be happy to assist you with any further information you may require.

Your submitted details:

Name: ${cleanName}
Email: ${cleanEmail}
Mobile: ${phone.trim()}

Request:
${cleanMessage}

Thank you for choosing Simmply Perfect.

Regards,
Simmply Perfect
Windows & Doors
      `.trim(),

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
    Simmply Perfect Catalogue
  </title>

</head>

<body
  style="
    margin:0;
    padding:0;
    background:#f1f5f9;
    font-family:Arial,Helvetica,sans-serif;
    color:#172033;
  "
>

  <div
    style="
      width:100%;
      padding:30px 15px;
      box-sizing:border-box;
    "
  >

    <div
      style="
        width:100%;
        max-width:620px;
        margin:0 auto;
        background:#ffffff;
        border:1px solid #e2e8f0;
        border-radius:16px;
        overflow:hidden;
      "
    >

      <!-- HEADER -->

      <div
        style="
          background:#0A2E6F;
          padding:32px 30px;
        "
      >

        <p
          style="
            margin:0 0 8px;
            color:#bfdbfe;
            font-size:11px;
            font-weight:700;
            letter-spacing:2px;
            text-transform:uppercase;
          "
        >
          Simmply Perfect
        </p>

        <h1
          style="
            margin:0;
            color:#ffffff;
            font-size:25px;
            line-height:1.3;
          "
        >
          Thank You for Your Request
        </h1>

        <p
          style="
            margin:10px 0 0;
            color:#dbeafe;
            font-size:13px;
            line-height:1.6;
          "
        >
          Your catalogue request has been received successfully.
        </p>

      </div>

      <!-- CONTENT -->

      <div
        style="
          padding:30px;
        "
      >

        <p
          style="
            margin:0 0 18px;
            font-size:16px;
            line-height:1.7;
          "
        >
          Dear
          <strong>${safeName}</strong>,
        </p>

        <p
          style="
            margin:0 0 18px;
            color:#475569;
            font-size:15px;
            line-height:1.8;
          "
        >
          Thank you for requesting the
          <strong>Simmply Perfect</strong>
          catalogue.
        </p>

        <p
          style="
            margin:0;
            color:#475569;
            font-size:15px;
            line-height:1.8;
          "
        >
          We have successfully received your details
          and your catalogue request. Our team will be
          happy to assist you with any further information
          you may require.
        </p>

        <!-- REQUEST DETAILS -->

        <div
          style="
            margin-top:26px;
            padding:20px;
            background:#f8fafc;
            border:1px solid #e2e8f0;
            border-radius:12px;
          "
        >

          <h2
            style="
              margin:0 0 16px;
              color:#0A2E6F;
              font-size:17px;
            "
          >
            Your Details
          </h2>

          <p
            style="
              margin:8px 0;
              font-size:14px;
            "
          >
            <strong>Name:</strong>
            ${safeName}
          </p>

          <p
            style="
              margin:8px 0;
              font-size:14px;
            "
          >
            <strong>Email:</strong>
            ${safeEmail}
          </p>

          <p
            style="
              margin:8px 0;
              font-size:14px;
            "
          >
            <strong>Mobile:</strong>
            ${safePhone}
          </p>

        </div>

        <!-- REQUEST -->

        <div
          style="
            margin-top:20px;
            padding:18px;
            background:#ffffff;
            border:1px solid #e2e8f0;
            border-left:4px solid #0A2E6F;
            border-radius:10px;
          "
        >

          <p
            style="
              margin:0 0 8px;
              color:#64748b;
              font-size:11px;
              font-weight:700;
              text-transform:uppercase;
              letter-spacing:1px;
            "
          >
            Catalogue Request
          </p>

          <div
            style="
              color:#334155;
              font-size:14px;
              line-height:1.7;
            "
          >
            ${safeMessage}
          </div>

        </div>

        <!-- THANK YOU -->

        <p
          style="
            margin:28px 0 0;
            color:#475569;
            font-size:14px;
            line-height:1.8;
          "
        >
          Thank you for choosing
          <strong>Simmply Perfect</strong>.
          We look forward to assisting you.
        </p>

      </div>

      <!-- FOOTER -->

      <div
        style="
          padding:22px 30px;
          background:#f8fafc;
          border-top:1px solid #e2e8f0;
        "
      >

        <p
          style="
            margin:0;
            color:#0A2E6F;
            font-size:14px;
            font-weight:700;
          "
        >
          Simmply Perfect
        </p>

        <p
          style="
            margin:5px 0 0;
            color:#64748b;
            font-size:12px;
          "
        >
          Windows & Doors
        </p>

      </div>

    </div>

  </div>

</body>

</html>
      `,
    };

    /* =====================================================
       SEND BOTH EMAILS AT THE SAME TIME
    ===================================================== */

    const [adminResult, customerResult] =
      await Promise.all([
        transporter.sendMail(adminEmail),
        transporter.sendMail(customerEmail),
      ]);

    /* =====================================================
       LOG SUCCESS
    ===================================================== */

    console.log(
      "CATALOG EMAILS SENT SUCCESSFULLY:",
      {
        adminMessageId:
          adminResult.messageId,

        customerMessageId:
          customerResult.messageId,

        customer: cleanName,

        email: cleanEmail,
      }
    );

    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Your catalogue request has been submitted successfully. A confirmation email has been sent to your email address.",
      },
      {
        status: 200,
      }
    );
  } catch (error: unknown) {
    /* =====================================================
       ERROR HANDLING
    ===================================================== */

    console.error(
      "CATALOG EMAIL API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Failed to process your catalogue request. Please try again.",
      },
      {
        status: 500,
      }
    );
  }
}