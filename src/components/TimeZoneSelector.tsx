// src/components/TimeZoneSelector.tsx
import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { TimeZoneType } from '../types/common';

interface TimeZoneSelectorProps {
  value: TimeZoneType;
  onChange: (value: TimeZoneType) => void;
}

const TimeZoneSelector: React.FC<TimeZoneSelectorProps> = ({ value, onChange }) => {
  // 定義時區選項
  const timeZones = [
    { value: 'GMT-11:00', label: '(GMT-11:00) Midway Island' },
    { value: 'GMT-10:00', label: '(GMT-10:00) Hawaii' },
    { value: 'GMT-09:00', label: '(GMT-09:00) Alaska' },
    { value: 'GMT-08:00', label: '(GMT-08:00) Pacific Time (US & Canada)' },
    { value: 'GMT-07:00', label: '(GMT-07:00) Mountain Time (US & Canada)' },
    { value: 'GMT-06:00', label: '(GMT-06:00) Central Time (US & Canada)' },
    { value: 'GMT-05:00', label: '(GMT-05:00) Eastern Time (US & Canada)' },
    { value: 'GMT-04:00', label: '(GMT-04:00) Atlantic Time (Canada)' },
    { value: 'GMT-03:30', label: '(GMT-03:30) Newfoundland' },
    { value: 'GMT-03:00', label: '(GMT-03:00) Buenos Aires' },
    { value: 'GMT-02:00', label: '(GMT-02:00) Mid-Atlantic' },
    { value: 'GMT-01:00', label: '(GMT-01:00) Azores' },
    { value: 'GMT+00:00', label: '(GMT+00:00) London' },
    { value: 'GMT+01:00', label: '(GMT+01:00) Paris' },
    { value: 'GMT+02:00', label: '(GMT+02:00) Athens' },
    { value: 'GMT+03:00', label: '(GMT+03:00) Moscow' },
    { value: 'GMT+03:30', label: '(GMT+03:30) Tehran' },
    { value: 'GMT+04:00', label: '(GMT+04:00) Dubai' },
    { value: 'GMT+04:30', label: '(GMT+04:30) Kabul' },
    { value: 'GMT+05:00', label: '(GMT+05:00) Islamabad' },
    { value: 'GMT+05:30', label: '(GMT+05:30) Kolkata' },
    { value: 'GMT+05:45', label: '(GMT+05:45) Kathmandu' },
    { value: 'GMT+06:00', label: '(GMT+06:00) Dhaka' },
    { value: 'GMT+06:30', label: '(GMT+06:30) Yangon (Rangoon)' },
    { value: 'GMT+07:00', label: '(GMT+07:00) Bangkok' },
    { value: 'GMT+08:00', label: '(GMT+08:00) Taipei' },
    { value: 'GMT+09:00', label: '(GMT+09:00) Tokyo' },
    { value: 'GMT+10:00', label: '(GMT+10:00) Sydney' },
    { value: 'GMT+12:00', label: '(GMT+12:00) Auckland' },
  ] as const;

  return (
    <Select
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value as TimeZoneType)}
    >
      {timeZones.map((zone) => (
        <MenuItem
          key={zone.value}
          value={zone.value}
          selected={value === zone.value}
        >
          {zone.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default TimeZoneSelector;
