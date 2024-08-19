import { alpha } from "@mui/system";
import { isBefore, parseISO } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export function validateFormEntries(formData) {
  const newErrors = {};

  if (!formData.title) {
    newErrors.title = "Title is required";
  }

  if (!formData.quantity) {
    newErrors.quantity = "Quantity is required";
  }

  if (formData.quantity <= 0) {
    newErrors.quantity = "Quantity must be greater or equal to 1";
  }

  if (!formData.difficulty) {
    newErrors.difficulty = "Difficulty is required";
  }

  if (!formData.language) {
    newErrors.language = "Language is required";
  }

  return newErrors;
}

export function generateCardGradient(theme) {
  const colors = {
    light: [
      "#ff9800", // Orange
      "#2196f3", // Blue
      "#4caf50", // Green
      "#9c27b0", // Purple
      "#f44336", // Red
      "#3f51b5", // Indigo
      "#ffc107", // Amber
      "#009688", // Teal
      "#673ab7", // Deep Purple
      "#795548", // Brown
      "#2563eb",
    ],
    dark: [
      "#ff5722", // Deep Orange
      "#3f51b5", // Indigo
      "#8bc34a", // Light Green
      "#e91e63", // Pink
      "#607d8b", // Blue Grey
      "#cddc39", // Lime
      "#9e9e9e", // Grey
      "#00bcd4", // Cyan
      "#673ab7", // Deep Purple
      "#ffeb3b", // Yellow
    ],
  };

  const baseColor =
    colors[theme.palette.mode][
      Math.floor(Math.random() * colors[theme.palette.mode].length)
    ];

  const gradient = `linear-gradient(to bottom, ${baseColor}, ${alpha(
    theme.palette.common.black,
    0.9
  )})`;

  return gradient;
}

export function generateCollectionURL(title, id) {
  const slug = title.toLowerCase().replace(/[\s\W-]+/g, "-");
  return `/user/collection/${slug}-${id}`;
}

export const generateUniqueId = () => {
  return uuidv4();
};

export function getCardLimitBasedOnPlan(planName) {
  switch (planName) {
    case "Premium":
      return -1;
    case "Basic":
      return 5;
    default:
      return 0;
  }
}

export function getQuantityBasedOnPlan(planName) {
  switch (planName) {
    case "Premium":
      return 10;
    case "Basic":
      return 3;
    default:
      return 0;
  }
}

export const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const isSubscriptionActive = (endsAt) => {
  const now = new Date();
  const endDate = parseISO(endsAt);
  return isBefore(now, endDate);
};
