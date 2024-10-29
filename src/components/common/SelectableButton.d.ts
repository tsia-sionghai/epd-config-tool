import React from 'react';
interface SelectableButtonProps {
    selected: boolean;
    onClick: () => void;
    children: React.ReactNode;
    icon?: React.ReactNode;
    description?: string;
    disabled?: boolean;
}
declare const SelectableButton: React.FC<SelectableButtonProps>;
export default SelectableButton;
