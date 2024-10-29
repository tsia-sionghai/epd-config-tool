import React from 'react';
import { ModeType, ImageConfig } from '../types/common';
interface ImageSectionProps {
    mode: ModeType;
    config: ImageConfig;
    onConfigChange: (updates: Partial<ImageConfig> | ((prev: ImageConfig) => ImageConfig)) => void;
    sx?: any;
}
declare const ImageSection: React.FC<ImageSectionProps>;
export default ImageSection;
