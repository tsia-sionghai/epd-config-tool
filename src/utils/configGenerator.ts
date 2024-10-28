// src/utils/configGenerator.ts
import { ImageConfig } from '../types/common';

interface SignageConfig {
  mode: 'auto' | 'cms' | 'nas';
  powerMode: string;
  timeZone: string;
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
  mode: string,
  powerMode: string,
  timeZone: string,
  imageConfig: ImageConfig,
  networkConfig?: any
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
    baseConfig.wifi = {
      mode: networkConfig.wifi,
      ssid: networkConfig.ssid,
      password: networkConfig.password,
      ip: networkConfig.ip,
      netmask: networkConfig.netmask,
      gateway: networkConfig.gateway,
      dns: networkConfig.dns,
    };

    if (mode === 'cms') {
      baseConfig.serverURL = networkConfig.serverURL;
    } else {
      baseConfig.nasURL = networkConfig.nasURL;
    }
  }

  return baseConfig;
};
