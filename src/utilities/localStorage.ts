export function getLocalStorage(): Storage | null {
    if (typeof window !== 'undefined') {
      return window.localStorage;
    }
    return null;
}

export const getLocalStorageItem = <T,>(key: string): T | null => {
  try {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);

      if(item !== "undefined"){
        return item ? JSON.parse(item) : null;
      }
      return null;
    }
  } catch (error) {
    //console.error(`Error reading key "${key}" from localStorage:`, error);
  }
  return null;
};

export const setLocalStorageItem = <T,>(key: string, value: T): void => {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    //console.error(`Error setting key "${key}" in localStorage:`, error);
  }
};