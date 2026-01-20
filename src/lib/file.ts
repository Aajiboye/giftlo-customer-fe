export const getFileExtension = (fileName: string) => {
  const split = fileName.split('.');
  if (split.length < 2) return '';
  return split[split.length - 1]!;
};

export const convertFileToBase64 = (file: File) => {
  return new Promise<string>((resolve) => {
    if (!file) return resolve('');
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const splitResult = base64String.split(',')[1];
      if (!splitResult) throw new Error('Failed to parse base64 string');
      resolve(splitResult);
    };
    reader.readAsDataURL(file);
  });
};

export const getFileSize = (size?: number) => {
  if (!size) return '0';
  const sizeInMb = size / 1024 / 1024;
  return sizeInMb.toFixed(2);
};

export const createPdf = (data: any) => {};

export function base64ToFile(
  base64String: string,
  fileName: string,
  mimeType: string
): File {
  // Decode the Base64 string to a binary string
  const byteString = base64String && atob(base64String);

  // Create an array of byte values
  const byteArray = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  // Create a Blob from the byte array
  const blob = new Blob([byteArray], { type: mimeType });

  // Create a File from the Blob
  return new File([blob], fileName, { type: mimeType });
}
