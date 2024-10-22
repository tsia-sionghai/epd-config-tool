import { createTheme } from '@mui/material/styles';

// 定義顏色常量
const colors = {
  // Blue
  lightBlue60: '#F4F6F9',
  lightBlue: '#EDF0F5',
  
  // Purple
  purple20: '#E5E5EC',
  purple30: '#D9D7E2',
  brightPurple: '#827BB5',
  primaryPurple: '#7F7B9F',
  
  // Gray Scale
  white: '#FFFFFF',
  lightGray: '#DEDEDE',
  darkGray: '#A2ABB3',
  black: '#312F3F',
  
  // Red
  red20: '#FDD7D7',
  red: '#F33737',
  darkRed: '#B81414',
  
  // Others
  orange: '#F9A965',
  darkGreen: '#297D3D',
} as const;

// 創建主題
const theme = createTheme({
  palette: {
    primary: {
      main: colors.primaryPurple,
      light: colors.purple20,
      dark: colors.brightPurple,
    },
    error: {
      main: colors.red,
      light: colors.red20,
      dark: colors.darkRed,
    },
    grey: {
      50: colors.lightBlue60,
      100: colors.lightBlue,
      200: colors.purple20,
      300: colors.purple30,
      400: colors.lightGray,
      500: colors.darkGray,
      900: colors.black,
    },
    background: {
      default: colors.white,
      paper: colors.lightBlue60,
    },
    text: {
      primary: colors.black,
      secondary: colors.darkGray,
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h6: {
      fontSize: 20,
      lineHeight: '32px',
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: 16,
      lineHeight: '28px',
      fontWeight: 400,
    },
    body1: {
      fontSize: 16,
      lineHeight: '24px',
      fontWeight: 400,
    },
    body2: {
      fontSize: 14,
      lineHeight: '20px',
      fontWeight: 400,
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: colors.lightGray,
            },
            '&:hover fieldset': {
              borderColor: colors.darkGray,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.brightPurple,
            },
            '&.Mui-error fieldset': {
              borderColor: colors.red,
            },
          },
        },
      },
    },
    // 可以添加其他組件的樣式覆蓋
  },
});

// 導出顏色常量供直接使用
export { colors };
export default theme;
