// src/utils/modeHelpers.ts
import { ModeType } from '../types/common';

export const shouldShowNetworkSettings = (mode: ModeType): boolean => {
  return mode !== 'auto';
};

export const shouldShowDownloadButton = (mode: ModeType): boolean => {
  return mode === 'nas';
};
