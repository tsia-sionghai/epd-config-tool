import React from 'react';
import { SizeType } from '../types/common';
interface SizeSelectorProps {
    value: SizeType;
    onChange: (value: SizeType) => void;
}
declare const SizeSelector: React.FC<SizeSelectorProps>;
export default SizeSelector;
