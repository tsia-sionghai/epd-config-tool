import React from 'react';
import { ModeType, NetworkConfig } from '../types/common';
interface NetworkSettingsProps {
    mode: ModeType;
    config: NetworkConfig;
    onConfigChange: (config: Partial<NetworkConfig>) => void;
    serverURL: string;
    setServerURL: (url: string) => void;
    nasURL?: string;
    setNasURL?: (url: string) => void;
    errors?: {
        ssid?: string;
        password?: string;
        ip?: string;
        netmask?: string;
        gateway?: string;
        dns?: string;
        serverURL?: string;
    };
    fieldRefs?: {
        ssid: React.RefObject<HTMLInputElement>;
        password: React.RefObject<HTMLInputElement>;
        ip: React.RefObject<HTMLInputElement>;
        netmask: React.RefObject<HTMLInputElement>;
        gateway: React.RefObject<HTMLInputElement>;
        dns: React.RefObject<HTMLInputElement>;
        serverURL: React.RefObject<HTMLInputElement>;
    };
}
declare const NetworkSettings: React.FC<NetworkSettingsProps>;
export default NetworkSettings;
