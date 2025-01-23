// src/types/common.ts
export type ModeType = 'auto' | 'cms' | 'nas';
export type PowerModeType = 'normal' | 'hibernation' | 'off';
export type TimeZoneType = 'GMT+08:00' | 'GMT+09:00' | 'GMT+10:00';
export type SizeType = '13.3' | '25.3' | '28.3' | '31.5';
export type WifiType = 'open' | 'wpa2Personal' | 'staticIP';

// 內部使用的格式
export interface SignageConfig {
  Customer: string;
  Mode: ModeType;
  PowerMode: PowerModeType;
  TimeZone: TimeZoneType;
  ServerSyncInterval: number;
  SoftAP: string;
  Path: string;
  Size: string;
  Rotate: number;
  Interval: number;
  WifiSetting: string;
  IP_addr?: string;
  Netmask?: string;
  Gateway?: string;
  DNS?: string;
  ServerURL: string;  // 用於 CMS 和 NAS 模式
  PackageName: string;
  ActivityName: string;
}

export interface SignageConfigFile extends Omit<SignageConfig, 'Rotate' | 'Interval' | 'ServerSyncInterval'> {
  Rotate: string;
  Interval: string;
  ServerSyncInterval: string;  // 轉為字串格式
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
  ServerSyncInterval?: number;  // 添加 ServerSyncInterval 欄位
}

export interface NetworkSettingsProps {
  mode: ModeType;
  config: NetworkConfig;
  onConfigChange: (updates: Partial<NetworkConfig>) => void;
  serverURL: string;
  setServerURL: (url: string) => void;
  errors: Record<string, string>;
  onErrorChange: (field: string, error: string) => void;
  fieldRefs: {
    ssid: React.RefObject<HTMLInputElement>;
    password: React.RefObject<HTMLInputElement>;
    ip: React.RefObject<HTMLInputElement>;
    netmask: React.RefObject<HTMLInputElement>;
    gateway: React.RefObject<HTMLInputElement>;
    dns: React.RefObject<HTMLInputElement>;
    serverURL: React.RefObject<HTMLInputElement>;
  };
}
