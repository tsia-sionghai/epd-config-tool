export interface EPDConfig {
  size: string;
  rotate: number;
  interval: number;
  // 添加其他配置項...
}

export interface UploadResult {
  success: boolean;
  message: string;
  fileUrl?: string;
}
