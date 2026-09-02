"use client";

import {
  FormEvent,
  ReactNode,
  ElementType,
  useMemo,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Phone,
  User,
  CreditCard,
  MapPin,
  Navigation,
  ReceiptText,
  ChevronRight,
  ArrowLeft,
  Loader2,
  Upload,
  Calendar,
  Image as ImageIcon,
  Info,
  FileText,
  Home,
  Download,
} from "lucide-react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

/* =========================================================
   CONFIGURATION & CATALOG
========================================================= */

const PAYMENT_SCANNER_PATH = "/payment-scanner.png";
const COMPANY_NAME = "Simmply Perfect Windows & Doors";
const COMPANY_EMAIL = "simplyperfectwindowsanddoors@gmail.com";
const COMPANY_PHONE = "+91 93907 19623";
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const SERVICE_BASE_CONFIG = [
  {
    id: "window-measurement",
    name: "Site visit for Window Measurement",
    hydAmount: 700,
    outsideAmount: 5000,
  },
  {
    id: "door-measurement",
    name: "Site Visit for Door Measurement",
    hydAmount: 700,
    outsideAmount: 5000,
  },
  {
    id: "repair-maintenance",
    name: "Site Visit for Repair and Maintenance",
    hydAmount: 500,
    outsideAmount: 3500,
  },
];

