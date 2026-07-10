import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone, message } = body;

    // Strict validation matching the expected parameters for catalog downloads
    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required (Name, Email, Phone, and Message Context)",
        },
        {
          status: 400,
        }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // Upgrade later with STARTTLS if required by provider
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify SMTP routing connection blocks before firing dispatch
    await transporter.verify();

    // Transmit vault transaction message records
    await transporter.sendMail({
      from: `"Simmply Perfect Vault" <${process.env.SMTP_USER}>`,
      to: "simplyperfectwindowsanddoors@gmail.com",
      replyTo: email,
      subject: `📚 New Catalog Access Request - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color:#0A2E6F; margin-bottom: 5px;">
            Catalog Download Lead Captured
          </h2>
          <p style="color:#64748b; font-size: 14px; margin-top: 0;">
            A user has successfully unlocked access to the digital catalog library.
          </p>

          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />

          <p style="font-size: 15px; margin: 8px 0;"><strong>Name:</strong> ${name}</p>
          <p style="font-size: 15px; margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="font-size: 15px; margin: 8px 0;"><strong>Phone/Contact:</strong> ${phone}</p>

          <h4 style="color:#0A2E6F; margin-top: 25px; margin-bottom: 8px;">System Activity Context:</h4>
          <div
            style="
              background:#f8fafc;
              padding:15px;
              border-radius:8px;
              border-left: 4px solid #0A2E6F;
              font-size: 14px;
              color: #334155;
              line-height: 1.5;
            "
          >
            ${message.replace(/\n/g, "<br />")}
          </div>
          
          <p style="font-size: 11px; color: #94a3b8; margin-top: 30px; text-align: center;">
            Automated delivery report triggered from Simmply Perfect Group Media Vault.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Catalog lead captured and logged successfully",
    });
  } catch (error: any) {
    console.error("CATALOGS EMAIL API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to log catalog access request",
      },
      {
        status: 500,
      }
    );
  }
}