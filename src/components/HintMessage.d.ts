import React from 'react';
import { SxProps, Theme } from '@mui/material';
export type HintType = 'info' | 'error' | 'warning';
interface HintMessageProps {
    type?: HintType;
    message: string | React.ReactNode;
    icon?: React.ReactNode;
    containerSx?: SxProps<Theme>;
    typographySx?: SxProps<Theme>;
}
declare const HintMessage: React.FC<HintMessageProps>;
export default HintMessage;
