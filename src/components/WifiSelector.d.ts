import React from 'react';
import { WifiType } from '../types/common';
interface WifiSelectorProps {
    value: WifiType;
    onChange: (value: WifiType) => void;
}
declare const WifiSelector: React.FC<WifiSelectorProps>;
export default WifiSelector;
