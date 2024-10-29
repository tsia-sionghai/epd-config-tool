import React from 'react';
import { ModeType } from '../types/common';
interface ModeSelectorProps {
    value: ModeType;
    onChange: (value: ModeType) => void;
    disabledModes?: ModeType[];
}
declare const ModeSelector: React.FC<ModeSelectorProps>;
export default ModeSelector;
