// src/configs/sizeOptions.ts
export const sizeOptions = [
  { value: '13.3', resolution: '1200x1600' },
  { value: '25.3', resolution: '3200x1800' },
  { value: '28.3', resolution: '3060x2160' },
  { value: '31.5', resolution: '2560x1440' }
] as const;

export const getResolution = (size: string) => {
  return sizeOptions.find(option => option.value === size)?.resolution || '1200x1600';
};
