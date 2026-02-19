import { Currency } from "@/types/product";



// Ensure the date is correctly formatted as ISO 8601 (with time)
export const formatDateToISO8601 = (date: string) => {
  if (!date) return ''; // Avoid formatting if no date
  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime()) ? '' : parsedDate.toISOString();
};

export const formatPrice = (value: number, currency: Currency = 'NGN'): string => {
  if (value === undefined || value === null) return '';

  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Helper to format a number with commas for display
export const formatNumberWithCommas = (value: number): string => {
  if (!value) return '';
  return value.toLocaleString();
};

export const maskEmail = (email: string): string => {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;

  return `${name[0]}${"*".repeat(name.length - 2)}${name.slice(-1)}@${domain}`;
};

export const maskPhoneNumber = (phone: string): string => {
  return phone.replace(/\d(?=\d{4})/g, "*");
};

export function formatCount(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
  }).format(value);
}

export function formatKoboToNaira(amountInKobo: number): string {
  if(isNaN(amountInKobo)) return '0.00'
  const amountInNaira = amountInKobo / 100;

  return `₦${amountInNaira.toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}


