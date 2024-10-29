import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '@mui/material';
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
const CustomButton = ({ children, onClick, ...rest }) => {
    return (_jsx(StyledButton, { variant: "contained", fullWidth: true, onClick: onClick, ...rest, children: children }));
};
export default CustomButton;
