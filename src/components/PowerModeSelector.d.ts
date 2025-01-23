import React from 'react';
import { PowerModeType } from '../types/common';
interface PowerModeSelectorProps {
    value: PowerModeType;
    onChange: (value: PowerModeType) => void;
}
declare const PowerModeSelector: React.FC<PowerModeSelectorProps>;
export default PowerModeSelector;
