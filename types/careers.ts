export type JobModalView =
  | "details"
  | "application"
  | "success";

export type Gender =
  | ""
  | "Male"
  | "Female"
  | "Other"
  | "Prefer not to say";

export type JobApplicationData = {
  firstName: string;
  lastName: string;

  email: string;
  phone: string;

  age: string;
  gender: Gender;

  role: string;
  experience: string;

  currentCtc: string;
  expectedCtc: string;

  noticePeriod: string;
  currentLocation: string;

  description: string;

  resume: File | null;
};

export type JobApplicationErrors = Partial<
  Record<keyof JobApplicationData, string>
>;

export type ApplicationStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

export type JobModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const initialJobApplicationData: JobApplicationData = {
  firstName: "",
  lastName: "",

  email: "",
  phone: "",

  age: "",
  gender: "",

  role: "",
  experience: "",

  currentCtc: "",
  expectedCtc: "",

  noticePeriod: "",
  currentLocation: "",

  description: "",

  resume: null,
};