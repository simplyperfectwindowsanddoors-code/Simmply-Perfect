import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* =========================================================
   CONFIGURATION
========================================================= */

const ADMIN_EMAIL =
  process.env.QUOTE_RECEIVER_EMAIL ||
  "simplyperfectwindowsanddoors@gmail.com";

const SMTP_USER =
  process.env.SMTP_USER ||
  "simplyperfectwindowsanddoors@gmail.com";

const COMPANY_PHONE = "+91 93907 19623";
const COMPANY_NAME = "SIMMPLY PERFECT WINDOWS & DOORS";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

/* Cache logo in memory to avoid repeated disk reads */
let cachedLogoBytes: Buffer | null = null;
async function getLogoBytes(): Promise<Buffer | null> {
  if (cachedLogoBytes) return cachedLogoBytes;
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    cachedLogoBytes = await fs.readFile(logoPath);
    return cachedLogoBytes;
  } catch {
    return null;
  }
}

/* =========================================================
   PRICING TIER CATALOG
========================================================= */

const SERVICE_BASE_CONFIG = [
  {
    id: "window-measurement",
    name: "Window Measurement",
    hydAmount: 700,
    outsideAmount: 5000,
  },
  {
    id: "service-request",
    name: "Service Request",
    hydAmount: 500,
    outsideAmount: 3000,
  },
  {
    id: "maintenance",
    name: "Maintenance",
    hydAmount: 500,
    outsideAmount: 3500,
  },
];

function isHyderabadPincode(pincode: string): boolean {
  const pin = parseInt(pincode.replace(/\D/g, ""), 10);
  return pin >= 500001 && pin <= 500099;
}

