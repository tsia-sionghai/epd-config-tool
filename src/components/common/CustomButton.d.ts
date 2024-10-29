import React from 'react';
import { ButtonProps } from '@mui/material';
interface CustomButtonProps extends Omit<ButtonProps, 'style'> {
    children: React.ReactNode;
    onClick?: () => void;
}
declare const CustomButton: React.FC<CustomButtonProps>;
export default CustomButton;
