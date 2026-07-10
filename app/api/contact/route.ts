import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

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

    if (
      !name ||
      !email ||
      !phone ||
      !service ||
      !message
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

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"Simmply Perfect Website" <${process.env.SMTP_USER}>`,
      to: "simplyperfectwindowsanddoors@gmail.com",

      replyTo: email,

      subject: `New Website Inquiry - ${service}`,

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color:#0A2E6F;">
            New Contact Form Submission
          </h2>

          <hr />

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Phone:</strong> ${phone}</p>

          <p><strong>Service:</strong> ${service}</p>

          <p><strong>Message:</strong></p>

          <div
            style="
              background:#f8fafc;
              padding:15px;
              border-radius:8px;
            "
          >
            ${message}
          </div>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
    });
  } catch (error: any) {
    console.error("EMAIL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to send email",
      },
      {
        status: 500,
      }
    );
  }
}