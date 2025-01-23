import React from 'react';
import { TimeZoneType } from '../types/common';
interface TimeZoneSelectorProps {
    value: TimeZoneType;
    onChange: (value: TimeZoneType) => void;
}
declare const TimeZoneSelector: React.FC<TimeZoneSelectorProps>;
export default TimeZoneSelector;
