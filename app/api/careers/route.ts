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

const ALLOWED_FILE_EXTENSIONS = ["pdf", "doc", "docx"];

/* =========================================================
   HTML ESCAPE HELPER
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
) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

/* =========================================================
   EXTRACT NUMBER

   Handles:
   "25"
   "25 Years"
   "2.5"
   "2.5 Years"
   "6 LPA"
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

    /*
     IMPORTANT:

     Your JobApplicationForm.tsx sends:
     phone

     Therefore the API must also read:
     phone
    */

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

    /*
     IMPORTANT:

     Your frontend sends:
     currentCtc

     NOT:
     currentCTC
    */

    const currentCtc = getStringValue(
      formData,
      "currentCtc",
    );

    /*
     IMPORTANT:

     Your frontend sends:
     expectedCtc

     NOT:
     expectedCTC
    */

    const expectedCtc = getStringValue(
      formData,
      "expectedCtc",
    );

    const noticePeriod = getStringValue(
      formData,
      "noticePeriod",
    );

    /*
     Your frontend sends currentLocation.
    */

    const currentLocation = getStringValue(
      formData,
      "currentLocation",
    );

    const description = getStringValue(
      formData,
      "description",
    );

    const resume = formData.get("resume");

    /* =====================================================
       DEBUGGING

       You can temporarily check your terminal to confirm
       that all values are reaching the API correctly.
    ===================================================== */

    console.log("CAREER APPLICATION RECEIVED:", {
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
      descriptionLength: description.length,
      hasResume: resume instanceof File,
    });

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
      console.error(
        "CAREER APPLICATION MISSING FIELDS:",
        {
          firstName: Boolean(firstName),
          lastName: Boolean(lastName),
          email: Boolean(email),
          phone: Boolean(phone),
          age: Boolean(age),
          gender: Boolean(gender),
          role: Boolean(role),
          experience: Boolean(experience),
          expectedCtc: Boolean(expectedCtc),
          noticePeriod: Boolean(noticePeriod),
          currentLocation:
            Boolean(currentLocation),
          description: Boolean(description),
          resume: resume instanceof File,
        },
      );

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

       Supports:
       25
       25 Years
    ===================================================== */

    const applicantAge = extractNumber(age);

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

       Supports:
       2
       2.5
       2 Years
       2.5 Years
    ===================================================== */

    const applicantExperience =
      extractNumber(experience);

    if (
      Number.isNaN(applicantExperience) ||
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

       Current CTC is optional.

       Supports:
       4
       4.5
       4 LPA
       4.5 LPA
    ===================================================== */

    if (currentCtc) {
      const currentCtcNumber =
        extractNumber(currentCtc);

      if (
        Number.isNaN(currentCtcNumber) ||
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

       Supports:
       6
       6.5
       6 LPA
       6.5 LPA
    ===================================================== */

    const expectedCtcNumber =
      extractNumber(expectedCtc);

    if (
      Number.isNaN(expectedCtcNumber) ||
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
          message: "Please upload your resume.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       FILE EXTENSION VALIDATION
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
       MIME TYPE VALIDATION

       Some browsers may provide an empty MIME type.
       Therefore we only reject when a MIME type exists
       and is unsupported.
    ===================================================== */

    if (
      resume.type &&
      !ALLOWED_FILE_TYPES.includes(resume.type)
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
       FILE SIZE VALIDATION
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
       CHECK SMTP ENVIRONMENT VARIABLES
    ===================================================== */

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (
      !smtpHost ||
      !smtpPort ||
      !smtpUser ||
      !smtpPass
    ) {
      console.error(
        "Missing SMTP environment variables.",
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
       CONVERT RESUME TO BUFFER
    ===================================================== */

    const resumeArrayBuffer =
      await resume.arrayBuffer();

    const resumeBuffer = Buffer.from(
      resumeArrayBuffer,
    );

    /* =====================================================
       CREATE EMAIL TRANSPORTER
    ===================================================== */

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: Number(smtpPort),
  secure: Number(smtpPort) === 465,

  auth: {
    user: smtpUser,
    pass: smtpPass,
  },

  pool: true,
  maxConnections: 3,
  maxMessages: 50,

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

    /* =====================================================
       VERIFY SMTP CONNECTION
    ===================================================== */


    /* =====================================================
       SANITIZE USER CONTENT
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
        currentCtc || "Not Provided",
      );

    const safeExpectedCtc =
      escapeHtml(expectedCtc);

    const safeNoticePeriod =
      escapeHtml(noticePeriod);

    const safeCurrentLocation =
      escapeHtml(currentLocation);

    const safeDescription =
      escapeHtml(description).replace(
        /\n/g,
        "<br />",
      );

    /* =====================================================
       SEND APPLICATION EMAIL
    ===================================================== */

    await transporter.sendMail({
      from: `"Simmply Perfect Careers" <${smtpUser}>`,

      to:
        process.env.CAREERS_RECEIVER_EMAIL ||
        "simplyperfectwindowsanddoors@gmail.com",

      replyTo: email,

      subject:
        `New Job Application | ${role} | ` +
        `${firstName} ${lastName}`,

      html: `
        <!DOCTYPE html>

        <html lang="en">

        <head>

          <meta charset="UTF-8" />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />

          <title>New Job Application</title>

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

              <!-- CANDIDATE DETAILS -->

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

                <!-- DETAILS TABLE -->

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
                    ${escapeHtml(resume.name)}
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

      /* ===================================================
         RESUME ATTACHMENT
      =================================================== */

      attachments: [
        {
          filename: resume.name,
          content: resumeBuffer,
          contentType:
            resume.type ||
            "application/octet-stream",
        },
      ],
    });

    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,
        message:
          "Application submitted successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
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
        "
      >
        ${value}
      </td>

    </tr>
  `;
}
