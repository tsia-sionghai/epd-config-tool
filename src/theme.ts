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
      default: colors.lightBlue60,
      paper: colors.white,
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
      color: colors.brightPurple,
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
    // Input & TextField 共用樣式
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: '40px',
          borderRadius: '20px',
          backgroundColor: colors.white,
          '&.MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: colors.darkGray, // #A2ABB3
              borderRadius: '20px',
            },
            '&:hover fieldset': {
              borderColor: colors.black,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.brightPurple,
            },
          },
        },
        input: {
          padding: '8px 12px',
          height: '40px',
          boxSizing: 'border-box',
          display: 'flex',
          alignItems: 'center',
        },
      },
    },
    
    // TextField 特定樣式
    MuiTextField: {
      // defaultProps: {
      //   variant: 'outlined',
      //   fullWidth: true,
      // },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            height: '40px',
            borderRadius: '20px',
            backgroundColor: colors.white,
            '& fieldset': {
              borderColor: colors.darkGray,
              borderRadius: '20px',
            },
            '&:hover fieldset': {
              borderColor: colors.black,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.brightPurple,
            },
            '& input': {
              padding: '8px 12px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
            },
          },
        },
      },
    },

    // Select 特定樣式
    MuiSelect: {
      // defaultProps: {
      //   variant: 'outlined',
      //   fullWidth: false,
      // },
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          '& .MuiOutlinedInput-notchedOutline': {
            display: 'none', // 完全隱藏 fieldset
          },
        },
        select: {
          height: '40px',
          minWidth: '200px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: colors.lightBlue,
          borderRadius: '20px',
        },
        icon: {
          right: '12px',
        },
      },
    },

    // OutlinedInput 基礎樣式，只應用於非 Select 的情況
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // 只針對純 OutlinedInput 和 TextField 的樣式
          '&:not(.MuiSelect-root)': {
            height: '40px',
            borderRadius: '20px',
            backgroundColor: 'transparent',
            '& fieldset': {
              borderColor: colors.darkGray,
            },
            '&:hover fieldset': {
              borderColor: colors.black,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.brightPurple,
            },
          },
          // Select 的特殊樣式
          '&.MuiSelect-root': {
            backgroundColor: 'transparent',
            // 針對 fieldset 的完整選擇器路徑
            '& .MuiOutlinedInput-notchedOutline': {
              display: 'none',
            },
            '& fieldset': {
              display: 'none',
            },
          },
        },
        input: {
          padding: '8px 12px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
        },
      },
    },

    MuiButton: {
      variants: [
        {
          props: { variant: 'basic' },
          style: {
            width: '100px',
            height: '32px',
            backgroundColor: colors.primaryPurple,
            color: colors.white,
            borderRadius: '16px',
            padding: '4px 16px',
            textTransform: 'none',
            boxShadow: `
              0px 1px 3px rgba(0, 0, 0, 0.15),
              0px 2px 2px rgba(0, 0, 0, 0.1)
            `,
            '&:hover': {
              backgroundColor: colors.brightPurple,
              boxShadow: `
                0px 1px 2px rgba(0, 0, 0, 0.2),
                0px 2px 0px rgba(0, 0, 0, 0)
              `,
            },
            '&:disabled': {
              backgroundColor: colors.lightGray,
              color: colors.darkGray,
            },
          },
        },
      ],
    },

    // FormControl 樣式
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiInputLabel-root': {
            transform: 'translate(12px, 8px) scale(1)',
            '&.MuiInputLabel-shrink': {
              transform: 'translate(12px, -9px) scale(0.75)',
            },
          },
        },
      },
    },
  },
});

// 使用主題變體
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    basic: true;
  }
}

export { colors };
export default theme;
