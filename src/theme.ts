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
    // TextField 樣式
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: colors.white,
            borderRadius: '20px',
            height: '40px',
            '& fieldset': {
              borderColor: colors.lightGray,
            },
            '&:hover fieldset': {
              borderColor: colors.darkGray,
            },
            '&.Mui-focused': {
              backgroundColor: colors.lightBlue60,
              '& fieldset': {
                borderColor: colors.brightPurple,
              },
            },
            '&.Mui-error': {
              backgroundColor: colors.red20,
              '& fieldset': {
                borderColor: colors.red,
              },
            },
          },
          '& .MuiOutlinedInput-input': {
            height: '40px',
            padding: '0 14px',
            lineHeight: '40px',
          },
          '& .MuiInputLabel-outlined': {
            transform: 'translate(14px, 8px) scale(1)',
            '&.MuiInputLabel-shrink': {
              transform: 'translate(14px, -9px) scale(0.75)',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '20px',
          },
          '& .MuiFormHelperText-root.Mui-error': {
            color: colors.red,
            marginLeft: '14px',
          },
        },
      },
    },
    // Select 樣式
    MuiSelect: {
      styleOverrides: {
        root: {
          height: '40px',
          '& .MuiOutlinedInput-input': {
            padding: '0 14px',
          },
          '& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input': {
            height: '40px',
            paddingTop: 0,
            paddingBottom: 0,
            display: 'flex',
            alignItems: 'center',
          },
          '.css-rc5iig-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
            display: 'flex',
            alignItems: 'center',
            height: '40px',
          },
        },
        select: {
          height: '40px',
          minHeight: '40px',
          display: 'flex',
          alignItems: 'center',
          paddingRight: '32px',
        },
        icon: {
          top: 'calc(50% - 12px)',
          right: '8px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.MuiInputLabel-outlined': {
            transform: 'translate(14px, 8px) scale(1)',
          },
          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.75)',
          },
          // Select 的標籤位置調整
          '&.MuiInputLabel-outlined.MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.75)',
          },
        },
        outlined: {
          transform: 'translate(14px, 8px) scale(1)',
          '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.75)',
          },
        },
      },
    },
    // Button 樣式
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          padding: '4px 16px',
          height: '32px',
          textTransform: 'none', // 防止自動大寫
          minWidth: '100px',
          gap: '10px',
        },
        // 含背景色的按鈕
        contained: {
          backgroundColor: colors.primaryPurple,
          color: colors.white,
          // 陰影設置
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 2px 2px 0px rgba(0, 0, 0, 0.15)',
          '&:hover': {
            backgroundColor: colors.brightPurple,
            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.2), 0px 2px 0px 0px rgba(0, 0, 0, 0)',
          },
        },
        // 邊框按鈕
        outlined: {
          borderColor: colors.darkGray,
          color: colors.darkGray,
          '&:hover': {
            borderColor: colors.black,
            backgroundColor: 'transparent',
          },
        },
        // 文字按鈕
        text: {
          color: colors.primaryPurple,
          '&:hover': {
            backgroundColor: 'transparent',
            color: colors.brightPurple,
          },
        },
        // 禁用狀態
        disabled: {
          backgroundColor: colors.lightGray,
          color: colors.darkGray,
        },
      },
      // 默認屬性
      defaultProps: {
        disableElevation: true, // 禁用默認陰影
      },
    },

    // 調整 FormControl 的樣式以確保標籤位置正確
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            transform: 'translate(14px, 8px) scale(1)',
            '&.MuiInputLabel-shrink': {
              transform: 'translate(14px, -9px) scale(0.75)',
            },
          },
        },
      },
    },
    // OutlinedInput 共用樣式
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: '40px',
          backgroundColor: colors.white,
          borderRadius: '20px',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.darkGray,
          },
          '&.Mui-focused': {
            backgroundColor: colors.lightBlue60,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.brightPurple,
            },
          },
        },
        input: {
          height: '40px',
          padding: '0 14px',
          display: 'flex',
          alignItems: 'center',
        },
        notchedOutline: {
          borderColor: colors.lightGray,
          borderRadius: '20px',
        },
      },
    },
  },
});

export { colors };
export default theme;
