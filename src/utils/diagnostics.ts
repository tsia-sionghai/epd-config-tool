// src/utils/diagnostics.ts
interface FileError extends Error {
  name: string;
  message: string;
  stack?: string;
}

// 讀取檔案前幾個位元組
const readFirstBytes = async (file: File, bytes: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const array = new Uint8Array(reader.result as ArrayBuffer);
      const hex = Array.from(array.slice(0, bytes))
        .map(b => b.toString(16).padStart(2, '0'))
        .join(' ');
      resolve(hex);
    };
    reader.onerror = reject;
    reader.readAsArrayBuffer(file.slice(0, bytes));
  });
};

// 計算檔案雜湊值
const calculateHash = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

export const logFileDetails = async (file: File) => {
  try {
    const details = {
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: new Date(file.lastModified).toISOString(),
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      firstBytes: await readFirstBytes(file, 16),
      contentHash: await calculateHash(file),
    };
    return details;
  } catch (err) {
    const error = err as FileError;
    console.error('Error logging file details:', {
      error: error.message,
      errorType: error.name,
      errorStack: error.stack
    });
    throw error;
  }
};
