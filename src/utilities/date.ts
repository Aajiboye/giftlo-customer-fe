export const capitalize = (value: string) => {
	return value
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
};

export const formatDate = (dateString: string, time?: Boolean) => {
	const date = new Date(dateString);

	// Array of month names
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const month = monthNames[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();
	//for just year and month

	if (!Boolean(time)) return `${month} ${day}, ${year}`;
	let hours = date.getHours();
	const minutes = date.getMinutes();

	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

	const ampm = hours >= 12 ? "PM" : "AM";

	hours = hours % 12;
	hours = hours ? hours : 12;

	// Format the date string

	const formattedDate = `${month} ${day}, ${year} ${hours}:${formattedMinutes} ${ampm}`;

	return formattedDate;
};

export const maskString = (value: string | null, type: "email" | "phone") => {
	if (!value) return "";
	if (type === "email") {
		const username = value.split("@")[0]!;
		const domain = value.split("@")[1]!;
		const maskedUsername =
			username.length > 2
				? `${username[0]}${"*".repeat(username.length - 2)}${username[username.length - 1]}`
				: username;
		return `${maskedUsername}@${domain}`;
	} else {
		return `${"*".repeat(value.length - 4)}${value.slice(-4)}`;
	}
};

export const formatNumber = (value: number | string): string => {
	const numericValue = typeof value === "number" ? value : parseFloat(value);
	if (isNaN(numericValue)) return "";
	return numericValue
		.toString()
		.replace(/^[0-9]/g, "")
		.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");
};

/**D
 * @name
 * This function converts an input of days, months and years to days
 */
export const convertToDays = (days: number, months: number, years: number) => {
	return days + months * 30 + years * 365;
};
/**
 * Formats a number as currency with commas and adds the Naira sign.
 * @param amount - The amount of money to format.
 * @param decimalCount - Number of decimal places to show. Default is 2.
 * @returns The formatted currency string with the Naira sign.
 */
export function formatAmount(amount: number): string {
	try {
		const formattedAmount = amount.toLocaleString("en-NG");
		return `${formattedAmount}`;
	} catch (e) {
		//console.error("Error formatting currency:", e);
		return `${amount}`;
	}
}

// this function should return years, months and days
export const convertToYears = (days: number) => {
	const years = Math.floor(days / 365);
	const remainingDays = days % 365;
	const months = Math.floor(remainingDays / 30);
	const remainingDaysAfterMonths = remainingDays % 30;

	return `${years} ${years > 1 ? "years" : "year"}, ${months} ${months > 1 ? "months" : "month"}, ${remainingDaysAfterMonths} ${days > 1 ? "days" : "day"}`;
};

export const convertDaysToDuration = (days: number) => {
	const years = Math.floor(days / 365);
	const remainingDays = days % 365;
	const months = Math.floor(remainingDays / 30);
	const daysRemaining = remainingDays % 30;

	return {
		years,
		months,
		days: daysRemaining,
	};
};

export const fromPascalCase = (value: string) => {
	return value
		.split(/(?=[A-Z])/)
		.join(" ")
		.toLowerCase();
};

export const fromCamelCase = (value: string) => {
	return value
		.split(/(?=[A-Z])/)
		.join(" ")
		.toLowerCase();
};

export const getInitials = (value: string) => {
	const words = value.split(" ");
	let initials = "";
	words.forEach((word) => {
		initials += word.charAt(0).toUpperCase();
	});
	return initials;
};

export const formatSortDate = (dateString: string) => {
	const date = new Date(dateString);
	const formattedDate = date.toLocaleDateString("en-GB").split("/").join("-");
	return `${formattedDate}`;
};

export function convertDaysToYMD(totalDays: number): string {
    const daysInMonth = 30;
    const monthsInYear = 12;
    const daysInYear = daysInMonth * monthsInYear;

    const years = Math.floor(totalDays / daysInYear);
    const remainingDaysAfterYears = totalDays % daysInYear;

    const months = Math.floor(remainingDaysAfterYears / daysInMonth);
    const days = remainingDaysAfterYears % daysInMonth;

    const parts: string[] = [];

    if (years > 0) {
        parts.push(`${years} year${years !== 1 ? 's' : ''}`);
    }

    if (months > 0) {
        parts.push(`${months} month${months !== 1 ? 's' : ''}`);
    }

    if (days > 0) {
        parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    }

    return parts.join(', ') || '0 days';
}