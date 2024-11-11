// src/services/api.d.ts
export interface UploadResponse {
  message: string;
  image_url?: string;
  bin_url?: string[];
}

export declare const uploadImageToBin: (
  file: File,
  size: string
) => Promise<UploadResponse>;
