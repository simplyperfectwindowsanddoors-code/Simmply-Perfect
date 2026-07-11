"use client";

import { useCallback, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/home/Footer";

import GalleryHero from "@/components/gallery/GalleryHero";
import FeaturedProjects from "@/components/gallery/FeaturedProjects";
import CompletedProjects from "@/components/gallery/CompletedProjects";
import UpcomingProjects from "@/components/gallery/UpcomingProjects";
import GalleryCTA from "@/components/gallery/GalleryCTA";
import ProjectModal from "@/components/gallery/ProjectModal";

import type { GalleryProject } from "@/types/gallery";

export default function GalleryPage() {
  const [selectedProject, setSelectedProject] =
    useState<GalleryProject | null>(null);

  const handleProjectClick = useCallback(
    (project: GalleryProject) => {
      setSelectedProject(project);
    },
    [],
  );

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-white">
        <GalleryHero />

        <FeaturedProjects
          onProjectClick={handleProjectClick}
        />

        <CompletedProjects
          onProjectClick={handleProjectClick}
        />

        <UpcomingProjects
          onProjectClick={handleProjectClick}
        />

        <GalleryCTA />
      </main>

      <Footer />

      <ProjectModal
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </>
  );
}