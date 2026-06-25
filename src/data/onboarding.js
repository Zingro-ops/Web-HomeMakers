// Onboarding: 5 sequential steps
export const TOTAL_STEPS = 5;

export const STEPS = {
  personal: {
    step: 1,
    label: "Personal Information",
    next: "/address-details",
  },
  address: { step: 2, label: "Address Details", next: "/bank-details" },
  bank: { step: 3, label: "Bank Details", next: "/kitchen-information" },
  kitchen: { step: 4, label: "Kitchen Information", next: "/review-submit" },
  review: {
    step: 5,
    label: "Review & Submit",
    next: "/verification-submitted",
  },
};
export const durations = ["7 days", "15 days", "30 days", "90 days"];
export const banks = [
  "HDFC Bank",
  "ICICI Bank",
  "State Bank of India",
  "Axis Bank",
  "Kotak Mahindra",
  "Other",
];
export const cuisines = [
  "North Indian",
  "South Indian",
  "Chinese",
  "Continental",
  "Bengali",
  "Gujarati",
];
export const foodCategories = ["Vegetarian", "Non-Vegetarian", "Both", "Vegan"];
