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
export declare const generateConfig: (mode: ModeType, powerMode: PowerModeType, timeZone: TimeZoneType, imageConfig: ImageConfig, networkConfig?: NetworkConfig) => SignageConfig;
export {};