function formatToDDMMYYYY(dateString: string): string {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day.padStart(2, "0")}-${month.padStart(2, "0")}-${year}`;
  }
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

type ServiceInput = {
  id?: string;
  name?: string;
  amount?: number;
};

type NormalizedService = {
  id: string;
  name: string;
  amount: number;
};

/* =========================================================
   HELPERS
========================================================= */

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safeJson(value: string) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function generateBookingId() {
  const timestamp = Date.now().toString().slice(-7);
  const random = Math.floor(100 + Math.random() * 900);
  return `SPB-${timestamp}${random}`;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatCurrencyPdf(amount: number) {
  return `Rs.${Math.round(amount).toLocaleString("en-IN")}`;
}

function wrapText(text: string, maxCharacters: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (test.length > maxCharacters) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function normalizeServices(
  rawServices: unknown[],
  pincode: string,
): NormalizedService[] {
  const normalized: NormalizedService[] = [];
  const isHyd = isHyderabadPincode(pincode);

  for (const raw of rawServices) {
    if (!raw || typeof raw !== "object") continue;
    const input = raw as ServiceInput;

    const baseConfig = SERVICE_BASE_CONFIG.find(
      (item) => item.id === input.id || item.name === input.name,
    );

    if (!baseConfig) continue;
    if (normalized.some((item) => item.id === baseConfig.id)) continue;

    normalized.push({
      id: baseConfig.id,
      name: baseConfig.name,
      amount: isHyd ? baseConfig.hydAmount : baseConfig.outsideAmount,
    });
  }

  return normalized;
}

/* =========================================================
   PDF GENERATOR (Optimized for speed)
========================================================= */

async function generateBookingSlipPdf({
  bookingId,
  fullName,
  email,
  phone,
  company,
  pincode,
  address,
  problemStatement,
  remarks,
  plannedDateFormatted,
  services,
  total,
  utr,
  date,
}: {
  bookingId: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  pincode: string;
  address: string;
  problemStatement: string;
  remarks: string;
  plannedDateFormatted: string;
  services: NormalizedService[];
  total: number;
  utr: string;
  date: string;
}): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontSerifBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  const navy = rgb(0.04, 0.18, 0.44);
  const darkText = rgb(0.03, 0.07, 0.14);
  const slateText = rgb(0.2, 0.28, 0.38);
  const muted = rgb(0.4, 0.48, 0.58);
  const border = rgb(0.88, 0.91, 0.94);
  const lightBg = rgb(0.97, 0.98, 0.99);
  const white = rgb(1, 1, 1);

  // Background
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.95, 0.965, 0.985),
  });

  // Card Container
  const cardMargin = 30;
  const cardX = cardMargin;
  const cardY = cardMargin;
  const cardWidth = width - cardMargin * 2;
  const cardHeight = height - cardMargin * 2;

  page.drawRectangle({
    x: cardX,
    y: cardY,
    width: cardWidth,
    height: cardHeight,
    color: white,
    borderColor: border,
    borderWidth: 0.8,
  });

  // Logo Rendering
  let logoDrawn = false;
  try {
    const logoBytes = await getLogoBytes();
    if (logoBytes && logoBytes[0] === 0x89 && logoBytes[1] === 0x50) {
      const logo = await pdfDoc.embedPng(logoBytes);
      const logoScale = Math.min(85 / logo.width, 50 / logo.height);
      const logoWidth = logo.width * logoScale;
      const logoHeight = logo.height * logoScale;

      page.drawImage(logo, {
        x: cardX + 24,
        y: cardY + cardHeight - 75 + (50 - logoHeight) / 2,
        width: logoWidth,
        height: logoHeight,
      });
      logoDrawn = true;
    }
  } catch (error) {
    console.warn("Booking PDF logo skipped:", error);
  }

  // Header Title
  const headerTextX = logoDrawn ? cardX + 115 : cardX + 28;

  page.drawText(COMPANY_NAME, {
    x: headerTextX,
    y: cardY + cardHeight - 38,
    size: 8,
    font: fontBold,
    color: navy,
  });

  page.drawText("Service Booking Slip", {
    x: headerTextX,
    y: cardY + cardHeight - 65,
    size: 21,
    font: fontSerifBold,
    color: darkText,
  });

  // Right Meta
  const rightX = cardX + cardWidth - 28;

  const bookingLabel = "BOOKING NO.";
  const bookingLabelWidth = fontBold.widthOfTextAtSize(bookingLabel, 8);
  page.drawText(bookingLabel, {
    x: rightX - bookingLabelWidth,
    y: cardY + cardHeight - 38,
    size: 8,
    font: fontBold,
    color: muted,
  });

  const bookingWidth = fontBold.widthOfTextAtSize(bookingId, 13);
  page.drawText(bookingId, {
    x: rightX - bookingWidth,
    y: cardY + cardHeight - 57,
    size: 13,
    font: fontBold,
    color: navy,
  });

  const dateWidth = fontRegular.widthOfTextAtSize(date, 8.5);
  page.drawText(date, {
    x: rightX - dateWidth,
    y: cardY + cardHeight - 73,
    size: 8.5,
    font: fontRegular,
    color: muted,
  });

  // Header Divider
  const headerBottomY = cardY + cardHeight - 92;
  page.drawLine({
    start: { x: cardX, y: headerBottomY },
    end: { x: cardX + cardWidth, y: headerBottomY },
    thickness: 0.8,
    color: border,
  });

  // Customer Information
  const leftColX = cardX + 28;
  const rightColX = cardX + cardWidth / 2 + 15;
  let cursorY = headerBottomY - 26;

  function drawField(label: string, value: string, x: number, y: number, isLarge = false) {
    page.drawText(label, {
      x,
      y,
      size: 7.5,
      font: fontBold,
      color: muted,
    });
    page.drawText(value || "—", {
      x,
      y: y - 16,
      size: isLarge ? 11 : 10,
      font: isLarge ? fontBold : fontRegular,
      color: isLarge ? darkText : slateText,
    });
  }

  // Row 1: Customer / Contact
  drawField("CUSTOMER", fullName || "Customer Name", leftColX, cursorY, true);
  drawField("CONTACT (MOB)", phone || "Phone Number", rightColX, cursorY, true);

  // Row 2: Email / Pincode
  cursorY -= 40;
  drawField("EMAIL", email || "—", leftColX, cursorY);
  drawField(
    "PINCODE & REGION",
    `${pincode} (${isHyderabadPincode(pincode) ? "Hyderabad" : "Outside Hyderabad"})`,
    rightColX,
    cursorY,
  );

  // Row 3: Site Location
  cursorY -= 40;
  page.drawText("PROJECT / SITE ADDRESS", {
    x: leftColX,
    y: cursorY,
    size: 7.5,
    font: fontBold,
    color: muted,
  });

  const addressLines = wrapText(address || "Project / site address", 68).slice(0, 2);
  addressLines.forEach((line, idx) => {
    page.drawText(line, {
      x: leftColX,
      y: cursorY - 15 - idx * 13,
      size: 9.5,
      font: fontRegular,
      color: slateText,
    });
  });

  cursorY -= 20 + addressLines.length * 13;

  // Problem Statement / Planned Visit Date
  if (plannedDateFormatted || problemStatement || remarks) {
    const boxHeight = 62;
    page.drawRectangle({
      x: leftColX,
      y: cursorY - boxHeight,
      width: cardWidth - 56,
      height: boxHeight,
      color: lightBg,
      borderColor: border,
      borderWidth: 0.6,
    });

    if (plannedDateFormatted) {
      page.drawText(`Planned Site Visit (DD-MM-YYYY): ${plannedDateFormatted}`, {
        x: leftColX + 12,
        y: cursorY - 16,
        size: 8.5,
        font: fontBold,
        color: navy,
      });
    }

    if (problemStatement) {
      const pLine = wrapText(`Problem: ${problemStatement}`, 75)[0] || "";
      page.drawText(pLine, {
        x: leftColX + 12,
        y: cursorY - 32,
        size: 8.5,
        font: fontRegular,
        color: slateText,
      });
    }

    if (remarks) {
      const rLine = wrapText(`Remarks: ${remarks}`, 75)[0] || "";
      page.drawText(rLine, {
        x: leftColX + 12,
        y: cursorY - 48,
        size: 8,
        font: fontRegular,
        color: muted,
      });
    }

    cursorY -= boxHeight + 18;
  }

  // Services Table
  page.drawText("SERVICES", {
    x: leftColX,
    y: cursorY,
    size: 8,
    font: fontBold,
    color: muted,
  });

  const amtHeader = "AMOUNT";
  const amtHeaderWidth = fontBold.widthOfTextAtSize(amtHeader, 8);
  page.drawText(amtHeader, {
    x: rightX - amtHeaderWidth,
    y: cursorY,
    size: 8,
    font: fontBold,
    color: muted,
  });

  cursorY -= 10;
  page.drawLine({
    start: { x: leftColX, y: cursorY },
    end: { x: rightX, y: cursorY },
    thickness: 0.8,
    color: border,
  });

  cursorY -= 20;

  services.forEach((service) => {
    page.drawText(service.name, {
      x: leftColX,
      y: cursorY,
      size: 9.5,
      font: fontRegular,
      color: darkText,
    });

    const formattedAmt = formatCurrencyPdf(service.amount);
    const amtWidth = fontBold.widthOfTextAtSize(formattedAmt, 9.5);
    page.drawText(formattedAmt, {
      x: rightX - amtWidth,
      y: cursorY,
      size: 9.5,
      font: fontBold,
      color: darkText,
    });

    cursorY -= 8;
    page.drawLine({
      start: { x: leftColX, y: cursorY },
      end: { x: rightX, y: cursorY },
      thickness: 0.4,
      color: border,
    });

    cursorY -= 18;
  });

  // Total Section
  const totalDividerY = cardY + 160;
  page.drawLine({
    start: { x: leftColX, y: totalDividerY },
    end: { x: rightX, y: totalDividerY },
    thickness: 0.8,
    color: border,
  });

  page.drawText("TOTAL AMOUNT", {
    x: leftColX,
    y: totalDividerY - 20,
    size: 8,
    font: fontBold,
    color: muted,
  });

  page.drawText("Selected service charges", {
    x: leftColX,
    y: totalDividerY - 34,
    size: 8.5,
    font: fontRegular,
    color: muted,
  });

  const totalText = formatCurrencyPdf(total);
  const totalTextWidth = fontBold.widthOfTextAtSize(totalText, 19);
  page.drawText(totalText, {
    x: rightX - totalTextWidth,
    y: totalDividerY - 32,
    size: 19,
    font: fontBold,
    color: navy,
  });

  if (utr) {
    page.drawText(`VERIFIED PAYMENT UTR: ${utr}`, {
      x: leftColX,
      y: totalDividerY - 52,
      size: 8,
      font: fontBold,
      color: navy,
    });
  }

  // Footer Card
  const footerHeight = 88;
  const footerY = cardY;

  page.drawRectangle({
    x: cardX,
    y: footerY,
    width: cardWidth,
    height: footerHeight,
    color: lightBg,
  });

  page.drawLine({
    start: { x: cardX, y: footerY + footerHeight },
    end: { x: cardX + cardWidth, y: footerY + footerHeight },
    thickness: 0.8,
    color: border,
  });

  page.drawText("CONTACT", {
    x: leftColX,
    y: footerY + footerHeight - 24,
    size: 7.5,
    font: fontBold,
    color: muted,
  });

  page.drawText(COMPANY_PHONE, {
    x: leftColX,
    y: footerY + footerHeight - 40,
    size: 9.5,
    font: fontBold,
    color: darkText,
  });

  const emailHead = "EMAIL";
  const emailHeadWidth = fontBold.widthOfTextAtSize(emailHead, 7.5);
  page.drawText(emailHead, {
    x: rightX - emailHeadWidth,
    y: footerY + footerHeight - 24,
    size: 7.5,
    font: fontBold,
    color: muted,
  });

  const emailTextWidth = fontBold.widthOfTextAtSize(SMTP_USER, 9.5);
  page.drawText(SMTP_USER, {
    x: rightX - emailTextWidth,
    y: footerY + footerHeight - 40,
    size: 9.5,
    font: fontBold,
    color: darkText,
  });

  const noteText = "Our team will Respond promptly upon payment Confirmation.";
  const noteWidth = fontRegular.widthOfTextAtSize(noteText, 7.8);
  page.drawText(noteText, {
    x: cardX + (cardWidth - noteWidth) / 2,
    y: footerY + 16,
    size: 7.8,
    font: fontRegular,
    color: muted,
  });

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

/* =========================================================
   POST ROUTE (Fast & Reliable Deliveries)
========================================================= */

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const bookingId = String(
      formData.get("bookingId") || formData.get("quoteId") || generateBookingId(),
    ).trim();

    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const company = String(formData.get("company") || "").trim();
    const pincode = String(formData.get("pincode") || "").trim();
    const address = String(formData.get("address") || "").trim();
    const problemStatement = String(formData.get("problemStatement") || "").trim();
    const remarks = String(formData.get("remarks") || "").trim();
    const plannedDate = String(formData.get("plannedDate") || "").trim();
    const latitude = String(formData.get("latitude") || "").trim();
    const longitude = String(formData.get("longitude") || "").trim();
    const locationAccuracy = String(formData.get("locationAccuracy") || "").trim();
    const utr = String(formData.get("utr") || "").trim();
    const rawServices = safeJson(String(formData.get("services") || "[]"));

    const issuePhoto = formData.get("issuePhoto");
    const paymentScreenshot = formData.get("paymentScreenshot");

    /* Validation */
    if (!fullName || !phone || !pincode || !address || !problemStatement || !plannedDate || !rawServices.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields (Name, Mob, Pincode, Site Location, Problem Statement, Planned Date, and Service Category).",
        },
        { status: 400 },
      );
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 10-digit mobile number." },
        { status: 400 },
      );
    }

    const pinDigits = pincode.replace(/\D/g, "");
    if (pinDigits.length !== 6) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid 6-digit Pincode." },
        { status: 400 },
      );
    }

    const isCustomerEmailValid = email ? /^\S+@\S+\.\S+$/.test(email) : false;

    if (!latitude || !longitude) {
      return NextResponse.json(
        { success: false, message: "Pin location is required." },
        { status: 400 },
      );
    }

    if (!utr) {
      return NextResponse.json(
        { success: false, message: "Payment UTR is required." },
        { status: 400 },
      );
    }

    if (!(paymentScreenshot instanceof File) || paymentScreenshot.size === 0) {
      return NextResponse.json(
        { success: false, message: "Payment screenshot is required." },
        { status: 400 },
      );
    }

    if (paymentScreenshot.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "Payment screenshot must be below 10MB." },
        { status: 400 },
      );
    }

    if (!(issuePhoto instanceof File) || issuePhoto.size === 0) {
      return NextResponse.json(
        { success: false, message: "Photo of the issue is required." },
        { status: 400 },
      );
    }

    if (issuePhoto.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, message: "Issue photo must be below 10MB." },
        { status: 400 },
      );
    }

    // Dynamic Services based on Pincode
    const services = normalizeServices(rawServices, pincode);
    if (!services.length) {
      return NextResponse.json(
        { success: false, message: "Please select at least one valid service." },
        { status: 400 },
      );
    }

    const total = services.reduce((sum, service) => sum + service.amount, 0);

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.error("BOOKINGS API: SMTP configuration is missing.");
      return NextResponse.json(
        { success: false, message: "Email service is not configured." },
        { status: 500 },
      );
    }

    const submittedDate = new Date().toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const submittedTimestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const plannedDateFormatted = formatToDDMMYYYY(plannedDate);
    const isHyd = isHyderabadPincode(pincode);

    // Parallelize buffer generation for fast response times
    const [pdfBuffer, screenshotBuffer, issuePhotoBuffer] = await Promise.all([
      generateBookingSlipPdf({
        bookingId,
        fullName,
        email: email || "Not provided",
        phone,
        company: company || "—",
        pincode,
        address,
        problemStatement,
        remarks,
        plannedDateFormatted,
        services,
        total,
        utr,
        date: submittedDate,
      }),
      paymentScreenshot.arrayBuffer().then((buf) => Buffer.from(buf)),
      issuePhoto.arrayBuffer().then((buf) => Buffer.from(buf)),
    ]);

    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(`${latitude},${longitude}`)}`;

    /* High-performance Nodemailer Transporter */
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass.replace(/\s+/g, ""),
      },
      connectionTimeout: 8000,
      greetingTimeout: 8000,
      socketTimeout: 20000,
    });

    const safeName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email || "Not provided");
    const safePhone = escapeHtml(phone);
    const safeCompany = escapeHtml(company || "Not provided");
    const safePincode = escapeHtml(pincode);
    const safeAddress = escapeHtml(address);
    const safeProblem = escapeHtml(problemStatement).replace(/\n/g, "<br />");
    const safeRemarks = escapeHtml(remarks || "None").replace(/\n/g, "<br />");
    const safeUtr = escapeHtml(utr);
    const safeAccuracy = escapeHtml(locationAccuracy || "Not provided");

    const serviceRows = services
      .map(
        (service) => `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#475569;">${escapeHtml(service.name)}</td>
            <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;text-align:right;color:#172033;font-weight:700;">${formatCurrency(service.amount)}</td>
          </tr>`,
      )
      .join("");

    const serviceText = services
      .map((service) => `${service.name}: ${formatCurrency(service.amount)}`)
      .join("\n");

    const bookingPdfAttachment = {
      filename: `Service-Booking-Slip-${bookingId}.pdf`,
      content: pdfBuffer,
      contentType: "application/pdf",
    };

    // Exactly 3 Attachments for Owner
    const adminAttachments = [
      bookingPdfAttachment,
      {
        filename: paymentScreenshot.name || `Payment-${bookingId}.png`,
        content: screenshotBuffer,
        contentType: paymentScreenshot.type || "application/octet-stream",
      },
      {
        filename: issuePhoto.name || `Issue-Photo-${bookingId}.png`,
        content: issuePhotoBuffer,
        contentType: issuePhoto.type || "application/octet-stream",
      },
    ];

    /* Authentic From Address: Prevents DMARC/SPF drop */
    const authSenderAddress = smtpUser;

    const adminMail = {
      from: `"${COMPANY_NAME}" <${authSenderAddress}>`,
      to: ADMIN_EMAIL,
      replyTo: isCustomerEmailValid ? email : authSenderAddress,
      subject: `🚨 NEW BOOKING: ${bookingId} - ${formatCurrency(total)} (UTR: ${utr}) - ${fullName}`,
      attachments: adminAttachments,
      html: `
        <!doctype html>
        <html>
          <head><meta charset="UTF-8" /></head>
          <body style="margin:0;padding:0;background:#f3f6fa;font-family:Arial,Helvetica,sans-serif;color:#172033;">
            <div style="max-width:740px;margin:30px auto;background:#ffffff;border:1px solid #dfe6ef;border-radius:18px;overflow:hidden;">
              
              <div style="background:#071b43;padding:28px;color:#ffffff;">
                <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#9db5d9;text-transform:uppercase;">${COMPANY_NAME}</div>
                <h1 style="margin:8px 0 0;font-size:24px;">New Service Request & Booking</h1>
                <p style="margin:8px 0 0;color:#cbd5e1;font-size:13px;">Booking No: <strong style="color:#ffffff;">${escapeHtml(bookingId)}</strong></p>
              </div>

              <div style="padding:28px;">
                <div style="background:#eff6ff;border:2px solid #3b82f6;border-radius:14px;padding:18px;margin-bottom:24px;">
                  <div style="font-size:11px;font-weight:700;color:#1e40af;text-transform:uppercase;letter-spacing:1px;">Verified Payment Reference</div>
                  <div style="font-size:26px;font-weight:900;color:#0A2E6F;margin-top:4px;letter-spacing:0.5px;">UTR: ${safeUtr}</div>
                  <div style="font-size:14px;color:#1e3a8a;margin-top:4px;">Amount Paid: <strong>${formatCurrency(total)}</strong> (${isHyd ? "In Hyderabad" : "Outside Hyderabad"})</div>
                </div>

                <h3 style="margin:0 0 12px;color:#0A2E6F;font-size:14px;text-transform:uppercase;">Customer & Site Details</h3>
                <table style="width:100%;font-size:13px;line-height:1.6;margin-bottom:20px;">
                  <tr><td style="width:170px;color:#64748b;font-weight:600;">Name:</td><td><strong>${safeName}</strong></td></tr>
                  <tr><td style="color:#64748b;font-weight:600;">Mob:</td><td><strong>${safePhone}</strong></td></tr>
                  <tr><td style="color:#64748b;font-weight:600;">Email:</td><td>${safeEmail}</td></tr>
                  <tr><td style="color:#64748b;font-weight:600;">Company:</td><td>${safeCompany}</td></tr>
                  <tr><td style="color:#64748b;font-weight:600;">Pincode:</td><td><strong>${safePincode} (${isHyd ? "In Hyderabad" : "Outside Hyderabad"})</strong></td></tr>
                  <tr><td style="color:#64748b;font-weight:600;">Site Location:</td><td><strong>${safeAddress}</strong></td></tr>
                  <tr><td style="color:#64748b;font-weight:600;">Planned Site Visit Date:</td><td><strong style="color:#0A2E6F;font-size:15px;">${plannedDateFormatted}</strong></td></tr>
                </table>

                <h3 style="margin:20px 0 8px;color:#0A2E6F;font-size:14px;text-transform:uppercase;">Problem Statement</h3>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;font-size:13px;line-height:1.6;">${safeProblem}</div>

                <h3 style="margin:20px 0 8px;color:#0A2E6F;font-size:14px;text-transform:uppercase;">Remarks</h3>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;font-size:13px;">${safeRemarks}</div>

                <h3 style="margin:25px 0 10px;color:#0A2E6F;font-size:14px;text-transform:uppercase;">Booked Services (${isHyd ? "Hyderabad Rates" : "Outside Hyderabad Rates"})</h3>
                <table style="width:100%;border-collapse:collapse;font-size:13px;">${serviceRows}
                  <tr>
                    <td style="padding:15px 0;font-weight:800;font-size:14px;">TOTAL PAID</td>
                    <td style="padding:15px 0;text-align:right;font-weight:900;color:#0A2E6F;font-size:18px;">${formatCurrency(total)}</td>
                  </tr>
                </table>

                <h3 style="margin:25px 0 10px;color:#0A2E6F;font-size:14px;text-transform:uppercase;">GPS Site Location</h3>
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;font-size:13px;">
                  <p style="margin:0 0 6px;"><strong>Coordinates:</strong> ${escapeHtml(latitude)}, ${escapeHtml(longitude)}</p>
                  <p style="margin:0 0 10px;color:#64748b;font-size:12px;">Accuracy: ~${safeAccuracy} meters</p>
                  <a href="${mapUrl}" target="_blank" style="display:inline-block;background:#0A2E6F;color:#fff;text-decoration:none;font-weight:bold;font-size:12px;padding:8px 16px;border-radius:8px;">Open Location in Google Maps &rarr;</a>
                </div>

                <div style="margin-top:24px;padding:14px;background:#f1f5f9;border-radius:10px;font-size:12px;color:#475569;">
                  📎 <strong>3 Attachments Included:</strong><br/>
                  1. Official PDF Service Booking Slip<br/>
                  2. User Payment Verification Screenshot<br/>
                  3. Uploaded Issue Photo
                </div>

                <div style="margin-top:20px;padding:12px;background:#fffbeb;border:1px solid #fef3c7;border-radius:8px;font-size:12px;color:#92400e;">
                  🔔 Note: Our team will Respond promptly upon payment Confirmation.
                </div>

                <p style="margin-top:25px;color:#94a3b8;font-size:11px;">Submitted on: ${escapeHtml(submittedTimestamp)}</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
SIMMPLY PERFECT WINDOWS & DOORS
NEW SERVICE BOOKING REQUEST

Booking Number: ${bookingId}
Customer: ${fullName}
Mob: ${phone}
Email: ${email || "Not provided"}
Pincode: ${pincode} (${isHyd ? "In Hyderabad" : "Outside Hyderabad"})
Site Location: ${address}
Planned Site Visit Date (DD-MM-YYYY): ${plannedDateFormatted}

Problem Statement:
${problemStatement}

Remarks:
${remarks || "None"}

SERVICES:
${serviceText}

TOTAL PAID: ${formatCurrency(total)}
PAYMENT UTR: ${utr}

GPS Location: ${latitude}, ${longitude} (${mapUrl})

Attachments:
1. Service-Booking-Slip-${bookingId}.pdf
2. Payment Screenshot
3. Photo of the Issue

Note: Our team will Respond promptly upon payment Confirmation.
Submitted: ${submittedTimestamp}
      `,
    };

    // Customer Mail
    const customerMail = isCustomerEmailValid
      ? {
          from: `"${COMPANY_NAME}" <${authSenderAddress}>`,
          to: email,
          replyTo: authSenderAddress,
          subject: `Service Booking Slip — ${bookingId}`,
          attachments: [bookingPdfAttachment],
          html: `
            <!doctype html>
            <html>
              <head><meta charset="UTF-8" /></head>
              <body style="margin:0;padding:0;background:#f3f6fa;font-family:Arial,Helvetica,sans-serif;color:#172033;">
                <div style="max-width:680px;margin:30px auto;background:#ffffff;border:1px solid #dfe6ef;border-radius:18px;overflow:hidden;">
                  
                  <div style="background:#071b43;padding:28px;color:#ffffff;">
                    <div style="font-size:11px;font-weight:700;letter-spacing:2px;color:#9db5d9;text-transform:uppercase;">${COMPANY_NAME}</div>
                    <h1 style="margin:8px 0 0;font-size:24px;">Service Booking Confirmed</h1>
                  </div>

                  <div style="padding:28px;">
                    <p style="margin:0;font-size:15px;">Dear <strong>${safeName}</strong>,</p>
                    <p style="margin:14px 0;color:#475569;font-size:13px;line-height:1.7;">
                      Thank you for choosing <strong>${COMPANY_NAME}</strong>. We have received your service booking and payment details. Your official <strong>Service Booking Slip is attached as a PDF</strong>.
                    </p>

                    <div style="margin:20px 0;padding:16px;background:#f3f7fc;border:1px solid #dbe5f1;border-radius:14px;text-align:center;">
                      <div style="font-size:9px;letter-spacing:1.5px;color:#64748b;text-transform:uppercase;font-weight:700;">Booking Number</div>
                      <div style="margin-top:6px;color:#0A2E6F;font-size:22px;font-weight:900;">${escapeHtml(bookingId)}</div>
                      <div style="margin-top:4px;font-size:12px;color:#1e40af;">Transaction UTR: <strong>${safeUtr}</strong></div>
                    </div>

                    <div style="margin-bottom:20px;font-size:13px;line-height:1.6;color:#334155;">
                      <p style="margin:4px 0;"><strong>Planned Site Visit (DD-MM-YYYY):</strong> ${plannedDateFormatted}</p>
                      <p style="margin:4px 0;"><strong>Site Location:</strong> ${safeAddress}</p>
                    </div>

                    <table style="width:100%;border-collapse:collapse;font-size:13px;">${serviceRows}
                      <tr>
                        <td style="padding:14px 0;font-weight:800;font-size:14px;">TOTAL PAID</td>
                        <td style="padding:14px 0;text-align:right;font-size:18px;font-weight:900;color:#0A2E6F;">${formatCurrency(total)}</td>
                      </tr>
                    </table>

                    <div style="margin-top:20px;padding:14px;background:#fffbeb;border:1px solid #fef3c7;border-radius:10px;font-size:12px;color:#92400e;line-height:1.5;">
                      🔔 <strong>Note:</strong> Our team will Respond promptly upon payment Confirmation.
                    </div>

                    <p style="margin-top:22px;color:#64748b;font-size:12px;line-height:1.7;">
                      Please find your official Service Booking Slip attached to this email for your records.
                    </p>
                  </div>

                  <div style="padding:20px 28px;background:#f7f9fc;border-top:1px solid #e5e7eb;text-align:center;">
                    <p style="margin:0;color:#64748b;font-size:11px;">${COMPANY_NAME}</p>
                    <p style="margin:6px 0 0;color:#94a3b8;font-size:10px;">${COMPANY_PHONE} &nbsp;|&nbsp; ${authSenderAddress}</p>
                  </div>
                </div>
              </body>
            </html>
          `,
          text: `
Dear ${fullName},

Thank you for choosing ${COMPANY_NAME}.
Your service booking and payment details have been received successfully.

Booking Number: ${bookingId}
Planned Site Visit (DD-MM-YYYY): ${plannedDateFormatted}
Total Paid: ${formatCurrency(total)}
Transaction UTR: ${utr}

Note: Our team will Respond promptly upon payment Confirmation.
Your official Service Booking Slip is attached as a PDF.

Regards,
${COMPANY_NAME}
${COMPANY_PHONE}
          `,
        }
      : null;

    /* Execute both sends concurrently with settled status check to prevent silent drops */
    const emailTasks = [transporter.sendMail(adminMail)];
    if (customerMail) {
      emailTasks.push(transporter.sendMail(customerMail));
    }

    const results = await Promise.allSettled(emailTasks);
    results.forEach((res, i) => {
      if (res.status === "rejected") {
        console.error(`Email delivery ${i === 0 ? "Admin" : "Customer"} failed:`, res.reason);
      }
    });

    return NextResponse.json(
      {
        success: true,
        message: "Service booking submitted successfully.",
        bookingId,
        quoteId: bookingId,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("SERVICE BOOKING API ERROR:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unable to submit the service booking.",
      },
      { status: 500 },
    );
  }
}