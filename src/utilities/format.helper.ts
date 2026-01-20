// Ensure the date is correctly formatted as ISO 8601 (with time)
  export const formatDateToISO8601 = (date: string) => {
    if (!date) return ''; // Avoid formatting if no date
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? '' : parsedDate.toISOString();
  };
  
   // Helper to format a number with commas for display
   export const formatNumberWithCommas = (value: number): string => {
    if(!value) return '';
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

  