import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      type,
      name,
      company,
      email,
      phone,
      city,
      website,
      message,
      termsAccepted,
    } = body;

    /* =====================================================
       VALIDATION
    ===================================================== */

    if (
      !type ||
      !name ||
      !email ||
      !phone ||
      !city ||
      !message ||
      !termsAccepted
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    if (type !== "partner" && type !== "affiliate") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid application type.",
        },
        { status: 400 }
      );
    }

    /* =====================================================
       SMTP CONFIGURATION
       
       Uses your EXISTING working SMTP environment variables.
    ===================================================== */

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("SMTP configuration is missing.");

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured correctly.",
        },
        { status: 500 }
      );
    }

    /* =====================================================
       TRANSPORTER
    ===================================================== */

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass.replace(/\s+/g, ""),
      },
    });

    /* =====================================================
       VERIFY SMTP CONNECTION
    ===================================================== */

    await transporter.verify();

    /* =====================================================
       APPLICATION TYPE
    ===================================================== */

    const applicationTitle =
      type === "partner"
        ? "Become a Partner"
        : "Become an Affiliate";

    /* =====================================================
       ADMIN EMAIL
    ===================================================== */

    const adminMail = {
      from: `"Simmply Perfect Group Website" <${smtpUser}>`,

      to: smtpUser,

      replyTo: email,

      subject: `${applicationTitle} Application — ${name}`,

      html: `
<!DOCTYPE html>

<html>
<head>
<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>${applicationTitle}</title>
</head>

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
    max-width:700px;
    margin:40px auto;
    background:#ffffff;
    border-radius:18px;
    overflow:hidden;
    border:1px solid #e5e7eb;
  "
>

  <!-- HEADER -->

  <div
    style="
      background:#071224;
      padding:30px;
      color:#ffffff;
    "
  >

    <div
      style="
        font-size:12px;
        letter-spacing:2px;
        text-transform:uppercase;
        color:#93c5fd;
        font-weight:bold;
      "
    >
      Simmply Perfect Group
    </div>

    <h1
      style="
        margin:10px 0 0;
        font-size:26px;
      "
    >
      ${applicationTitle}
    </h1>

  </div>


  <!-- CONTENT -->

  <div style="padding:30px;">

    <p
      style="
        font-size:15px;
        line-height:1.7;
        color:#4b5563;
      "
    >
      A new ${type === "partner" ? "partnership" : "affiliate"}
      application has been submitted through the
      Simmply Perfect Group website.
    </p>


    <!-- APPLICATION TYPE -->

    <div
      style="
        margin:25px 0;
        padding:16px;
        background:#f8fafc;
        border-radius:12px;
      "
    >

      <div
        style="
          font-size:11px;
          text-transform:uppercase;
          letter-spacing:1px;
          color:#64748b;
        "
      >
        Application Type
      </div>

      <div
        style="
          margin-top:5px;
          font-size:18px;
          font-weight:bold;
          color:#111827;
        "
      >
        ${applicationTitle}
      </div>

    </div>


    <!-- DETAILS -->

    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="border-collapse:collapse;"
    >

      <tr>

        <td
          style="
            padding:12px 0;
            border-bottom:1px solid #e5e7eb;
            font-weight:bold;
            width:35%;
          "
        >
          Full Name
        </td>

        <td
          style="
            padding:12px 0;
            border-bottom:1px solid #e5e7eb;
          "
        >
          ${name}
        </td>

      </tr>


      <tr>

        <td
          style="
            padding:12px 0;
            border-bottom:1px solid #e5e7eb;
            font-weight:bold;
          "
        >
          Company / Business
        </td>

        <td
          style="
            padding:12px 0;
            border-bottom:1px solid #e5e7eb;
          "
        >
          ${company || "Not provided"}
        </td>

      </tr>


      <tr>

        <td
          style="
            padding:12px 0;
            border-bottom:1px solid #e5e7eb;
            font-weight:bold;
          "
        >
          Email
        </td>

        <td
          style="
            padding:12px 0;
            border-bottom:1px solid #e5e7eb;
          "
        >
          ${email}
        </td>

      </tr>


      <tr>

        <td
          style="
            padding:12px 0;
            border-bottom:1px solid #e5e7eb;
            font-weight:bold;
          "
        >
          Phone
        </td>

        <td
          style="
            padding:12px 0;
            border-bottom:1px solid #e5e7eb;
          "
        >
          ${phone}
        </td>

      </tr>


      <tr>

        <td
          style="
            padding:12px 0;
            border-bottom:1px solid #e5e7eb;
            font-weight:bold;
          "
        >
          City
        </td>

        <td
          style="
            padding:12px 0;
            border-bottom:1px solid #e5e7eb;
          "
        >
          ${city}
        </td>

      </tr>


      <tr>

        <td
          style="
            padding:12px 0;
            border-bottom:1px solid #e5e7eb;
            font-weight:bold;
          "
        >
          Website / Social
        </td>

        <td
          style="
            padding:12px 0;
            border-bottom:1px solid #e5e7eb;
          "
        >
          ${website || "Not provided"}
        </td>

      </tr>

    </table>


    <!-- MESSAGE -->

    <div style="margin-top:25px;">

      <div
        style="
          font-size:12px;
          text-transform:uppercase;
          letter-spacing:1px;
          font-weight:bold;
          color:#64748b;
        "
      >
        Message
      </div>

      <div
        style="
          margin-top:10px;
          padding:18px;
          background:#f8fafc;
          border-radius:12px;
          font-size:14px;
          line-height:1.7;
          color:#374151;
        "
      >
        ${message.replace(/\n/g, "<br />")}
      </div>

    </div>


    <!-- TERMS -->

    <div
      style="
        margin-top:25px;
        padding:14px 16px;
        background:#ecfdf5;
        border:1px solid #bbf7d0;
        border-radius:10px;
        color:#166534;
        font-size:13px;
      "
    >
      ✓ Applicant accepted the Terms & Conditions.
    </div>

  </div>


  <!-- FOOTER -->

  <div
    style="
      padding:20px 30px;
      background:#f8fafc;
      border-top:1px solid #e5e7eb;
      font-size:12px;
      color:#64748b;
    "
  >
    This application was submitted through the
    Simmply Perfect Group website.
  </div>

</div>

</body>
</html>
      `,
    };

    /* =====================================================
       SEND APPLICATION TO COMPANY
    ===================================================== */

    await transporter.sendMail(adminMail);

    /* =====================================================
       AUTO REPLY TO APPLICANT
    ===================================================== */

    await transporter.sendMail({
      from: `"Simmply Perfect Group" <${smtpUser}>`,

      to: email,

      subject: `We received your ${type === "partner" ? "Partner" : "Affiliate"} application`,

      html: `
<!DOCTYPE html>

<html>

<body
  style="
    margin:0;
    padding:30px;
    background:#f4f7fb;
    font-family:Arial,Helvetica,sans-serif;
    color:#172033;
  "
>

<div
  style="
    max-width:600px;
    margin:auto;
    background:#ffffff;
    border-radius:18px;
    padding:35px;
    border:1px solid #e5e7eb;
  "
>

  <h2
    style="
      margin:0;
      color:#071224;
    "
  >
    Thank You, ${name}
  </h2>


  <p
    style="
      margin-top:18px;
      font-size:15px;
      line-height:1.7;
      color:#4b5563;
    "
  >
    We have successfully received your
    <strong>${applicationTitle}</strong>
    application.
  </p>


  <p
    style="
      font-size:15px;
      line-height:1.7;
      color:#4b5563;
    "
  >
    Our team will review your information and contact you
    if your application is suitable for the next stage.
  </p>


  <div
    style="
      margin-top:25px;
      padding:16px;
      background:#f8fafc;
      border-radius:12px;
      color:#475569;
      font-size:13px;
      line-height:1.6;
    "
  >
    Your application type:
    <strong>${applicationTitle}</strong>
  </div>


  <p
    style="
      margin-top:30px;
      font-size:14px;
      color:#64748b;
    "
  >
    Regards,<br />
    <strong>Simmply Perfect Group</strong>
  </p>

</div>

</body>

</html>
      `,
    });

    /* =====================================================
       SUCCESS
    ===================================================== */

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
    });
  } catch (error) {
    console.error(
      "PARTNERSHIP APPLICATION EMAIL ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send application.",
      },
      {
        status: 500,
      }
    );
  }
}