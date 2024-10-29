// src/utils/configGenerator.ts
import { ModeType, PowerModeType, TimeZoneType, ImageConfig, NetworkConfig } from '../types/common';

interface SignageConfig {
  mode: ModeType;
  powerMode: PowerModeType;
  timeZone: TimeZoneType;
  size: string;
  rotate: number;
  interval: number;
  imageCount?: number;
  wifi?: {
    mode: string;
    ssid?: string;
    password?: string;
    ip?: string;
    netmask?: string;
    gateway?: string;
    dns?: string;
  };
  serverURL?: string;
  nasURL?: string;
}

export const generateConfig = (
  mode: ModeType,
  powerMode: PowerModeType,
  timeZone: TimeZoneType,
  imageConfig: ImageConfig,
  networkConfig?: NetworkConfig
): SignageConfig => {
  const baseConfig: SignageConfig = {
    mode,
    powerMode,
    timeZone,
    size: imageConfig.size,
    rotate: imageConfig.rotate,
    interval: imageConfig.interval,
  };

  if (mode === 'auto' || mode === 'nas') {
    baseConfig.imageCount = imageConfig.images.length;
  }

  if (mode === 'cms' || mode === 'nas') {
    baseConfig.wifi = networkConfig ? {
      mode: networkConfig.wifi,
      ssid: networkConfig.ssid,
      password: networkConfig.password,
      ip: networkConfig.ip,
      netmask: networkConfig.netmask,
      gateway: networkConfig.gateway,
      dns: networkConfig.dns,
    } : undefined;

    if (mode === 'cms' && networkConfig?.serverURL) {
      baseConfig.serverURL = networkConfig.serverURL;
    } else if (mode === 'nas' && networkConfig?.nasURL) {
      baseConfig.nasURL = networkConfig.nasURL;
    }
  }

  return baseConfig;
};
