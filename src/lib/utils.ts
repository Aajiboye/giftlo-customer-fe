import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string) {
  const [firstName, lastName] = name.split(' ');
  return firstName.charAt(0) + (lastName ? lastName.charAt(0) : '');
}

export const concatPhoneNumber = (countryCode: string, phoneNumber: string) => {
  let concatPhoneNumber;
  if (phoneNumber.startsWith('0')) {
    concatPhoneNumber = `${countryCode}${phoneNumber.substring(1)}`;
  } else {
    concatPhoneNumber = `${countryCode}${phoneNumber}`;
  }
  return concatPhoneNumber;
};


// utils/fileToByteArray.ts
export async function fileToByteArray(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        if (!event.target?.result) {
          throw new Error('Failed to read file');
        }

        // Get the ArrayBuffer from the result
        const arrayBuffer = event.target.result as ArrayBuffer;

        // Convert ArrayBuffer to Uint8Array (byte array)
        const byteArray = new Uint8Array(arrayBuffer);

        resolve(byteArray);
      } catch (error) {
        reject(error);
      }
    };

    // reader.onload = () => {
    //   if (reader.result instanceof ArrayBuffer) {
    //     const byteArray = new Uint8Array(reader.result);
    //     resolve(byteArray);
    //   } else {
    //     reject(new Error("Failed to read file as ArrayBuffer"));
    //   }
    // };

    // reader.onerror = () => {
    //   reject(new Error("Error reading file"));
    // };

    // Read the file as an ArrayBuffer
    reader.readAsArrayBuffer(file);
  });
}

// utils/fileToBase64.ts
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        // The result includes the data URL prefix (e.g., "data:image/png;base64,"), so we strip it
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      } else {
        reject(new Error('Failed to read file as Data URL'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };

    // Read the file as a Data URL, which will give us a Base64 string
    reader.readAsDataURL(file);
  });
}
