// src/utils/modeHelpers.ts
import { ModeType } from '../types/common';
import { TFunction } from 'react-i18next';

export const getModeTitle = (mode: ModeType, t: TFunction): string => {
  switch (mode) {
    case 'auto':
      return t('common.title.auto');
    case 'cms':
      return t('common.title.cms');
    case 'nas':
      return t('common.title.nasBinary');
    default:
      return '';
  }
};

export const shouldShowNetworkSettings = (mode: ModeType): boolean => {
  return mode !== 'auto';
};

export const shouldShowDownloadButton = (mode: ModeType): boolean => {
  return mode === 'nas';
};
