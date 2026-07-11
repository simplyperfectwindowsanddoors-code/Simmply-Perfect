export type ProjectCategory =
  | "Windows & Doors"
  | "Interiors"
  | "Renovations";

export type ProjectStatus =
  | "Featured"
  | "Completed"
  | "Upcoming";

export type GalleryProject = {
  id: number;
  slug: string;

  title: string;
  category: ProjectCategory;
  status: ProjectStatus;

  location: string;
  year: string;

  shortDescription: string;
  description: string;

  image: string;
  images?: string[];

  services: string[];
};