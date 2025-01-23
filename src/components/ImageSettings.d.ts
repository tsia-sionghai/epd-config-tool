import React from 'react';
import { ModeType, ImageConfig } from '../types/common';
interface ImageSettingsProps {
    mode: ModeType;
    config: ImageConfig;
    onConfigChange: (updates: Partial<ImageConfig> | ((prev: ImageConfig) => ImageConfig)) => void;
}
declare const ImageSettings: React.FC<ImageSettingsProps>;
export default ImageSettings;
