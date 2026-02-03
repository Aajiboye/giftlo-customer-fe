export const getTimeElapsed = (date: Date | string) => {
  if (!date) return '';

  const now = new Date();
  const targetDate = new Date(date);
  const timeDiff = now.getTime() - targetDate.getTime();
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 30) {
    return `${days} days ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
};

export const formatDateForInput = (date?: string) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};
