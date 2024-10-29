export interface EPDConfig {
    size: string;
    rotate: number;
    interval: number;
}
export interface UploadResult {
    success: boolean;
    message: string;
    fileUrl?: string;
}
