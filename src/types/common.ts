// src/types/common.ts
export type ModeType = 'auto' | 'cms' | 'nas';
export type PowerModeType = 'off' | 'hibernation' | 'normal';
export type TimeZoneType = string;
export type SizeType = '13.3' | '25.3' | '28.3' | '31.5';
export type WifiType = 'open' | 'wpa2Personal' | 'staticIP';

// 時區選項介面
export interface TimeZoneOption {
  value: string;
  label: string;
}

export interface NetworkConfig {
  wifi: WifiType;
  ssid: string;
  password: string;
  ip: string;
  netmask: string;
  gateway: string;
  dns: string;
}

export interface ImageConfig {
  size: string;
  rotate: number;
  interval: number;
  images: string[];
}
