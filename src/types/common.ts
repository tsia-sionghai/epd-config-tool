// src/types/common.ts
export type ModeType = 'auto' | 'cms' | 'nas';
export type PowerModeType = 'normal' | 'hibernation' | 'off';
export type TimeZoneType = 'GMT+08:00' | 'GMT+09:00' | 'GMT+10:00';
export type SizeType = '13.3' | '25.3' | '28.3' | '31.5';
export type WifiType = 'open' | 'wpa2Personal' | 'staticIP';

export interface ImageFile {
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  id: string;
}

export interface ImageConfig {
  size: SizeType;
  rotate: number;
  interval: number;
  images: ImageFile[];
}

export interface NetworkConfig {
  wifi: WifiType;
  ssid: string;
  password: string;
  ip: string;
  netmask: string;
  gateway: string;
  dns: string;
  serverURL?: string;  // 添加這個
  nasURL?: string;     // 添加這個
}
