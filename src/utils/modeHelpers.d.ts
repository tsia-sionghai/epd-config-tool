import { ModeType } from '../types/common';
import { TFunction } from 'i18next';
export declare const getModeTitle: (mode: ModeType, t: TFunction) => string;
export declare const shouldShowNetworkSettings: (mode: ModeType) => boolean;
export declare const shouldShowDownloadButton: (mode: ModeType) => boolean;