export function formatToDDMMYYYY(dateString: string): string {
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

export function extractCoordinatesFromMapsLink(url: string): { latitude: string; longitude: string } | null {
  if (!url) return null;
  try {
    const regex = /@?(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = url.match(regex);
    if (match) {
      return { latitude: match[1], longitude: match[2] };
    }
    return null;
  } catch (e) {
    return null;
  }
}

type LocationMode = "at-site" | "away-from-site";

type BookingFormData = {
  fullName: string;
  phone: string;
  isHyderabad: boolean;
  address: string;
  problemStatement: string;
  remarks: string;
  plannedDate: string;
  issuePhoto: File | null;
  services: string[];

  /* SITE LOCATION */
  locationMode: LocationMode;
  latitude: string;
  longitude: string;
  locationAccuracy: string;
  locationLink: string;

  paymentScreenshot: File | null;
  utr: string;
};

type BookingApiResponse = {
  success: boolean;
  message: string;
  quoteId?: string;
  bookingId?: string;
};

const initialBookingForm: BookingFormData = {
  fullName: "",
  phone: "",
  isHyderabad: true,
  address: "",
  problemStatement: "",
  remarks: "",
  plannedDate: "",
  issuePhoto: null,
  services: [],

  locationMode: "at-site",
  latitude: "",
  longitude: "",
  locationAccuracy: "",
  locationLink: "",

  paymentScreenshot: null,
  utr: "",
};

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

export default function BookServicePage() {
  const router = useRouter();

  const [hasMounted, setHasMounted] = useState(false);
  const [bookingNumber, setBookingNumber] = useState("SPB-PENDING");
  const [bookingStep, setBookingStep] = useState<"details" | "payment" | "success">("details");
  const [isSubmittingBooking, setIsSubmittingBooking] = useState(false);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [hasDownloadedSlip, setHasDownloadedSlip] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [bookingForm, setBookingForm] = useState<BookingFormData>(initialBookingForm);
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const timestamp = Date.now().toString().slice(-8);
    setBookingNumber(`SPB-${timestamp}`);
  }, []);

  const computedServices = useMemo(() => {
    return SERVICE_BASE_CONFIG.map((srv) => ({
      id: srv.id,
      name: srv.name,
      amount: bookingForm.isHyderabad ? srv.hydAmount : srv.outsideAmount,
    }));
  }, [bookingForm.isHyderabad]);

  const selectedServices = useMemo(() => {
    return computedServices.filter((service) =>
      bookingForm.services.includes(service.id),
    );
  }, [computedServices, bookingForm.services]);

  const bookingTotal = useMemo(() => {
    return selectedServices.reduce((total, service) => total + service.amount, 0);
  }, [selectedServices]);

  const updateBookingField = <K extends keyof BookingFormData>(
    field: K,
    value: BookingFormData[K],
  ) => {
    setBookingError("");
    setBookingForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const toggleService = (serviceId: string) => {
    setBookingError("");
    setBookingForm((previous) => ({
      ...previous,
      services: previous.services.includes(serviceId)
        ? previous.services.filter((id) => id !== serviceId)
        : [...previous.services, serviceId],
    }));
  };

  const captureLocation = () => {
    if (!navigator.geolocation) {
      setBookingError(
        "Location services are not supported by this browser.",
      );
      return;
    }

    setLocationLoading(true);
    setBookingError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude.toFixed(7);
        const longitude = position.coords.longitude.toFixed(7);
        const accuracy = Math.round(position.coords.accuracy).toString();
        const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

        setBookingForm((previous) => ({
          ...previous,
          locationMode: "at-site",
          latitude,
          longitude,
          locationAccuracy: accuracy,
          locationLink: mapUrl,
        }));

        setLocationLoading(false);
      },
      (error) => {
        console.error("Location error:", error);
        setLocationLoading(false);
        setBookingError(
          "Unable to get your current location. Please allow location access and try again.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  };

  const handleMapsLinkChange = (value: string) => {
    setBookingError("");
    const coordinates = extractCoordinatesFromMapsLink(value);

    setBookingForm((previous) => ({
      ...previous,
      locationMode: "away-from-site",
      locationLink: value,
      latitude: coordinates?.latitude ?? "",
      longitude: coordinates?.longitude ?? "",
      locationAccuracy: coordinates ? "Coordinates from Google Maps pin" : "",
    }));
  };

  const validateBookingDetails = () => {
    if (!bookingForm.fullName.trim()) return "Please enter your Name.";
    const phoneDigits = bookingForm.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      return "Please enter a valid 10-digit Mobile Number.";
    }
    if (!bookingForm.address.trim()) return "Please enter your Site Location address.";
    if (!bookingForm.problemStatement.trim()) return "Please enter the Problem Statement.";
    if (!bookingForm.plannedDate.trim()) {
      return "Please select a planned Date for the Site Visit / Service.";
    }
    if (bookingForm.issuePhoto && bookingForm.issuePhoto.size > MAX_FILE_SIZE) {
      return "Issue photo must be less than 10MB.";
    }
    if (!bookingForm.services.length) {
      return "Please select at least one Service Category.";
    }
    if (!bookingTotal) return "Please select a valid service.";
    return "";
  };

  const goToPayment = () => {
    const error = validateBookingDetails();
    setBookingError(error);
    if (error) return;
    setBookingStep("payment");
  };

  const handleDownloadPdf = async () => {
    try {
      setIsDownloadingPdf(true);
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

      page.drawRectangle({
        x: 0,
        y: 0,
        width,
        height,
        color: rgb(0.95, 0.965, 0.985),
      });

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

      let logoDrawn = false;
      try {
        const logoRes = await fetch("/logo.png");
        if (logoRes.ok) {
          const logoArrayBuffer = await logoRes.arrayBuffer();
          const logo = await pdfDoc.embedPng(logoArrayBuffer);
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
      } catch (err) {
        console.warn("Client PDF logo embedding skipped", err);
      }

      const headerTextX = logoDrawn ? cardX + 115 : cardX + 28;

      page.drawText(COMPANY_NAME.toUpperCase(), {
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

      const bookingWidth = fontBold.widthOfTextAtSize(bookingNumber, 13);
      page.drawText(bookingNumber, {
        x: rightX - bookingWidth,
        y: cardY + cardHeight - 57,
        size: 13,
        font: fontBold,
        color: navy,
      });

      const dateStr = new Date().toLocaleDateString("en-IN");
      const dateWidth = fontRegular.widthOfTextAtSize(dateStr, 8.5);
      page.drawText(dateStr, {
        x: rightX - dateWidth,
        y: cardY + cardHeight - 73,
        size: 8.5,
        font: fontRegular,
        color: muted,
      });

      const headerBottomY = cardY + cardHeight - 92;
      page.drawLine({
        start: { x: cardX, y: headerBottomY },
        end: { x: cardX + cardWidth, y: headerBottomY },
        thickness: 0.8,
        color: border,
      });

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

      drawField("CUSTOMER", bookingForm.fullName || "Customer Name", leftColX, cursorY, true);
      drawField("CONTACT (MOB)", bookingForm.phone || "Phone Number", rightColX, cursorY, true);

      cursorY -= 40;
      
      let locationText = bookingForm.isHyderabad ? "In Hyderabad" : "Outside Hyderabad";
      if (bookingForm.locationMode === "at-site") {
        locationText += ` (At Site - GPS: ${bookingForm.latitude || 'Pending'})`;
      } else {
        locationText += ` (Away from Site - Map Pin Provided)`;
      }

      drawField("LOCATION REGION & MODE", locationText, leftColX, cursorY, false);

      cursorY -= 40;
      page.drawText("PROJECT / SITE ADDRESS", {
        x: leftColX,
        y: cursorY,
        size: 7.5,
        font: fontBold,
        color: muted,
      });

      const addressLines = wrapText(bookingForm.address || "Project / site address", 68).slice(0, 2);
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

      const plannedDateFormatted = formatToDDMMYYYY(bookingForm.plannedDate);
      if (plannedDateFormatted || bookingForm.problemStatement || bookingForm.remarks) {
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

        if (bookingForm.problemStatement) {
          const pLine = wrapText(`Problem: ${bookingForm.problemStatement}`, 75)[0] || "";
          page.drawText(pLine, {
            x: leftColX + 12,
            y: cursorY - 32,
            size: 8.5,
            font: fontRegular,
            color: slateText,
          });
        }

        if (bookingForm.remarks) {
          const rLine = wrapText(`Remarks: ${bookingForm.remarks}`, 75)[0] || "";
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

      selectedServices.forEach((service) => {
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

      const totalText = formatCurrencyPdf(bookingTotal);
      const totalTextWidth = fontBold.widthOfTextAtSize(totalText, 19);
      page.drawText(totalText, {
        x: rightX - totalTextWidth,
        y: totalDividerY - 32,
        size: 19,
        font: fontBold,
        color: navy,
      });

      if (bookingForm.utr) {
        page.drawText(`VERIFIED PAYMENT UTR: ${bookingForm.utr}`, {
          x: leftColX,
          y: totalDividerY - 52,
          size: 8,
          font: fontBold,
          color: navy,
        });
      }

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

      const emailTextWidth = fontBold.widthOfTextAtSize(COMPANY_EMAIL, 9.5);
      page.drawText(COMPANY_EMAIL, {
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
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Service-Booking-Slip-${bookingNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setHasDownloadedSlip(true);
    } catch (err) {
      console.error("PDF download failed", err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const submitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmittingBooking) return;

    if (bookingForm.locationMode === "at-site") {
      if (!bookingForm.latitude || !bookingForm.longitude) {
        setBookingError("Please capture your current location before submitting.");
        return;
      }
    } else if (bookingForm.locationMode === "away-from-site") {
      if (!bookingForm.locationLink.trim() || !bookingForm.locationLink.startsWith("http")) {
        setBookingError("Please provide a valid Google Maps link (http/https).");
        return;
      }
    }

    if (!bookingForm.paymentScreenshot) {
      setBookingError("Please upload your payment screenshot.");
      return;
    }
    if (bookingForm.paymentScreenshot.size > MAX_FILE_SIZE) {
      setBookingError("Payment screenshot must be below 10MB.");
      return;
    }
    if (!bookingForm.utr.trim()) {
      setBookingError("Please enter the UTR / transaction reference number.");
      return;
    }
    if (!hasDownloadedSlip) {
      setBookingError("Please download or confirm you have saved the Service Booking Slip before submitting.");
      return;
    }

    setBookingError("");
    setIsSubmittingBooking(true);

    try {
      const form = new FormData();
      form.append("quoteId", bookingNumber);
      form.append("bookingId", bookingNumber);
      form.append("fullName", bookingForm.fullName.trim());
      form.append("phone", bookingForm.phone.trim());
      form.append("isHyderabad", String(bookingForm.isHyderabad));
      form.append("address", bookingForm.address.trim());
      form.append("problemStatement", bookingForm.problemStatement.trim());
      form.append("remarks", bookingForm.remarks.trim());
      form.append("plannedDate", bookingForm.plannedDate.trim());
      form.append("services", JSON.stringify(selectedServices));
      form.append("total", String(bookingTotal));
      
      // New Location Fields
      form.append("locationMode", bookingForm.locationMode);
      form.append("locationLink", bookingForm.locationLink.trim());
      form.append("latitude", bookingForm.latitude || "");
      form.append("longitude", bookingForm.longitude || "");
      form.append("locationAccuracy", bookingForm.locationAccuracy || "");

      form.append("utr", bookingForm.utr.trim());

      if (bookingForm.issuePhoto) {
        form.append("issuePhoto", bookingForm.issuePhoto);
      }
      if (bookingForm.paymentScreenshot) {
        form.append("paymentScreenshot", bookingForm.paymentScreenshot);
      }

      form.append("documentType", "service-booking-slip");
      form.append("documentTitle", "Service Booking Slip");

      const response = await fetch("/api/quotes", {
        method: "POST",
        body: form,
      });

      const result = (await response.json()) as BookingApiResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit the service booking.");
      }

      setBookingId(result.bookingId || result.quoteId || bookingNumber);
      setBookingStep("success");
    } catch (error) {
      console.error("Service booking failed:", error);
      setBookingError(
        error instanceof Error ? error.message : "Unable to submit the service booking.",
      );
    } finally {
      setIsSubmittingBooking(false);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden bg-[#f5f7fb]">
      {/* FIXED TOP NAVIGATION BAR */}
      <header className="z-30 flex shrink-0 items-center justify-between border-b border-slate-200/90 bg-white px-3 py-2.5 sm:px-8 sm:py-3.5 print:hidden">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => {
              if (bookingStep === "payment") {
                setBookingError("");
                setBookingStep("details");
              } else {
                router.back();
              }
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-900 sm:px-4"
          >
            <ArrowLeft className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
            <span className="text-[11px] sm:text-xs">
              {bookingStep === "payment" ? "Back to Form" : "Back"}
            </span>
          </button>
        </div>

        <div className="mx-2 flex min-w-0 flex-1 items-center justify-center gap-2 text-center sm:gap-2.5 sm:text-left">
          <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0A2E6F] text-white sm:flex">
            {bookingStep === "payment" ? (
              <CreditCard className="h-4 w-4" />
            ) : (
              <ReceiptText className="h-4 w-4" />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-[8px] font-bold uppercase tracking-[0.14em] text-[#0A2E6F] sm:text-[9px] sm:tracking-[0.16em]">
              {COMPANY_NAME}
            </p>
            <h1 className="truncate text-[11px] font-bold text-slate-900 sm:text-sm">
              {bookingStep === "details"
                ? "Service Booking Request"
                : bookingStep === "payment"
                  ? "Payment Verification"
                  : "Booking Submitted"}
            </h1>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <span className="hidden rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold text-[#0A2E6F] md:inline-block">
            {bookingStep === "details" ? "Step 1 of 2" : bookingStep === "payment" ? "Step 2 of 2" : "Confirmed"}
          </span>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-[#0A2E6F] sm:w-auto sm:gap-1.5 sm:px-3.5"
            aria-label="Home"
          >
            <Home className="h-4 w-4 shrink-0" />
            <span className="hidden text-xs font-semibold sm:inline">Home</span>
          </button>
        </div>
      </header>

      {/* VIEWPORT BODY */}
      <div className="flex min-h-0 flex-1 overflow-hidden print:overflow-visible">
        {bookingStep === "success" ? (
          <div className="flex flex-1 items-center justify-center overflow-y-auto p-4 sm:p-6 print:hidden">
            <div className="w-full max-w-lg rounded-[26px] border border-slate-200 bg-white p-6 text-center shadow-lg sm:p-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600 sm:h-16 sm:w-16">
                <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8" />
              </div>

              <h2 className="mt-4 text-xl font-bold text-[#071224] sm:mt-5 sm:text-2xl">
                Booking Submitted Successfully
              </h2>

              <p className="mx-auto mt-2 text-xs leading-5 text-slate-500 sm:mt-3 sm:text-sm sm:leading-6">
                Your service request and payment details have been submitted. An official PDF Service Booking Slip has been sent to the team.
              </p>

              <div className="mx-auto mt-5 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 sm:mt-6 sm:p-5">
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Booking Reference
                </p>
                <p className="mt-1 text-lg font-black text-[#0A2E6F] sm:text-xl">
                  {bookingId || bookingNumber}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Total Paid: {formatCurrency(bookingTotal)}
                </p>
              </div>

              <div className="mx-auto mt-4 rounded-xl bg-slate-100 p-3">
                <p className="text-xs font-semibold text-slate-600">
                  🔔 Note: Our team will Respond promptly upon payment Confirmation.
                </p>
              </div>

              <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:mt-7 sm:flex-row sm:gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isDownloadingPdf}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 sm:w-auto sm:text-sm"
                >
                  <Download className="h-4 w-4" />
                  {isDownloadingPdf ? "Generating..." : "Download Slip"}
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="w-full rounded-full bg-[#0A2E6F] px-8 py-3 text-xs font-bold text-white transition hover:bg-[#08265d] sm:w-auto sm:text-sm"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </div>
        ) : bookingStep === "details" ? (
          /* STEP 1: FORM ONLY */
          <div className="h-full w-full overflow-y-auto bg-[#f5f7fb] p-3 sm:p-8 print:hidden">
            <div className="mx-auto max-w-2xl rounded-[26px] border border-slate-200/90 bg-white p-5 shadow-sm sm:p-10">
              <div className="mb-5 sm:mb-6">
                <h2 className="text-xl font-bold text-[#071224] sm:text-2xl">
                  Service Request Details
                </h2>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Choose your location category to see adjusted service pricing.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Name" required icon={User}>
                  <input
                    className={quoteInputStyles}
                    autoComplete="name"
                    value={bookingForm.fullName}
                    onChange={(e) => updateBookingField("fullName", e.target.value)}
                    placeholder="Your Full Name"
                  />
                </FormField>

                <FormField label="Mobile" required icon={Phone}>
                  <input
                    className={quoteInputStyles}
                    type="tel"
                    autoComplete="tel"
                    value={bookingForm.phone}
                    onChange={(e) =>
                      updateBookingField("phone", e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="10-digit Mobile Number"
                    maxLength={10}
                  />
                </FormField>
              </div>

              {/* LOCATION REGION TOGGLE */}
              <div className="mt-4">
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#071224]">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-[#0A2E6F]" />
                  <span>Location Region</span>
                  <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1.5">
                  <button
                    type="button"
                    onClick={() => updateBookingField("isHyderabad", true)}
                    className={`rounded-lg py-2.5 text-xs font-bold transition-all ${
                      bookingForm.isHyderabad
                        ? "bg-[#0A2E6F] text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    📍 In Hyderabad
                  </button>

                  <button
                    type="button"
                    onClick={() => updateBookingField("isHyderabad", false)}
                    className={`rounded-lg py-2.5 text-xs font-bold transition-all ${
                      !bookingForm.isHyderabad
                        ? "bg-[#0A2E6F] text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    🚗 Outside Hyderabad
                  </button>
                </div>
              </div>

              {/* POSTAL ADDRESS */}
              <div className="mt-4">
                <FormField label="Postal Address" required icon={MapPin}>
                  <textarea
                    className={`${quoteInputStyles} min-h-[70px] resize-none`}
                    value={bookingForm.address}
                    onChange={(e) => updateBookingField("address", e.target.value)}
                    placeholder="Complete Site Address, Area & Landmarks"
                  />
                </FormField>
              </div>

              {/* PROBLEM STATEMENT */}
              <div className="mt-4">
                <FormField label="Problem Statement" required icon={AlertCircle}>
                  <textarea
                    className={`${quoteInputStyles} min-h-[75px] resize-none`}
                    value={bookingForm.problemStatement}
                    onChange={(e) =>
                      updateBookingField("problemStatement", e.target.value)
                    }
                    placeholder="Describe the issue / repair / measurement needed..."
                  />
                </FormField>
              </div>

              {/* PLANNED DATE & REMARKS */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <FormField label="Site Visit Planned Date" required icon={Calendar}>
                  <input
                    type="date"
                    className={quoteInputStyles}
                    min={new Date().toISOString().split("T")[0]}
                    value={bookingForm.plannedDate}
                    onChange={(e) =>
                      updateBookingField("plannedDate", e.target.value)
                    }
                  />
                </FormField>

                <FormField label="Remarks" icon={FileText}>
                  <input
                    type="text"
                    className={quoteInputStyles}
                    value={bookingForm.remarks}
                    onChange={(e) => updateBookingField("remarks", e.target.value)}
                    placeholder="Any specific instructions (Optional)"
                  />
                </FormField>
              </div>

              {/* UPLOAD PHOTO (OPTIONAL) */}
              <div className="mt-5">
                <label className="mb-2 flex items-center gap-2 text-xs font-bold text-[#071224]">
                  <ImageIcon className="h-3.5 w-3.5 shrink-0 text-[#0A2E6F]" />
                  <span>Upload Photo of the Issue</span>
                  <span className="text-xs font-normal text-slate-400">(Optional)</span>
                </label>

                <label
                  htmlFor="issuePhoto"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-center transition hover:border-[#0A2E6F] hover:bg-blue-50/40"
                >
                  <Upload className="mb-1 h-5 w-5 text-slate-400" />
                  <span className="text-xs font-semibold text-slate-700">
                    {bookingForm.issuePhoto
                      ? "Change Photo"
                      : "Click to upload issue photo / video (Optional)"}
                  </span>
                  <span className="mt-0.5 text-[10px] text-slate-400">
                    PNG, JPG, JPEG, PDF or MP4 (Max 10MB)
                  </span>

                  {bookingForm.issuePhoto && (
                    <span className="mt-2 max-w-full truncate rounded bg-white px-2.5 py-1 text-[11px] font-medium text-green-700 shadow-sm">
                      {bookingForm.issuePhoto.name}
                    </span>
                  )}
                </label>

                <input
                  id="issuePhoto"
                  type="file"
                  accept="image/*,video/*,.pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    updateBookingField("issuePhoto", file);
                  }}
                />
              </div>

              {/* SERVICES */}
              <div className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-bold text-[#071224]">
                    Select Services <span className="text-red-500">*</span>
                  </p>
                  <span className="text-[10px] text-slate-400">
                    Multiple selection allowed
                  </span>
                </div>

                <div className="grid gap-2.5">
                  {computedServices.map((service) => {
                    const selected = bookingForm.services.includes(service.id);

                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleService(service.id)}
                        className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all ${
                          selected
                            ? "border-[#0A2E6F] bg-blue-50/80 shadow-sm"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <span className="flex min-w-0 items-center gap-2.5">
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                              selected
                                ? "border-[#0A2E6F] bg-[#0A2E6F] text-white"
                                : "border-slate-300 bg-white"
                            }`}
                          >
                            {selected && <CheckCircle2 className="h-3 w-3" />}
                          </span>
                          <div>
                            <span className="block text-xs font-bold text-slate-800">
                              {service.name}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {bookingForm.isHyderabad ? "In Hyderabad Rate" : "Outside Hyderabad Rate"}
                            </span>
                          </div>
                        </span>

                        <span className="ml-3 whitespace-nowrap text-sm font-black text-[#0A2E6F]">
                          {formatCurrency(service.amount)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* =========================================================
                 SITE LOCATION
              ========================================================= */}
              <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0A2E6F]">
                    <MapPin className="h-4 w-4" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-[#071224]">
                      Site Location
                      <span className="ml-1 text-red-500">*</span>
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      Tell us where the service will take place.
                      Choose whether you are currently at the site or
                      away from the site.
                    </p>

                    {/* LOCATION MODE */}
                    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {/* AT SITE */}
                      <button
                        type="button"
                        onClick={() => {
                          setBookingError("");
                          setBookingForm((previous) => ({
                            ...previous,
                            locationMode: "at-site",
                            locationLink: "",
                            latitude: "",
                            longitude: "",
                            locationAccuracy: "",
                          }));
                        }}
                        className={`rounded-xl border p-3 text-left transition-all ${
                          bookingForm.locationMode === "at-site"
                            ? "border-[#0A2E6F] bg-[#0A2E6F]/5 ring-1 ring-[#0A2E6F]"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div
                            className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border ${
                              bookingForm.locationMode === "at-site"
                                ? "border-[#0A2E6F]"
                                : "border-slate-300"
                            }`}
                          >
                            {bookingForm.locationMode === "at-site" && (
                              <div className="h-2 w-2 rounded-full bg-[#0A2E6F]" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">
                              I am at the site
                            </p>
                            <p className="mt-1 text-[10px] leading-4 text-slate-500">
                              Use my current phone location.
                            </p>
                          </div>
                        </div>
                      </button>

                      {/* AWAY FROM SITE */}
                      <button
                        type="button"
                        onClick={() => {
                          setBookingError("");
                          setBookingForm((previous) => ({
                            ...previous,
                            locationMode: "away-from-site",
                            latitude: "",
                            longitude: "",
                            locationAccuracy: "",
                          }));
                        }}
                        className={`rounded-xl border p-3 text-left transition-all ${
                          bookingForm.locationMode === "away-from-site"
                            ? "border-[#0A2E6F] bg-[#0A2E6F]/5 ring-1 ring-[#0A2E6F]"
                            : "border-slate-200 bg-white hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div
                            className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border ${
                              bookingForm.locationMode === "away-from-site"
                                ? "border-[#0A2E6F]"
                                : "border-slate-300"
                            }`}
                          >
                            {bookingForm.locationMode === "away-from-site" && (
                              <div className="h-2 w-2 rounded-full bg-[#0A2E6F]" />
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">
                              I am away from the site
                            </p>
                            <p className="mt-1 text-[10px] leading-4 text-slate-500">
                              Paste the Google Maps pin link.
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>

                    {/* =====================================================
                        AT SITE
                    ===================================================== */}
                    {bookingForm.locationMode === "at-site" && (
                      <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/60 p-3">
                        <div className="flex items-start gap-3">
                          <Navigation className="mt-0.5 h-4 w-4 shrink-0 text-[#0A2E6F]" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-[#071224]">
                              Capture Current Location
                            </p>
                            <p className="mt-1 text-[10px] leading-4 text-slate-500">
                              Your browser will ask for location permission.
                              Your current GPS position will be used as the
                              service location.
                            </p>

                            <button
                              type="button"
                              onClick={captureLocation}
                              disabled={locationLoading}
                              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-[#0A2E6F] px-4 py-2.5 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#08265d] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {locationLoading ? (
                                <>
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                  Getting Location...
                                </>
                              ) : (
                                <>
                                  <Navigation className="h-3.5 w-3.5" />
                                  Use My Current Location
                                </>
                              )}
                            </button>

                            {bookingForm.latitude && bookingForm.longitude && (
                               <div className="mt-3 rounded-lg bg-white px-3 py-2 border border-green-100">
                                 <div className="flex items-center gap-2">
                                   <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                                   <p className="text-[10px] font-bold text-green-700">Location captured</p>
                                 </div>
                                 <p className="mt-1 break-all text-[9px] text-slate-500">
                                   {bookingForm.latitude}, {bookingForm.longitude} (Accuracy: {bookingForm.locationAccuracy}m)
                                 </p>
                               </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* =====================================================
                        AWAY FROM SITE
                    ===================================================== */}
                    {bookingForm.locationMode === "away-from-site" && (
                      <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 p-3">
                        <div className="flex items-start gap-3">
                          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-slate-900">
                              Google Maps Site Pin
                            </p>
                            <p className="mt-1 text-[10px] leading-4 text-slate-600">
                              Open Google Maps, drop a pin on the project
                              location, copy the link and paste it below.
                            </p>

                            <input
                              type="url"
                              value={bookingForm.locationLink}
                              onChange={(event) =>
                                handleMapsLinkChange(event.target.value)
                              }
                              placeholder="Paste Google Maps location link"
                              className="mt-3 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0A2E6F] focus:ring-2 focus:ring-[#0A2E6F]/10"
                            />

                            <p className="mt-2 text-[9px] leading-4 text-slate-500">
                              Example: https://maps.app.goo.gl/XXXXXXXX or https://maps.google.com/?q=...
                            </p>

                            {bookingForm.latitude && bookingForm.longitude && (
                              <div className="mt-3 rounded-lg bg-white px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                                  <p className="text-[10px] font-bold text-green-700">
                                    Site pin coordinates detected
                                  </p>
                                </div>
                                <p className="mt-1 break-all text-[9px] text-slate-500">
                                  {bookingForm.latitude}, {bookingForm.longitude}
                                </p>
                              </div>
                            )}

                            {bookingForm.locationLink && !bookingForm.latitude && !bookingForm.longitude && (
                              <div className="mt-3 rounded-lg bg-white px-3 py-2">
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-600" />
                                  <p className="text-[10px] font-bold text-amber-700">
                                    Maps link saved
                                  </p>
                                </div>
                                <p className="mt-1 text-[9px] leading-4 text-slate-500">
                                  The exact link will be sent to our team.
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2.5 rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 text-amber-900">
                <Info className="h-4 w-4 shrink-0 text-amber-700" />
                <p className="text-xs font-semibold leading-relaxed">
                  Note: Our team will Respond promptly upon payment Confirmation.
                </p>
              </div>

              {bookingError && <ErrorBox message={bookingError} />}

              <button
                type="button"
                onClick={goToPayment}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0A2E6F] px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(10,46,111,0.2)] transition hover:bg-[#08265d]"
              >
                Continue to Payment
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="h-8" />
            </div>
          </div>
        ) : (
          /* STEP 2: PAYMENT & PREVIEW */
          <form onSubmit={submitBooking} className="h-full min-h-0 w-full overflow-hidden print:overflow-visible">
            <div className="grid h-full min-h-0 w-full lg:grid-cols-[1fr_1.1fr] print:block print:w-full">
              
              {/* LEFT: SLIP PREVIEW (DESKTOP) AND PRINT VIEW */}
              <div className="hidden h-full overflow-y-auto border-r border-slate-200 bg-slate-100 p-5 sm:p-8 lg:block print:block print:w-full print:bg-white print:p-0 print:border-none print:overflow-visible">
                {/* Ensure the receipt only is fully visible on print via class mapping */}
                <div className="mx-auto max-w-lg print-receipt-only">
                  <div className="mb-4 flex items-center justify-between print:hidden">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Live Booking Slip Preview
                    </p>
                    <button
                      type="button"
                      onClick={handleDownloadPdf}
                      disabled={isDownloadingPdf}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                    >
                      <Download className="h-3.5 w-3.5 text-[#0A2E6F]" />
                      {isDownloadingPdf ? "Saving PDF..." : "Save & Download"}
                    </button>
                  </div>

                  <ServiceBookingSlip
                    bookingNumber={bookingNumber}
                    customer={bookingForm}
                    selectedServices={selectedServices}
                    total={bookingTotal}
                    hasMounted={hasMounted}
                  />
                  <div className="h-8 print:hidden" />
                </div>
              </div>

              {/* RIGHT: PAYMENT PROOF FORM */}
              <div className="h-full overflow-y-auto bg-white p-4 sm:p-8 print:hidden">
                <div className="mx-auto max-w-md">
                  <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      Total Payable Amount
                    </p>
                    <p className="mt-1 text-2xl font-black text-[#0A2E6F]">
                      {formatCurrency(bookingTotal)}
                    </p>
                  </div>

                  {/* MOBILE-ONLY PREVIEW & DOWNLOAD BUTTON */}
                  <div className="mb-6 block lg:hidden">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-bold text-slate-700">
                        Booking Slip Preview
                      </p>
                      <button
                        type="button"
                        onClick={handleDownloadPdf}
                        disabled={isDownloadingPdf}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                      >
                        <Download className="h-3.5 w-3.5 text-[#0A2E6F]" />
                        {isDownloadingPdf ? "Saving..." : "Save Slip"}
                      </button>
                    </div>

                    <ServiceBookingSlip
                      bookingNumber={bookingNumber}
                      customer={bookingForm}
                      selectedServices={selectedServices}
                      total={bookingTotal}
                      hasMounted={hasMounted}
                    />
                  </div>

                  {/* QR SCANNER */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="mb-3 text-center">
                      <h3 className="text-sm font-bold text-slate-900">
                        Scan UPI QR Code
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        Scan using Google Pay, PhonePe, Paytm, or BHIM.
                      </p>
                    </div>

                    <div className="flex justify-center rounded-xl bg-slate-50 p-3">
                      <img
                        src={PAYMENT_SCANNER_PATH}
                        alt="Payment QR Scanner"
                        className="h-auto w-full max-w-[240px] rounded-lg object-contain"
                      />
                    </div>

                    <div className="mt-3 rounded-xl bg-amber-50 p-2.5 text-center">
                      <p className="text-[11px] leading-4 text-amber-800">
                        Please pay exactly <strong>{formatCurrency(bookingTotal)}</strong> and upload the confirmation screenshot below.
                      </p>
                    </div>
                  </div>

                  {/* PROOF INPUTS */}
                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-slate-700">
                        Payment Screenshot <span className="text-red-500">*</span>
                      </label>

                      <label
                        htmlFor="paymentScreenshot"
                        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-center transition hover:border-[#0A2E6F] hover:bg-blue-50/40"
                      >
                        <Upload className="mb-1.5 h-5 w-5 text-slate-400" />
                        <span className="text-xs font-semibold text-slate-700">
                          {bookingForm.paymentScreenshot
                            ? "Change Screenshot"
                            : "Click to upload screenshot"}
                        </span>
                        <span className="mt-0.5 text-[10px] text-slate-400">
                          PNG, JPG, JPEG or PDF (Max 10MB)
                        </span>

                        {bookingForm.paymentScreenshot && (
                          <span className="mt-2 max-w-full truncate rounded bg-white px-2.5 py-1 text-[11px] font-medium text-green-700 shadow-sm">
                            {bookingForm.paymentScreenshot.name}
                          </span>
                        )}
                      </label>

                      <input
                        id="paymentScreenshot"
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          updateBookingField("paymentScreenshot", file);
                        }}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="utr"
                        className="mb-1.5 block text-xs font-bold text-slate-700"
                      >
                        UTR / Reference Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="utr"
                        type="text"
                        value={bookingForm.utr}
                        onChange={(e) => updateBookingField("utr", e.target.value)}
                        placeholder="e.g., 423456789012"
                        autoComplete="off"
                        className={quoteInputStyles}
                      />
                    </div>
                  </div>

                  {/* MANDATORY CHECKPOINT FOR DOWNLOADING THE SLIP */}
                  <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50/80 p-3.5">
                    <label className="flex cursor-pointer items-start gap-2.5">
                      <input
                        type="checkbox"
                        checked={hasDownloadedSlip}
                        onChange={(e) => {
                          setBookingError("");
                          setHasDownloadedSlip(e.target.checked);
                        }}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0A2E6F] focus:ring-[#0A2E6F]"
                      />
                      <div className="text-xs leading-5 text-slate-800">
                        <span className="font-bold">Mandatory Checkpoint:</span> I have saved / downloaded my Service Booking Slip.
                        <button
                          type="button"
                          onClick={handleDownloadPdf}
                          disabled={isDownloadingPdf}
                          className="ml-1 inline-flex items-center gap-1 font-bold text-[#0A2E6F] underline hover:text-[#08265d]"
                        >
                          <Download className="h-3 w-3" />
                          {isDownloadingPdf ? "Downloading..." : "Download Slip Now"}
                        </button>
                      </div>
                    </label>
                  </div>

                  <div className="mt-4 rounded-xl bg-slate-50 p-3 text-center border border-slate-200">
                    <p className="text-[11px] font-medium text-slate-600">
                      📢 Our team will Respond promptly upon payment Confirmation.
                    </p>
                  </div>

                  {bookingError && <ErrorBox message={bookingError} />}

                  <button
                    type="submit"
                    disabled={isSubmittingBooking}
                    className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0A2E6F] px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(10,46,111,0.25)] transition hover:bg-[#08265d] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmittingBooking ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Submitting Booking...
                      </>
                    ) : (
                      <>
                        Submit Booking & Payment
                        <CheckCircle2 className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <div className="h-8" />
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   SERVICE BOOKING SLIP PREVIEW
========================================================= */

function ServiceBookingSlip({
  bookingNumber,
  customer,
  selectedServices,
  total,
  hasMounted,
}: {
  bookingNumber: string;
  customer: BookingFormData;
  selectedServices: Array<{ id: string; name: string; amount: number }>;
  total: number;
  hasMounted: boolean;
}) {
  const displayDate = useMemo(() => {
    if (!hasMounted) return "";
    return new Date().toLocaleDateString("en-IN");
  }, [hasMounted]);

  return (
    <div className="w-full overflow-hidden rounded-[26px] border border-slate-200/90 bg-white text-slate-900 shadow-md">
      <div className="border-b border-slate-200/80 bg-white px-6 py-5 sm:px-7 sm:py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src="/logo.png"
              alt={COMPANY_NAME}
              className="h-11 w-auto object-contain"
            />
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#0A2E6F]">
                {COMPANY_NAME}
              </p>
              <h3 className="mt-1 font-serif text-xl font-bold tracking-tight text-[#071224] sm:text-2xl">
                Service Booking Slip
              </h3>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Booking No.
            </p>
            <p className="mt-1 text-sm font-black text-[#0A2E6F]">
              {hasMounted ? bookingNumber : "—"}
            </p>
            <p className="mt-1 text-[10px] text-slate-400">
              {displayDate || "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-5 sm:px-7 sm:py-6">
        <div className="grid grid-cols-2 gap-y-4 gap-x-6">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Customer
            </p>
            <p className="mt-1 break-words text-sm font-bold text-slate-900">
              {customer.fullName || "Customer Name"}
            </p>
          </div>

          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Contact (Mobile)
            </p>
            <p className="mt-1 break-all text-sm font-bold text-slate-900">
              {customer.phone || "Phone Number"}
            </p>
          </div>

          <div className="col-span-2">
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Location Tier
            </p>
            <p className="mt-1 break-words text-xs font-bold text-[#0A2E6F]">
              {customer.isHyderabad ? "In Hyderabad (Standard Rate)" : "Outside Hyderabad (Regional Travel Rate)"}
            </p>
            
            {/* Show specific location metadata directly underneath */}
            <p className="mt-1 text-[10px] text-slate-500 font-medium">
              {customer.locationMode === "at-site" && customer.latitude
                ? `📍 Client at site (GPS: ${customer.latitude}, ${customer.longitude})`
                : customer.locationMode === "away-from-site" && customer.locationLink 
                  ? `📍 Client away from site (Google Maps Pin Provided)`
                  : "📍 Location pending"}
            </p>
          </div>
        </div>

        <div className="mt-4 border-t border-slate-100 pt-3">
          <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Project / Site Address
          </p>
          <p className="mt-1 break-words text-xs leading-5 text-slate-700">
            {customer.address || "Project / site address"}
          </p>
        </div>

        {(customer.problemStatement || customer.plannedDate) && (
          <div className="mt-3.5 rounded-xl bg-slate-50 p-3 text-xs text-slate-700 space-y-1.5">
            {customer.plannedDate && (
              <div>
                <span className="font-bold text-[#0A2E6F]">Planned Site Visit:</span>{" "}
                {formatToDDMMYYYY(customer.plannedDate)}
              </div>
            )}
            {customer.problemStatement && (
              <div>
                <span className="font-bold text-[#0A2E6F]">Problem Statement:</span>{" "}
                <span className="line-clamp-2">{customer.problemStatement}</span>
              </div>
            )}
          </div>
        )}

        <div className="mt-5">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Services
            </p>
            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Amount
            </p>
          </div>

          {selectedServices.length ? (
            <div className="divide-y divide-slate-100">
              {selectedServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <span className="text-xs font-medium text-slate-700">
                    {service.name}
                  </span>
                  <span className="whitespace-nowrap text-xs font-bold text-slate-900">
                    {formatCurrency(service.amount)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              Select services to build the slip.
            </div>
          )}
        </div>

        <div className="mt-4 border-t border-slate-200 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                Total Amount
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Selected service charges
              </p>
            </div>

            <p className="text-2xl font-black text-[#0A2E6F]">
              {formatCurrency(total)}
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50/80 px-6 py-4 sm:px-7 sm:py-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Contact
            </p>
            <p className="mt-1 text-[11px] font-bold text-slate-700">
              {COMPANY_PHONE}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Email
            </p>
            <p className="mt-1 break-all text-[11px] font-bold text-slate-700">
              {COMPANY_EMAIL}
            </p>
          </div>
        </div>

        <p className="mt-3 text-center text-[9px] text-slate-400">
          Our team will Respond promptly upon payment Confirmation.
        </p>
      </div>
    </div>
  );
}

function ErrorBox({ message }: { message: string }) {
  return (
    <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
      <p className="text-xs leading-5 text-red-600">{message}</p>
    </div>
  );
}

function FormField({
  label,
  required = false,
  icon: Icon,
  children,
}: {
  label: string;
  required?: boolean;
  icon: ElementType;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#071224]">
        <Icon className="h-3.5 w-3.5 shrink-0 text-[#0A2E6F]" />
        <span>{label}</span>
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

const quoteInputStyles = `
  w-full
  rounded-xl
  border
  border-slate-200
  bg-white
  px-4
  py-2.5
  text-sm
  text-[#071224]
  outline-none
  transition-all
  duration-200
  placeholder:text-slate-400
  focus:border-[#0A2E6F]
  focus:ring-0
  autofill:bg-white
`;