import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// 使用 styled 創建自定義樣式的按鈕
const StyledButton = styled(Button)({
  color: '#FFFFFF',
  boxShadow: '0 1px 2px rgb(0 0 0 / 30%)',
  borderRadius: '16px',
  backgroundColor: '#F9A965',
  height: '32px',
  '&:hover': {
    backgroundColor: '#e89959', // 加入 hover 效果
  },
});

// 定義元件的 props 介面
interface CustomButtonProps extends Omit<ButtonProps, 'style'> {
  children: React.ReactNode;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  ...rest
}) => {
  return (
    <StyledButton
      variant="contained"
      fullWidth
      onClick={onClick}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default CustomButton;
