import React from 'react';
import { ModeType, PowerModeType, TimeZoneType } from '../types/common';
interface BasicSettingsProps {
    customer: string;
    setCustomer: (value: string) => void;
    customerError?: string;
    mode: ModeType;
    setMode: (value: ModeType) => void;
    powerMode: PowerModeType;
    setPowerMode: (value: PowerModeType) => void;
    timeZone: TimeZoneType;
    setTimeZone: (value: TimeZoneType) => void;
}
declare const BasicSettings: React.FC<BasicSettingsProps>;
export default BasicSettings;
