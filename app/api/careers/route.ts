import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

/* =========================================================
   ROUTE CONFIGURATION
========================================================= */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* =========================================================
   CONFIGURATION
========================================================= */

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const ALLOWED_FILE_EXTENSIONS = [
  "pdf",
  "doc",
  "docx",
];

/* =========================================================
   HTML ESCAPE
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
   GET STRING VALUE
========================================================= */

function getStringValue(
  formData: FormData,
  key: string,
): string {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

/* =========================================================
   EXTRACT NUMBER
========================================================= */

function extractNumber(value: string) {
  const normalized = value
    .replace(/[^\d.]/g, "")
    .trim();

  if (!normalized) {
    return Number.NaN;
  }

  return Number(normalized);
}

/* =========================================================
   EMAIL TABLE ROW
========================================================= */

function createEmailRow(
  label: string,
  value: string,
) {
  return `
    <tr>

      <td
        style="
          width:35%;
          padding:11px 12px;
          background:#f8fafc;
          border:1px solid #e2e8f0;
          color:#64748b;
          font-weight:bold;
          vertical-align:top;
        "
      >
        ${label}
      </td>

      <td
        style="
          padding:11px 12px;
          border:1px solid #e2e8f0;
          color:#071224;
          font-weight:600;
          word-break:break-word;
          vertical-align:top;
        "
      >
        ${value}
      </td>

    </tr>
  `;
}

/* =========================================================
   POST CAREER APPLICATION
========================================================= */

export async function POST(request: Request) {
  try {
    /* =====================================================
       READ FORM DATA
    ===================================================== */

    const formData = await request.formData();

    const firstName = getStringValue(
      formData,
      "firstName",
    );

    const lastName = getStringValue(
      formData,
      "lastName",
    );

    const email = getStringValue(
      formData,
      "email",
    );

    const phone = getStringValue(
      formData,
      "phone",
    );

    const age = getStringValue(
      formData,
      "age",
    );

    const gender = getStringValue(
      formData,
      "gender",
    );

    const role = getStringValue(
      formData,
      "role",
    );

    const experience = getStringValue(
      formData,
      "experience",
    );

    const currentCtc = getStringValue(
      formData,
      "currentCtc",
    );

    const expectedCtc = getStringValue(
      formData,
      "expectedCtc",
    );

    const noticePeriod = getStringValue(
      formData,
      "noticePeriod",
    );

    const currentLocation =
      getStringValue(
        formData,
        "currentLocation",
      );

    const description = getStringValue(
      formData,
      "description",
    );

    const resume = formData.get("resume");

    /* =====================================================
       DEBUG LOG
    ===================================================== */

    console.log(
      "CAREER APPLICATION RECEIVED:",
      {
        firstName,
        lastName,
        email,
        phone,
        age,
        gender,
        role,
        experience,
        currentCtc,
        expectedCtc,
        noticePeriod,
        currentLocation,
        descriptionLength:
          description.length,
        hasResume:
          resume instanceof File,
      },
    );

    /* =====================================================
       REQUIRED FIELD VALIDATION
    ===================================================== */

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !age ||
      !gender ||
      !role ||
      !experience ||
      !expectedCtc ||
      !noticePeriod ||
      !currentLocation ||
      !description
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please complete all required application fields.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       PHONE VALIDATION
    ===================================================== */

    const phonePattern = /^[6-9]\d{9}$/;

    if (!phonePattern.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid 10-digit Indian mobile number.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       AGE VALIDATION
    ===================================================== */

    const applicantAge =
      extractNumber(age);

    if (
      Number.isNaN(applicantAge) ||
      applicantAge < 18 ||
      applicantAge > 65
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Applicant age must be between 18 and 65 years.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       EXPERIENCE VALIDATION
    ===================================================== */

    const applicantExperience =
      extractNumber(experience);

    if (
      Number.isNaN(
        applicantExperience,
      ) ||
      applicantExperience < 0 ||
      applicantExperience > 50
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter valid total experience.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       CURRENT CTC VALIDATION
    ===================================================== */

    if (currentCtc) {
      const currentCtcNumber =
        extractNumber(currentCtc);

      if (
        Number.isNaN(
          currentCtcNumber,
        ) ||
        currentCtcNumber < 0
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Please enter a valid current CTC.",
          },
          {
            status: 400,
          },
        );
      }
    }

    /* =====================================================
       EXPECTED CTC VALIDATION
    ===================================================== */

    const expectedCtcNumber =
      extractNumber(expectedCtc);

    if (
      Number.isNaN(
        expectedCtcNumber,
      ) ||
      expectedCtcNumber <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid expected CTC.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       DESCRIPTION VALIDATION
    ===================================================== */

    if (description.length < 30) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Professional summary must contain at least 30 characters.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       RESUME VALIDATION
    ===================================================== */

    if (
      !(resume instanceof File) ||
      resume.size === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please upload your resume.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       FILE EXTENSION
    ===================================================== */

    const fileExtension =
      resume.name
        .split(".")
        .pop()
        ?.toLowerCase() ?? "";

    if (
      !ALLOWED_FILE_EXTENSIONS.includes(
        fileExtension,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Resume must be a PDF, DOC, or DOCX file.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       MIME TYPE
    ===================================================== */

    if (
      resume.type &&
      !ALLOWED_FILE_TYPES.includes(
        resume.type,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Resume must be a PDF, DOC, or DOCX file.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       FILE SIZE
    ===================================================== */

    if (resume.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Resume file size must be below 5 MB.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       SMTP VARIABLES
    ===================================================== */

    const smtpHost =
      process.env.SMTP_HOST;

    const smtpPort =
      Number(
        process.env.SMTP_PORT || 587,
      );

    const smtpUser =
      process.env.SMTP_USER;

    const smtpPass =
      process.env.SMTP_PASS;

    const receiverEmail =
      process.env.CAREERS_RECEIVER_EMAIL ||
      "simplyperfectwindowsanddoors@gmail.com";

    if (
      !smtpHost ||
      !smtpUser ||
      !smtpPass
    ) {
      console.error(
        "CAREERS ERROR: Missing SMTP environment variables.",
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Email service is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    /* =====================================================
       RESUME BUFFER
    ===================================================== */

    const resumeArrayBuffer =
      await resume.arrayBuffer();

    const resumeBuffer =
      Buffer.from(
        resumeArrayBuffer,
      );

    /* =====================================================
       CREATE SMTP TRANSPORTER

       IMPORTANT:
       We intentionally DO NOT call:

       await transporter.verify();

       That adds another SMTP request and can
       significantly increase form submission time.
    ===================================================== */

    const transporter =
      nodemailer.createTransport({
        host: smtpHost,

        port: smtpPort,

        secure:
          smtpPort === 465,

        auth: {
          user: smtpUser,

          pass: smtpPass,
        },

        pool: true,

        maxConnections: 3,

        maxMessages: 50,

        connectionTimeout: 8000,

        greetingTimeout: 8000,

        socketTimeout: 15000,
      });

    /* =====================================================
       SANITIZE VALUES
    ===================================================== */

    const safeFirstName =
      escapeHtml(firstName);

    const safeLastName =
      escapeHtml(lastName);

    const safeEmail =
      escapeHtml(email);

    const safePhone =
      escapeHtml(phone);

    const safeAge =
      escapeHtml(age);

    const safeGender =
      escapeHtml(gender);

    const safeRole =
      escapeHtml(role);

    const safeExperience =
      escapeHtml(experience);

    const safeCurrentCtc =
      escapeHtml(
        currentCtc ||
          "Not Provided",
      );

    const safeExpectedCtc =
      escapeHtml(
        expectedCtc,
      );

    const safeNoticePeriod =
      escapeHtml(
        noticePeriod,
      );

    const safeCurrentLocation =
      escapeHtml(
        currentLocation,
      );

    const safeDescription =
      escapeHtml(
        description,
      ).replace(
        /\n/g,
        "<br />",
      );

    const safeResumeName =
      escapeHtml(
        resume.name,
      );

    const fullName =
      `${firstName} ${lastName}`;

    /* =====================================================
       EMAIL 1
       SEND APPLICATION TO SIMMPLY PERFECT
    ===================================================== */

    const companyEmail = {
      from:
        `"Simmply Perfect Careers" <${smtpUser}>`,

      to: receiverEmail,

      /*
       * If the company clicks Reply,
       * the reply will go directly to
       * the applicant.
       */

      replyTo: email,

      subject:
        `New Job Application | ${role} | ${fullName}`,

      text: `
NEW JOB APPLICATION

Candidate:
${fullName}

Role:
${role}

Email:
${email}

Phone:
+91 ${phone}

Age:
${age}

Gender:
${gender}

Total Experience:
${experience}

Current CTC:
${currentCtc || "Not Provided"}

Expected CTC:
${expectedCtc}

Notice Period:
${noticePeriod}

Current Location:
${currentLocation}

Professional Summary:
${description}

Resume:
${resume.name}
      `.trim(),

      html: `
<!DOCTYPE html>

<html>

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>
    New Job Application
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
      padding:30px 15px;
    "
  >

    <div
      style="
        max-width:700px;
        margin:0 auto;
        background:#ffffff;
        border-radius:16px;
        overflow:hidden;
        border:1px solid #e2e8f0;
      "
    >

      <!-- HEADER -->

      <div
        style="
          background:#0A2E6F;
          padding:30px;
        "
      >

        <p
          style="
            margin:0 0 8px;
            color:#bfdbfe;
            font-size:11px;
            font-weight:bold;
            letter-spacing:2px;
            text-transform:uppercase;
          "
        >
          Simmply Perfect Careers
        </p>

        <h1
          style="
            margin:0;
            color:#ffffff;
            font-size:25px;
          "
        >
          New Job Application
        </h1>

        <p
          style="
            margin:10px 0 0;
            color:#dbeafe;
            font-size:14px;
          "
        >
          ${safeRole}
        </p>

      </div>

      <!-- CONTENT -->

      <div
        style="
          padding:30px;
        "
      >

        <h2
          style="
            margin:0;
            color:#071224;
            font-size:20px;
          "
        >
          ${safeFirstName}
          ${safeLastName}
        </h2>

        <p
          style="
            margin:7px 0 25px;
            color:#64748b;
            font-size:13px;
          "
        >
          Candidate Application Details
        </p>

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            border-collapse:collapse;
            font-size:13px;
          "
        >

          ${createEmailRow(
            "Applying Role",
            safeRole,
          )}

          ${createEmailRow(
            "Email Address",
            safeEmail,
          )}

          ${createEmailRow(
            "Contact Number",
            `+91 ${safePhone}`,
          )}

          ${createEmailRow(
            "Age",
            safeAge,
          )}

          ${createEmailRow(
            "Gender",
            safeGender,
          )}

          ${createEmailRow(
            "Total Experience",
            safeExperience,
          )}

          ${createEmailRow(
            "Current CTC",
            safeCurrentCtc,
          )}

          ${createEmailRow(
            "Expected CTC",
            safeExpectedCtc,
          )}

          ${createEmailRow(
            "Notice Period",
            safeNoticePeriod,
          )}

          ${createEmailRow(
            "Current Location",
            safeCurrentLocation,
          )}

        </table>

        <!-- PROFESSIONAL SUMMARY -->

        <div
          style="
            margin-top:25px;
          "
        >

          <p
            style="
              margin:0 0 10px;
              color:#071224;
              font-size:13px;
              font-weight:bold;
            "
          >
            Professional Summary
          </p>

          <div
            style="
              padding:16px;
              background:#f8fafc;
              border-left:4px solid #0A2E6F;
              border-radius:8px;
              color:#475569;
              font-size:13px;
              line-height:1.7;
            "
          >
            ${safeDescription}
          </div>

        </div>

        <!-- RESUME -->

        <div
          style="
            margin-top:25px;
            padding:16px;
            background:#eff6ff;
            border:1px solid #dbeafe;
            border-radius:10px;
          "
        >

          <p
            style="
              margin:0;
              color:#0A2E6F;
              font-size:13px;
              font-weight:bold;
            "
          >
            Resume Attached
          </p>

          <p
            style="
              margin:5px 0 0;
              color:#64748b;
              font-size:12px;
            "
          >
            ${safeResumeName}
          </p>

        </div>

      </div>

      <!-- FOOTER -->

      <div
        style="
          padding:18px 30px;
          background:#f8fafc;
          border-top:1px solid #e2e8f0;
        "
      >

        <p
          style="
            margin:0;
            text-align:center;
            color:#94a3b8;
            font-size:11px;
          "
        >
          Application submitted through
          Simmply Perfect Careers Portal
        </p>

      </div>

    </div>

  </div>

</body>

</html>
      `,

      attachments: [
        {
          filename:
            resume.name,

          content:
            resumeBuffer,

          contentType:
            resume.type ||
            "application/octet-stream",
        },
      ],
    };

    /* =====================================================
       EMAIL 2
       CONFIRMATION TO APPLICANT
    ===================================================== */

    const applicantEmail = {
      from:
        `"Simmply Perfect Group" <${smtpUser}>`,

      to: email,

      subject:
        `Application Received | ${role} | Simmply Perfect`,

      text: `
Dear ${fullName},

Thank you for applying to Simmply Perfect Group.

We have successfully received your job application for the position of ${role}.

Our recruitment team will review your application and contact you if your profile is shortlisted for the next stage.

Application Details:

Position:
${role}

Name:
${fullName}

Email:
${email}

Phone:
+91 ${phone}

Current Location:
${currentLocation}

Expected CTC:
${expectedCtc}

Notice Period:
${noticePeriod}

Thank you for your interest in joining Simmply Perfect Group.

Regards,
Simmply Perfect Group
Careers Team
      `.trim(),

      html: `
<!DOCTYPE html>

<html>

<head>

  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>
    Application Received
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
      padding:30px 15px;
    "
  >

    <div
      style="
        max-width:650px;
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
            font-weight:bold;
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
            font-size:26px;
            line-height:1.3;
          "
        >
          Application Received
        </h1>

        <p
          style="
            margin:10px 0 0;
            color:#dbeafe;
            font-size:14px;
            line-height:1.6;
          "
        >
          Thank you for your interest
          in joining our team.
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
          <strong>
            ${safeFirstName}
            ${safeLastName}
          </strong>,
        </p>

        <p
          style="
            margin:0 0 18px;
            color:#475569;
            font-size:15px;
            line-height:1.8;
          "
        >
          Thank you for applying to
          <strong>
            Simmply Perfect Group
          </strong>.
        </p>

        <p
          style="
            margin:0;
            color:#475569;
            font-size:15px;
            line-height:1.8;
          "
        >
          We have successfully received
          your application for the position of
          <strong>
            ${safeRole}
          </strong>.
        </p>

        <!-- SUCCESS BOX -->

        <div
          style="
            margin-top:24px;
            padding:18px;
            background:#eff6ff;
            border:1px solid #dbeafe;
            border-radius:10px;
          "
        >

          <p
            style="
              margin:0;
              color:#0A2E6F;
              font-size:14px;
              font-weight:bold;
            "
          >
            Application Successfully Submitted
          </p>

          <p
            style="
              margin:7px 0 0;
              color:#475569;
              font-size:13px;
              line-height:1.7;
            "
          >
            Our recruitment team will review
            your application and contact you
            if your profile is shortlisted for
            the next stage.
          </p>

        </div>

        <!-- APPLICATION DETAILS -->

        <h2
          style="
            margin:28px 0 15px;
            color:#071224;
            font-size:18px;
          "
        >
          Application Details
        </h2>

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            border-collapse:collapse;
            font-size:13px;
          "
        >

          ${createEmailRow(
            "Position",
            safeRole,
          )}

          ${createEmailRow(
            "Name",
            `${safeFirstName} ${safeLastName}`,
          )}

          ${createEmailRow(
            "Email",
            safeEmail,
          )}

          ${createEmailRow(
            "Phone",
            `+91 ${safePhone}`,
          )}

          ${createEmailRow(
            "Current Location",
            safeCurrentLocation,
          )}

          ${createEmailRow(
            "Expected CTC",
            safeExpectedCtc,
          )}

          ${createEmailRow(
            "Notice Period",
            safeNoticePeriod,
          )}

        </table>

        <!-- NEXT STEPS -->

        <div
          style="
            margin-top:25px;
            padding:18px;
            background:#f8fafc;
            border:1px solid #e2e8f0;
            border-radius:10px;
          "
        >

          <p
            style="
              margin:0;
              color:#071224;
              font-size:14px;
              font-weight:bold;
            "
          >
            What happens next?
          </p>

          <p
            style="
              margin:8px 0 0;
              color:#64748b;
              font-size:13px;
              line-height:1.7;
            "
          >
            Our recruitment team will review
            your application. If your profile
            matches our requirements, we will
            contact you regarding the next
            steps.
          </p>

        </div>

        <p
          style="
            margin:28px 0 0;
            color:#475569;
            font-size:14px;
            line-height:1.8;
          "
        >
          Thank you for taking the time to
          apply and for your interest in
          <strong>
            Simmply Perfect Group
          </strong>.
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
            text-align:center;
            color:#0A2E6F;
            font-size:14px;
            font-weight:bold;
          "
        >
          Simmply Perfect Group
        </p>

        <p
          style="
            margin:6px 0 0;
            text-align:center;
            color:#64748b;
            font-size:11px;
          "
        >
          Careers Team
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
       
       This is important for speed.
       
       Instead of:
       await companyEmail
       await applicantEmail

       we do:
       Promise.all(...)
    ===================================================== */

    const [
      companyResult,
      applicantResult,
    ] = await Promise.all([
      transporter.sendMail(
        companyEmail,
      ),

      transporter.sendMail(
        applicantEmail,
      ),
    ]);

    /* =====================================================
       LOG SUCCESS
    ===================================================== */

    console.log(
      "CAREER APPLICATION EMAILS SENT:",
      {
        applicant:
          fullName,

        email,

        role,

        companyMessageId:
          companyResult.messageId,

        applicantMessageId:
          applicantResult.messageId,
      },
    );

    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Application submitted successfully. A confirmation email has been sent to you.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    /* =====================================================
       ERROR HANDLING
    ===================================================== */

    console.error(
      "CAREERS EMAIL API ERROR:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Failed to submit application.",
      },
      {
        status: 500,
      },
    );
  }
}