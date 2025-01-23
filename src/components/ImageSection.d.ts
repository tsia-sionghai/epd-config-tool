import React from 'react';
import { SxProps, Theme } from '@mui/material';
import { ModeType, ImageConfig } from '../types/common';

interface ImageSectionProps {
    mode: ModeType;
    config: ImageConfig;
    onConfigChange: (updates: Partial<ImageConfig> | ((prev: ImageConfig) => ImageConfig)) => void;
    sx?: SxProps<Theme>;
}

declare const ImageSection: React.FC<ImageSectionProps>;
export default ImageSection;
