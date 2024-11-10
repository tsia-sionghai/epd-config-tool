// src/types/common.ts
export type ModeType = 'auto' | 'cms' | 'nas';
export type PowerModeType = 'normal' | 'hibernation' | 'off';
export type TimeZoneType = 'GMT+08:00' | 'GMT+09:00' | 'GMT+10:00';
export type SizeType = '13.3' | '25.3' | '28.3' | '31.5';
export type WifiType = 'open' | 'wpa2Personal' | 'staticIP';

// 新增配置檔案介面
export interface SignageConfigFile {
  Customer: string;
  Mode: ModeType;
  PowerMode: PowerModeType;
  TimeZone: TimeZoneType;
  SoftAP: string;
  Path: string;
  Size: string;
  Rotate: string;        // 存檔時轉為字串
  Interval: string;      // 存檔時轉為字串
  WifiSetting: string | {
    Mode: WifiType;
    SSID?: string;
    Password?: string;
    IP_addr?: string;
    Netmask?: string;
    Gateway?: string;
    DNS?: string;
  };
  ServerURL: string;
  PackageName: string;
  ActivityName: string;
}

// 內部使用的配置介面
export interface SignageConfig {
  Customer: string;
  Mode: ModeType;
  PowerMode: PowerModeType;
  TimeZone: TimeZoneType;
  SoftAP: string;
  Path: string;
  Size: string;
  Rotate: number;        // 程式內使用 number
  Interval: number;      // 程式內使用 number
  WifiSetting: string | {
    Mode: WifiType;
    SSID?: string;
    Password?: string;
    IP_addr?: string;
    Netmask?: string;
    Gateway?: string;
    DNS?: string;
  };
  ServerURL: string;
  PackageName: string;
  ActivityName: string;
}

export interface ImageFile {
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  id: string;
  order?: number;
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
  serverURL?: string;
  nasURL?: string;
}
