"use client";

import { useCallback, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";

import CareersHero from "@/components/careers/CareersHero";
import BenefitsSection from "@/components/careers/BenefitsSection";
import JobOpenings from "@/components/careers/JobOpenings";
import WhySimmplyPerfect from "@/components/careers/WhySimmplyPerfect";
import CareersCTA from "@/components/careers/CareersCTA";
import JobModal from "@/components/careers/JobModal";

import type { Job, JobModalView } from "@/types/careers";

/* =========================================================
   CAREERS PAGE
========================================================= */

export default function CareersPage() {
  /* =========================================================
     STATE
  ========================================================= */

  const [selectedJob, setSelectedJob] = useState<Job | null>(
    null,
  );

  const [modalView, setModalView] =
    useState<JobModalView>("details");

  /* =========================================================
     OPEN JOB DETAILS
  ========================================================= */

  const handleViewDetails = useCallback((job: Job) => {
    setSelectedJob(job);
    setModalView("details");
  }, []);

  /* =========================================================
     OPEN APPLICATION DIRECTLY
  ========================================================= */

  const handleApply = useCallback((job: Job) => {
    setSelectedJob(job);
    setModalView("application");
  }, []);

  /* =========================================================
     CHANGE MODAL VIEW
  ========================================================= */

  const handleViewChange = useCallback(
    (view: JobModalView) => {
      setModalView(view);
    },
    [],
  );

  /* =========================================================
     CLOSE MODAL
  ========================================================= */

  const handleCloseModal = useCallback(() => {
    setSelectedJob(null);
    setModalView("details");
  }, []);

  /* =========================================================
     SCROLL TO JOB OPENINGS
  ========================================================= */

  const handleExploreOpenings = useCallback(() => {
    const openingsSection =
      document.getElementById("openings");

    if (!openingsSection) return;

    openingsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          GLOBAL NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <main className="min-h-screen overflow-hidden bg-white">
        {/* ===================================================
            HERO SECTION
        =================================================== */}

        <CareersHero
          onExploreOpenings={handleExploreOpenings}
        />

        {/* ===================================================
            BENEFITS / WHY JOIN US
        =================================================== */}

        <BenefitsSection />

        {/* ===================================================
            CURRENT JOB OPENINGS
        =================================================== */}

        <JobOpenings
          onViewDetails={handleViewDetails}
          onApply={handleApply}
        />

        {/* ===================================================
            WHY SIMMPLY PERFECT
        =================================================== */}

        <WhySimmplyPerfect />

        {/* ===================================================
            CAREERS CTA
        =================================================== */}

        <CareersCTA />
      </main>

      {/* =====================================================
          GLOBAL FOOTER
      ===================================================== */}

      <Footer />

      {/* =====================================================
          JOB DETAILS / APPLICATION / SUCCESS MODAL
      ===================================================== */}

      <JobModal
        job={selectedJob}
        view={modalView}
        onViewChange={handleViewChange}
        onClose={handleCloseModal}
      />
    </>
  );
}