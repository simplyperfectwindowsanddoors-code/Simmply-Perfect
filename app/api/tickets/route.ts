import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

/* =========================================================
   TICKET REQUEST TYPE
========================================================= */

type TicketRequestBody = {
  fullName: string;
  contact: string;
  orderId: string;
  item: string;
  complaint: string;
};

/* =========================================================
   GENERATE TICKET ID
========================================================= */

function generateTicketId() {
  const timestamp = Date.now().toString().slice(-6);

  const randomNumber = Math.floor(
    1000 + Math.random() * 9000,
  );

  return `SP-${timestamp}-${randomNumber}`;
}

/* =========================================================
   ESCAPE HTML

   Prevents user-entered HTML from being inserted directly
   into the support email.
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
   POST /api/tickets
========================================================= */

export async function POST(req: Request) {
  try {
    /* =====================================================
       READ REQUEST BODY
    ===================================================== */

    const body =
      (await req.json()) as TicketRequestBody;

    const {
      fullName,
      contact,
      orderId,
      item,
      complaint,
    } = body;

    /* =====================================================
       REQUIRED FIELD VALIDATION
    ===================================================== */

    if (
      !fullName?.trim() ||
      !contact?.trim() ||
      !orderId?.trim() ||
      !item?.trim() ||
      !complaint?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       CONTACT NUMBER VALIDATION
    ===================================================== */

    const cleanContact = contact.replace(/\D/g, "");

    if (!/^\d{10}$/.test(cleanContact)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid 10-digit contact number.",
        },
        {
          status: 400,
        },
      );
    }

    /* =====================================================
       SMTP ENVIRONMENT VARIABLES
    ===================================================== */

    const smtpHost = process.env.SMTP_HOST;

    const smtpPort = process.env.SMTP_PORT;

    const smtpUser = process.env.SMTP_USER;

    const smtpPass = process.env.SMTP_PASS;

    /* =====================================================
       CHECK SMTP CONFIGURATION
    ===================================================== */

    if (
      !smtpHost ||
      !smtpPort ||
      !smtpUser ||
      !smtpPass
    ) {
      console.error(
        "TICKETS API ERROR: Missing SMTP environment variables.",
        {
          SMTP_HOST: Boolean(smtpHost),
          SMTP_PORT: Boolean(smtpPort),
          SMTP_USER: Boolean(smtpUser),
          SMTP_PASS: Boolean(smtpPass),
        },
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
       GENERATE TICKET DETAILS
    ===================================================== */

    const ticketId = generateTicketId();

    const submittedAt = new Date().toLocaleString(
      "en-IN",
      {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      },
    );

    /* =====================================================
       CLEAN USER DATA
    ===================================================== */

    const cleanFullName = fullName.trim();

    const cleanOrderId = orderId.trim();

    const cleanItem = item.trim();

    const cleanComplaint = complaint.trim();

    /* =====================================================
       SANITIZE DATA FOR HTML EMAIL
    ===================================================== */

    const safeFullName = escapeHtml(cleanFullName);

    const safeContact = escapeHtml(cleanContact);

    const safeOrderId = escapeHtml(cleanOrderId);

    const safeItem = escapeHtml(cleanItem);

    const safeComplaint = escapeHtml(
      cleanComplaint,
    ).replace(/\n/g, "<br />");

    /* =====================================================
       CREATE SMTP TRANSPORTER

       Uses the same SMTP settings as the Catalog API.
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
       VERIFY SMTP CONNECTION
    ===================================================== */

    await transporter.verify();

    /* =====================================================
       SEND SUPPORT EMAIL
    ===================================================== */

    const mailResult = await transporter.sendMail({
      from: `"Simmply Perfect Support" <${smtpUser}>`,

      to: "simplyperfectwindowsanddoors@gmail.com",

      subject: `New Support Ticket ${ticketId} - ${cleanOrderId}`,

      text: `
SIMMPLY PERFECT GROUP
NEW CUSTOMER SUPPORT TICKET

----------------------------------------

TICKET INFORMATION

Ticket ID: ${ticketId}
Status: OPEN
Submitted At: ${submittedAt}

----------------------------------------

CUSTOMER DETAILS

Full Name: ${cleanFullName}
Contact Number: ${cleanContact}

----------------------------------------

ORDER DETAILS

Order ID: ${cleanOrderId}
Item: ${cleanItem}

----------------------------------------

CUSTOMER COMPLAINT

${cleanComplaint}

----------------------------------------

This is an automated support notification from the
Simmply Perfect Group website.
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

            <title>New Support Ticket</title>

          </head>

          <body
            style="
              margin: 0;
              padding: 0;
              background-color: #f1f5f9;
              font-family: Arial, Helvetica, sans-serif;
            "
          >

            <!-- ============================================
                 EMAIL WRAPPER
            ============================================= -->

            <div
              style="
                width: 100%;
                padding: 32px 15px;
                box-sizing: border-box;
              "
            >

              <!-- ==========================================
                   EMAIL CONTAINER
              =========================================== -->

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

                <!-- ========================================
                     HEADER
                ========================================= -->

                <div
                  style="
                    padding: 28px 30px;
                    background-color: #071224;
                  "
                >

                  <p
                    style="
                      margin: 0 0 8px;
                      color: #93c5fd;
                      font-size: 10px;
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
                    New Customer Support Ticket
                  </h1>

                  <p
                    style="
                      margin: 10px 0 0;
                      color: #94a3b8;
                      font-size: 13px;
                      line-height: 1.6;
                    "
                  >
                    A customer has submitted a support request
                    through the Simmply Perfect Group website.
                  </p>

                </div>

                <!-- ========================================
                     CONTENT
                ========================================= -->

                <div
                  style="
                    padding: 28px 30px;
                  "
                >

                  <!-- ======================================
                       TICKET ID
                  ======================================= -->

                  <div
                    style="
                      margin-bottom: 26px;
                      padding: 17px 18px;
                      background-color: #eff6ff;
                      border: 1px solid #dbeafe;
                      border-radius: 10px;
                    "
                  >

                    <p
                      style="
                        margin: 0 0 6px;
                        color: #64748b;
                        font-size: 10px;
                        font-weight: 700;
                        letter-spacing: 1.5px;
                        text-transform: uppercase;
                      "
                    >
                      Ticket ID
                    </p>

                    <p
                      style="
                        margin: 0;
                        color: #0A2E6F;
                        font-size: 20px;
                        font-weight: 700;
                      "
                    >
                      ${ticketId}
                    </p>

                  </div>

                  <!-- ======================================
                       CUSTOMER DETAILS
                  ======================================= -->

                  <h2
                    style="
                      margin: 0 0 14px;
                      color: #071224;
                      font-size: 16px;
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
                      margin-bottom: 28px;
                      border-collapse: collapse;
                    "
                  >

                    <tr>

                      <td
                        style="
                          width: 40%;
                          padding: 11px 0;
                          border-bottom: 1px solid #f1f5f9;
                          color: #64748b;
                          font-size: 13px;
                        "
                      >
                        Full Name
                      </td>

                      <td
                        style="
                          padding: 11px 0;
                          border-bottom: 1px solid #f1f5f9;
                          color: #071224;
                          font-size: 13px;
                          font-weight: 700;
                        "
                      >
                        ${safeFullName}
                      </td>

                    </tr>

                    <tr>

                      <td
                        style="
                          width: 40%;
                          padding: 11px 0;
                          border-bottom: 1px solid #f1f5f9;
                          color: #64748b;
                          font-size: 13px;
                        "
                      >
                        Contact Number
                      </td>

                      <td
                        style="
                          padding: 11px 0;
                          border-bottom: 1px solid #f1f5f9;
                          color: #071224;
                          font-size: 13px;
                          font-weight: 700;
                        "
                      >
                        ${safeContact}
                      </td>

                    </tr>

                  </table>

                  <!-- ======================================
                       ORDER DETAILS
                  ======================================= -->

                  <h2
                    style="
                      margin: 0 0 14px;
                      color: #071224;
                      font-size: 16px;
                    "
                  >
                    Order Details
                  </h2>

                  <table
                    role="presentation"
                    cellpadding="0"
                    cellspacing="0"
                    style="
                      width: 100%;
                      margin-bottom: 28px;
                      border-collapse: collapse;
                    "
                  >

                    <tr>

                      <td
                        style="
                          width: 40%;
                          padding: 11px 0;
                          border-bottom: 1px solid #f1f5f9;
                          color: #64748b;
                          font-size: 13px;
                        "
                      >
                        Order ID
                      </td>

                      <td
                        style="
                          padding: 11px 0;
                          border-bottom: 1px solid #f1f5f9;
                          color: #071224;
                          font-size: 13px;
                          font-weight: 700;
                        "
                      >
                        ${safeOrderId}
                      </td>

                    </tr>

                    <tr>

                      <td
                        style="
                          width: 40%;
                          padding: 11px 0;
                          border-bottom: 1px solid #f1f5f9;
                          color: #64748b;
                          font-size: 13px;
                        "
                      >
                        Item
                      </td>

                      <td
                        style="
                          padding: 11px 0;
                          border-bottom: 1px solid #f1f5f9;
                          color: #071224;
                          font-size: 13px;
                          font-weight: 700;
                        "
                      >
                        ${safeItem}
                      </td>

                    </tr>

                  </table>

                  <!-- ======================================
                       COMPLAINT
                  ======================================= -->

                  <h2
                    style="
                      margin: 0 0 12px;
                      color: #071224;
                      font-size: 16px;
                    "
                  >
                    Customer Complaint
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
                    ${safeComplaint}
                  </div>

                  <!-- ======================================
                       STATUS
                  ======================================= -->

                  <div
                    style="
                      margin-top: 26px;
                      padding: 15px 16px;
                      background-color: #fff7ed;
                      border: 1px solid #fed7aa;
                      border-radius: 8px;
                    "
                  >

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
                            color: #9a3412;
                            font-size: 12px;
                            font-weight: 700;
                          "
                        >
                          Ticket Status
                        </td>

                        <td
                          align="right"
                          style="
                            color: #c2410c;
                            font-size: 12px;
                            font-weight: 700;
                          "
                        >
                          OPEN
                        </td>

                      </tr>

                    </table>

                  </div>

                  <!-- ======================================
                       DATE
                  ======================================= -->

                  <div
                    style="
                      margin-top: 24px;
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

                <!-- ========================================
                     FOOTER
                ========================================= -->

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
                    Automated support notification from
                    Simmply Perfect Group.
                  </p>

                </div>

              </div>

            </div>

          </body>

        </html>
      `,
    });

    /* =====================================================
       SERVER LOG
    ===================================================== */

    console.log("====================================");

    console.log("SUPPORT TICKET EMAIL SENT");

    console.log("Ticket ID:", ticketId);

    console.log("Message ID:", mailResult.messageId);

    console.log(
      "Receiver:",
      "simplyperfectwindowsanddoors@gmail.com",
    );

    console.log("====================================");

    /* =====================================================
       SUCCESS RESPONSE
    ===================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Your support ticket has been submitted successfully.",

        ticketId,
      },
      {
        status: 201,
      },
    );
  } catch (error: unknown) {
    /* =====================================================
       ERROR LOG
    ===================================================== */

    console.error(
      "TICKETS EMAIL API ERROR:",
      error,
    );

    /* =====================================================
       ERROR MESSAGE
    ===================================================== */

    const message =
      error instanceof Error
        ? error.message
        : "Failed to submit support ticket.";

    /* =====================================================
       ERROR RESPONSE
    ===================================================== */

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