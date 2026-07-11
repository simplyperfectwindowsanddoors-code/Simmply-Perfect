"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { motion } from "framer-motion";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  FileText,
  IndianRupee,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  UploadCloud,
  User,
  Users,
  X,
} from "lucide-react";

import type {
  Job,
  JobApplicationData,
} from "@/types/careers";

/* =========================================================
   TYPES
========================================================= */

type JobApplicationFormProps = {
  job: Job;
  onBack: () => void;
  onClose: () => void;
  onSuccess: () => void;
};

type FormErrors = Partial<
  Record<keyof JobApplicationData, string>
>;

/* =========================================================
   CREATE INITIAL FORM DATA
========================================================= */

function createInitialFormData(
  jobTitle: string,
): JobApplicationData {
  return {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    role: jobTitle,
    experience: "",
    currentCtc: "",
    expectedCtc: "",
    noticePeriod: "",
    currentLocation: "",
    description: "",
    resume: null,
  };
}

/* =========================================================
   NUMBER SANITIZER
========================================================= */

function sanitizeDecimal(value: string) {
  let sanitized = value.replace(/[^\d.]/g, "");

  const parts = sanitized.split(".");

  if (parts.length > 2) {
    sanitized = `${parts[0]}.${parts
      .slice(1)
      .join("")}`;
  }

  if (sanitized.startsWith(".")) {
    sanitized = `0${sanitized}`;
  }

  const [integerPart, decimalPart] =
    sanitized.split(".");

  if (decimalPart !== undefined) {
    return `${integerPart}.${decimalPart.slice(0, 2)}`;
  }

  return integerPart;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function JobApplicationForm({
  job,
  onBack,
  onClose,
  onSuccess,
}: JobApplicationFormProps) {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  /* =========================================================
     STATE
  ========================================================= */

  const [formData, setFormData] =
    useState<JobApplicationData>(() =>
      createInitialFormData(job.title),
    );

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  /* =========================================================
     RESET FORM WHEN JOB CHANGES

     This also prevents old/corrupted development state from
     remaining inside fields such as description.
  ========================================================= */

  useEffect(() => {
    setFormData(
      createInitialFormData(job.title),
    );

    setErrors({});
    setSubmitError("");
    setIsSubmitting(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [job.id, job.title]);

  /* =========================================================
     UPDATE FIELD
  ========================================================= */

  const updateField = (
    field: keyof JobApplicationData,
    value: string | File | null,
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => {
      if (!previous[field]) {
        return previous;
      }

      const nextErrors = {
        ...previous,
      };

      delete nextErrors[field];

      return nextErrors;
    });

    setSubmitError("");
  };

  /* =========================================================
     PHONE
  ========================================================= */

  const handlePhoneChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const digits = event.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    updateField("phone", digits);
  };

  /* =========================================================
     AGE
  ========================================================= */

  const handleAgeChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const digits = event.target.value
      .replace(/\D/g, "")
      .slice(0, 2);

    updateField("age", digits);
  };

  /* =========================================================
     EXPERIENCE
  ========================================================= */

  const handleExperienceChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    updateField(
      "experience",
      sanitizeDecimal(event.target.value),
    );
  };

  /* =========================================================
     CURRENT CTC
  ========================================================= */

  const handleCurrentCtcChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    updateField(
      "currentCtc",
      sanitizeDecimal(event.target.value),
    );
  };

  /* =========================================================
     EXPECTED CTC
  ========================================================= */

  const handleExpectedCtcChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    updateField(
      "expectedCtc",
      sanitizeDecimal(event.target.value),
    );
  };

  /* =========================================================
     RESUME
  ========================================================= */

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedExtensions = [
      "pdf",
      "doc",
      "docx",
    ];

    const extension =
      file.name.split(".").pop()?.toLowerCase() ?? "";

    const maxSize = 5 * 1024 * 1024;

    if (!allowedExtensions.includes(extension)) {
      setErrors((previous) => ({
        ...previous,
        resume:
          "Please upload a PDF, DOC, or DOCX resume.",
      }));

      event.target.value = "";

      return;
    }

    if (file.size > maxSize) {
      setErrors((previous) => ({
        ...previous,
        resume:
          "Resume file size must be less than 5 MB.",
      }));

      event.target.value = "";

      return;
    }

    updateField("resume", file);
  };

  const removeResume = () => {
    updateField("resume", null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* =========================================================
     VALIDATION
  ========================================================= */

  const validateForm = () => {
    const nextErrors: FormErrors = {};

    /* FIRST NAME */

    if (!formData.firstName.trim()) {
      nextErrors.firstName =
        "First name is required.";
    }

    /* LAST NAME */

    if (!formData.lastName.trim()) {
      nextErrors.lastName =
        "Last name is required.";
    }

    /* EMAIL */

    if (!formData.email.trim()) {
      nextErrors.email =
        "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim(),
      )
    ) {
      nextErrors.email =
        "Enter a valid email address.";
    }

    /* PHONE */

    if (!formData.phone) {
      nextErrors.phone =
        "Contact number is required.";
    } else if (
      !/^[6-9]\d{9}$/.test(formData.phone)
    ) {
      nextErrors.phone =
        "Enter a valid 10-digit Indian mobile number.";
    }

    /* AGE */

    const age = Number(formData.age);

    if (!formData.age) {
      nextErrors.age =
        "Age is required.";
    } else if (
      Number.isNaN(age) ||
      age < 18 ||
      age > 65
    ) {
      nextErrors.age =
        "Age must be between 18 and 65 years.";
    }

    /* GENDER */

    if (!formData.gender) {
      nextErrors.gender =
        "Please select gender.";
    }

    /* EXPERIENCE */

    const experience =
      Number(formData.experience);

    if (!formData.experience) {
      nextErrors.experience =
        "Experience is required.";
    } else if (
      Number.isNaN(experience) ||
      experience < 0 ||
      experience > 50
    ) {
      nextErrors.experience =
        "Enter valid experience.";
    }

    /* CURRENT CTC */

    if (formData.currentCtc.trim()) {
      const currentCtc =
        Number(formData.currentCtc);

      if (
        Number.isNaN(currentCtc) ||
        currentCtc < 0
      ) {
        nextErrors.currentCtc =
          "Enter a valid current CTC.";
      }
    }

    /* EXPECTED CTC */

    const expectedCtc =
      Number(formData.expectedCtc);

    if (!formData.expectedCtc) {
      nextErrors.expectedCtc =
        "Expected CTC is required.";
    } else if (
      Number.isNaN(expectedCtc) ||
      expectedCtc <= 0
    ) {
      nextErrors.expectedCtc =
        "Enter a valid expected CTC.";
    }

    /* NOTICE PERIOD */

    if (!formData.noticePeriod.trim()) {
      nextErrors.noticePeriod =
        "Notice period is required.";
    }

    /* LOCATION */

    if (!formData.currentLocation.trim()) {
      nextErrors.currentLocation =
        "Current location is required.";
    }

    /* DESCRIPTION */

    if (!formData.description.trim()) {
      nextErrors.description =
        "Professional summary is required.";
    } else if (
      formData.description.trim().length < 30
    ) {
      nextErrors.description =
        "Please provide at least 30 characters.";
    }

    /* RESUME */

    if (!formData.resume) {
      nextErrors.resume =
        "Please upload your resume.";
    }

    setErrors(nextErrors);

    /* =======================================================
       SCROLL TO FIRST ERROR
    ======================================================= */

    const firstError =
      Object.keys(nextErrors)[0];

    if (firstError) {
      requestAnimationFrame(() => {
        document
          .querySelector(
            `[data-field="${firstError}"]`,
          )
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
      });
    }

    return Object.keys(nextErrors).length === 0;
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    const isValid = validateForm();

    if (!isValid) {
      setSubmitError(
        "Please check the highlighted fields and complete the required information.",
      );

      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = new FormData();

      payload.append(
        "firstName",
        formData.firstName.trim(),
      );

      payload.append(
        "lastName",
        formData.lastName.trim(),
      );

      payload.append(
        "email",
        formData.email.trim(),
      );

      payload.append(
        "phone",
        formData.phone,
      );

      /* AGE IS SENT AS YEARS */

      payload.append(
        "age",
        `${formData.age.trim()} Years`,
      );

      payload.append(
        "gender",
        formData.gender,
      );

      payload.append(
        "role",
        job.title,
      );

      /* EXPERIENCE IS SENT AS YEARS */

      payload.append(
        "experience",
        `${formData.experience.trim()} Years`,
      );

      /* CURRENT CTC IS SENT AS LPA */

      payload.append(
        "currentCtc",
        formData.currentCtc.trim()
          ? `${formData.currentCtc.trim()} LPA`
          : "",
      );

      /* EXPECTED CTC IS SENT AS LPA */

      payload.append(
        "expectedCtc",
        `${formData.expectedCtc.trim()} LPA`,
      );

      payload.append(
        "noticePeriod",
        formData.noticePeriod.trim(),
      );

      payload.append(
        "currentLocation",
        formData.currentLocation.trim(),
      );

      payload.append(
        "description",
        formData.description.trim(),
      );

      if (formData.resume) {
        payload.append(
          "resume",
          formData.resume,
        );
      }

      const response = await fetch(
        "/api/careers",
        {
          method: "POST",
          body: payload,
        },
      );

      let result: {
        message?: string;
      } = {};

      try {
        result = await response.json();
      } catch {
        // Response did not contain JSON.
      }

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to submit application.",
        );
      }

      onSuccess();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
  <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-white">
      {/* =====================================================
          SCROLLABLE AREA
      ===================================================== */}

      <div
  className="
    min-h-0
    flex-1
    overflow-y-auto
    overscroll-contain
    scroll-smooth
    pb-4
    [scrollbar-width:thin]
    [scrollbar-color:#0A2E6F_transparent]
  "
>
        {/* ===================================================
            HEADER
        =================================================== */}

        <header className="relative overflow-hidden border-b border-slate-200 bg-[#F8FAFC] px-5 py-7 sm:px-8 sm:py-8 lg:px-10">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-100/70 blur-[100px]" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f030_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f030_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative"
          >
            <button
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="group inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition-colors hover:text-[#0A2E6F] disabled:pointer-events-none disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />

              Back to job details
            </button>

            <div className="mt-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0A2E6F] text-white shadow-[0_12px_30px_rgba(10,46,111,0.2)]">
                <BriefcaseBusiness className="h-5 w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0A2E6F]">
                  Career Application
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-[#071224] sm:text-3xl">
                  Apply for {job.title}
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                  Complete the application below and upload
                  your latest resume. Fields marked with an
                  asterisk are required.
                </p>
              </div>
            </div>
          </motion.div>
        </header>

        {/* ===================================================
            FORM
        =================================================== */}

        <form
          id="career-application-form"
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
          className="px-5 py-7 sm:px-8 sm:py-9 lg:px-10"
        >
          <div className="mx-auto max-w-5xl">
            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <FormSection
              number="01"
              title="Personal Information"
              description="Provide your basic information and contact details."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  fieldName="firstName"
                  name="career_candidate_first"
                  label="First Name"
                  required
                  icon={User}
                  value={formData.firstName}
                  error={errors.firstName}
                  placeholder="Enter first name"
                  onChange={(value) =>
                    updateField("firstName", value)
                  }
                />

                <InputField
                  fieldName="lastName"
                  name="career_candidate_last"
                  label="Last Name"
                  required
                  icon={User}
                  value={formData.lastName}
                  error={errors.lastName}
                  placeholder="Enter last name"
                  onChange={(value) =>
                    updateField("lastName", value)
                  }
                />

                <InputField
                  fieldName="email"
                  name="career_candidate_mail"
                  label="Email Address"
                  required
                  type="email"
                  icon={Mail}
                  value={formData.email}
                  error={errors.email}
                  placeholder="Enter email address"
                  onChange={(value) =>
                    updateField("email", value)
                  }
                />

                {/* PHONE */}

                <div data-field="phone">
                  <FieldLabel
                    label="Contact Number"
                    required
                  />

                  <div className="relative mt-2">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <span className="pointer-events-none absolute left-11 top-1/2 z-10 -translate-y-1/2 border-r border-slate-200 pr-3 text-sm font-semibold text-slate-500">
                      +91
                    </span>

                    <input
                      type="tel"
                      name="career_candidate_mobile"
                      autoComplete="off"
                      inputMode="numeric"
                      maxLength={10}
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      placeholder="9876543210"
                      aria-invalid={Boolean(errors.phone)}
                      className={inputClass(
                        Boolean(errors.phone),
                        "pl-[92px]",
                      )}
                    />
                  </div>

                  <FieldError error={errors.phone} />
                </div>

                {/* AGE WITH YEARS SUFFIX */}

                <SuffixInputField
                  fieldName="age"
                  name="career_candidate_age"
                  label="Age"
                  required
                  value={formData.age}
                  error={errors.age}
                  placeholder="25"
                  suffix="Years"
                  inputMode="numeric"
                  onChange={handleAgeChange}
                />

                {/* GENDER */}

                <SelectField
                  fieldName="gender"
                  name="career_candidate_gender"
                  label="Gender"
                  required
                  icon={Users}
                  value={formData.gender}
                  error={errors.gender}
                  onChange={(value) =>
                    updateField("gender", value)
                  }
                  options={[
                    {
                      value: "",
                      label: "Select gender",
                    },
                    {
                      value: "Male",
                      label: "Male",
                    },
                    {
                      value: "Female",
                      label: "Female",
                    },
                    {
                      value: "Other",
                      label: "Other",
                    },
                    {
                      value: "Prefer not to say",
                      label: "Prefer not to say",
                    },
                  ]}
                />
              </div>
            </FormSection>

            {/* =================================================
                PROFESSIONAL INFORMATION
            ================================================= */}

            <FormSection
              number="02"
              title="Professional Information"
              description="Share your current professional and compensation details."
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <InputField
                  name="career_selected_role"
                  label="Role Applied For"
                  icon={BriefcaseBusiness}
                  value={job.title}
                  readOnly
                  onChange={() => {}}
                />

                <SuffixInputField
                  fieldName="experience"
                  name="career_candidate_experience"
                  label="Total Experience"
                  required
                  value={formData.experience}
                  error={errors.experience}
                  placeholder="0"
                  suffix="Years"
                  inputMode="decimal"
                  onChange={handleExperienceChange}
                />

                <SuffixInputField
                  fieldName="currentCtc"
                  name="career_current_compensation"
                  label="Current CTC"
                  value={formData.currentCtc}
                  error={errors.currentCtc}
                  placeholder="0"
                  suffix="LPA"
                  inputMode="decimal"
                  icon={IndianRupee}
                  onChange={handleCurrentCtcChange}
                />

                <SuffixInputField
                  fieldName="expectedCtc"
                  name="career_expected_compensation"
                  label="Expected CTC"
                  required
                  value={formData.expectedCtc}
                  error={errors.expectedCtc}
                  placeholder="0"
                  suffix="LPA"
                  inputMode="decimal"
                  icon={IndianRupee}
                  onChange={handleExpectedCtcChange}
                />

                <InputField
                  fieldName="noticePeriod"
                  name="career_notice_duration"
                  label="Notice Period"
                  required
                  icon={FileText}
                  value={formData.noticePeriod}
                  error={errors.noticePeriod}
                  placeholder="Immediate / 30 Days"
                  onChange={(value) =>
                    updateField("noticePeriod", value)
                  }
                />

                <InputField
                  fieldName="currentLocation"
                  name="career_candidate_city"
                  label="Current Location"
                  required
                  icon={MapPin}
                  value={formData.currentLocation}
                  error={errors.currentLocation}
                  placeholder="City, State"
                  onChange={(value) =>
                    updateField("currentLocation", value)
                  }
                />
              </div>
            </FormSection>

            {/* =================================================
                PROFESSIONAL SUMMARY
            ================================================= */}

            <FormSection
              number="03"
              title="Professional Summary"
              description="Briefly explain your experience, skills, achievements, and suitability for the role."
            >
              <div data-field="description">
                <FieldLabel
                  label="Tell Us About Yourself"
                  required
                />

                <textarea
                  name="career_candidate_summary"
                  autoComplete="off"
                  rows={6}
                  maxLength={1000}
                  value={formData.description}
                  onChange={(event) =>
                    updateField(
                      "description",
                      event.target.value,
                    )
                  }
                  placeholder="Tell us about your experience, key skills, achievements, and why you are interested in this opportunity..."
                  aria-invalid={Boolean(
                    errors.description,
                  )}
                  className={textareaClass(
                    Boolean(errors.description),
                  )}
                />

                <div className="mt-2 flex items-start justify-between gap-4">
                  <FieldError
                    error={errors.description}
                  />

                  <span className="ml-auto shrink-0 text-[10px] font-semibold text-slate-400">
                    {formData.description.length}/1000
                  </span>
                </div>
              </div>
            </FormSection>

            {/* =================================================
                RESUME
            ================================================= */}

            <FormSection
              number="04"
              title="Resume"
              description="Upload your latest professional resume."
            >
              <div data-field="resume">
                <input
                  ref={fileInputRef}
                  type="file"
                  name="career_candidate_resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!formData.resume ? (
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className={`group flex w-full flex-col items-center justify-center rounded-[22px] border-2 border-dashed px-6 py-10 text-center transition-all duration-300 ${
                      errors.resume
                        ? "border-red-300 bg-red-50/40"
                        : "border-slate-200 bg-slate-50/60 hover:border-[#0A2E6F]/40 hover:bg-blue-50/40"
                    }`}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#0A2E6F] shadow-sm transition-transform duration-300 group-hover:-translate-y-1">
                      <UploadCloud className="h-6 w-6" />
                    </div>

                    <p className="mt-4 text-sm font-bold text-[#071224]">
                      Choose your resume
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      PDF, DOC, or DOCX • Maximum file size
                      5 MB
                    </p>
                  </button>
                ) : (
                  <div className="flex items-center gap-4 rounded-[20px] border border-blue-100 bg-blue-50/50 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#0A2E6F] shadow-sm">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-[#071224]">
                        {formData.resume.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {(
                          formData.resume.size /
                          1024 /
                          1024
                        ).toFixed(2)}{" "}
                        MB
                      </p>
                    </div>

                    <div className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600 sm:flex">
                      <Check className="h-4 w-4" />
                    </div>

                    <button
                      type="button"
                      onClick={removeResume}
                      disabled={isSubmitting}
                      aria-label="Remove resume"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:pointer-events-none disabled:opacity-50"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <FieldError error={errors.resume} />
              </div>
            </FormSection>

            {/* =================================================
                ERROR
            ================================================= */}

            {submitError && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                role="alert"
                className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />

                <span>{submitError}</span>
              </motion.div>
            )}
          </div>
        </form>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
  className="
    relative
    z-20
    shrink-0
    border-t
    border-slate-200
    bg-white
    px-4
    py-3
    shadow-[0_-10px_30px_rgba(15,23,42,0.05)]
    sm:px-8
    sm:py-4
    lg:px-10
  "
>
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <p className="hidden max-w-md text-xs leading-5 text-slate-500 sm:block">
            By submitting this application, you confirm that
            the information provided is accurate.
          </p>

          <div className="grid w-full grid-cols-2 gap-3 sm:ml-auto sm:flex sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="inline-flex h-12 min-w-[120px] items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Close
            </button>

            <button
              type="submit"
              form="career-application-form"
              disabled={isSubmitting}
              className="group inline-flex h-12 min-w-[185px] items-center justify-center gap-2 rounded-full bg-[#0A2E6F] px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(10,46,111,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#08265d] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application

                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* =========================================================
   FORM SECTION
========================================================= */

type FormSectionProps = {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

function FormSection({
  number,
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="border-b border-slate-200 py-8 first:pt-0 last:border-b-0"
    >
      <div className="mb-6 flex items-start gap-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[10px] font-black text-[#0A2E6F]">
          {number}
        </span>

        <div>
          <h3 className="text-lg font-bold tracking-[-0.02em] text-[#071224]">
            {title}
          </h3>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>

      {children}
    </motion.section>
  );
}

/* =========================================================
   INPUT FIELD
========================================================= */

type InputFieldProps = {
  fieldName?: keyof JobApplicationData;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  readOnly?: boolean;
  icon?: typeof User;
  error?: string;
  onChange: (value: string) => void;
};

function InputField({
  fieldName,
  name,
  label,
  value,
  placeholder,
  type = "text",
  required,
  readOnly,
  icon: Icon,
  error,
  onChange,
}: InputFieldProps) {
  return (
    <div data-field={fieldName}>
      <FieldLabel
        label={label}
        required={required}
      />

      <div className="relative mt-2">
        {Icon && (
          <Icon className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}

        <input
          type={type}
          name={name}
          autoComplete="off"
          value={value}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={inputClass(
            Boolean(error),
            Icon ? "pl-11" : "",
            readOnly
              ? "cursor-not-allowed bg-slate-100/80 text-slate-500"
              : "",
          )}
        />
      </div>

      <FieldError error={error} />
    </div>
  );
}

/* =========================================================
   SUFFIX INPUT FIELD
========================================================= */

type SuffixInputFieldProps = {
  fieldName?: keyof JobApplicationData;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  suffix: string;
  inputMode?: "numeric" | "decimal";
  required?: boolean;
  icon?: typeof User;
  error?: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
};

function SuffixInputField({
  fieldName,
  name,
  label,
  value,
  placeholder,
  suffix,
  inputMode = "decimal",
  required,
  icon: Icon,
  error,
  onChange,
}: SuffixInputFieldProps) {
  return (
    <div data-field={fieldName}>
      <FieldLabel
        label={label}
        required={required}
      />

      <div className="relative mt-2">
        {Icon && (
          <Icon className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}

        <input
          type="text"
          name={name}
          autoComplete="off"
          inputMode={inputMode}
          value={value}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          onChange={onChange}
          className={inputClass(
            Boolean(error),
            Icon ? "pl-11 pr-24" : "pr-24",
          )}
        />

        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
          {suffix}
        </span>
      </div>

      <FieldError error={error} />
    </div>
  );
}

/* =========================================================
   SELECT
========================================================= */

type SelectFieldProps = {
  fieldName?: keyof JobApplicationData;
  name: string;
  label: string;
  value: string;
  required?: boolean;
  icon?: typeof User;
  error?: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
};

function SelectField({
  fieldName,
  name,
  label,
  value,
  required,
  icon: Icon,
  error,
  options,
  onChange,
}: SelectFieldProps) {
  return (
    <div data-field={fieldName}>
      <FieldLabel
        label={label}
        required={required}
      />

      <div className="relative mt-2">
        {Icon && (
          <Icon className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}

        <select
          name={name}
          value={value}
          aria-invalid={Boolean(error)}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={inputClass(
            Boolean(error),
            `${Icon ? "pl-11" : ""} cursor-pointer appearance-none pr-11`,
          )}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>

      <FieldError error={error} />
    </div>
  );
}

/* =========================================================
   LABEL
========================================================= */

function FieldLabel({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) {
  return (
    <label className="text-xs font-bold text-slate-700">
      {label}

      {required && (
        <span className="ml-1 text-red-500">
          *
        </span>
      )}
    </label>
  );
}

/* =========================================================
   ERROR
========================================================= */

function FieldError({
  error,
}: {
  error?: string;
}) {
  if (!error) return null;

  return (
    <motion.p
      initial={{
        opacity: 0,
        y: -3,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      role="alert"
      className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-red-500"
    >
      <AlertCircle className="h-3 w-3 shrink-0" />

      {error}
    </motion.p>
  );
}

/* =========================================================
   INPUT STYLE
========================================================= */

function inputClass(
  hasError: boolean,
  ...additionalClasses: string[]
) {
  return [
    "h-12 w-full rounded-xl border bg-transparent px-4 text-sm text-[#071224] outline-none transition-all duration-300 placeholder:text-slate-400 focus:ring-4",

    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-slate-200 hover:border-slate-300 focus:border-[#0A2E6F]/60 focus:ring-blue-50",

    ...additionalClasses,
  ]
    .filter(Boolean)
    .join(" ");
}

/* =========================================================
   TEXTAREA STYLE

   Kept separate from inputClass so input height classes
   cannot interfere with the professional summary textarea.
========================================================= */

function textareaClass(
  hasError: boolean,
) {
  return [
    "mt-2 min-h-[150px] w-full resize-y rounded-xl border bg-transparent px-4 py-4 text-sm leading-6 text-[#071224] outline-none transition-all duration-300 placeholder:text-slate-400 focus:ring-4",

    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-slate-200 hover:border-slate-300 focus:border-[#0A2E6F]/60 focus:ring-blue-50",
  ].join(" ");
}