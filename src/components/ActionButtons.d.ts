import React from 'react';
import { ModeType } from '../types/common';
interface ActionButtonsProps {
    mode: ModeType;
    onGenerateConfig: () => void;
    disabled?: boolean;
}
declare const ActionButtons: React.FC<ActionButtonsProps>;
export default ActionButtons;
