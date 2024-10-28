// src/types/common.ts
export type ModeType = 'auto' | 'nas' | 'cms';

export type PowerModeType = 'normal' | 'hibernation' | 'off';

export type TimeZoneType = 'GMT+00:00' | 'GMT+01:00' | 'GMT+02:00' | 'GMT+03:00' | 
                          'GMT+04:00' | 'GMT+05:00' | 'GMT+06:00' | 'GMT+07:00' | 
                          'GMT+08:00' | 'GMT+09:00' | 'GMT+10:00' | 'GMT+11:00' | 
                          'GMT+12:00' | 'GMT-11:00' | 'GMT-10:00' | 'GMT-09:00' | 
                          'GMT-08:00' | 'GMT-07:00' | 'GMT-06:00' | 'GMT-05:00' | 
                          'GMT-04:00' | 'GMT-03:00' | 'GMT-02:00' | 'GMT-01:00';
// 時區選項介面
// export interface TimeZoneOption {
//   value: string;
//   label: string;
// }

export type SizeType = '13.3' | '25.3' | '28.3' | '31.5';

export type WifiType = 'open' | 'wpa2Personal' | 'staticIP';

export interface NetworkConfig {
  wifi: string;          // wifi 類型，例如："wpa2Personal"
  ssid: string;          // 網路 SSID
  password: string;      // 網路密碼
  ip: string;           // 靜態 IP（如果有的話）
  netmask: string;      // 子網路遮罩
  gateway: string;      // 閘道器
  dns: string;          // DNS 伺服器
}

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
  size: string;
  rotate: number;
  interval: number;
  images: ImageFile[];
}
