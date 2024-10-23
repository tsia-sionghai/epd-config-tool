import React from 'react';
import { Typography, Box, SxProps, Theme } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

// 定義提示類型
export type HintType = 'info' | 'error' | 'warning';

// 定義每種類型對應的顏色
const typeColors: Record<HintType, string> = {
  info: '#2196F3',    // 藍色
  error: '#FF0000',   // 紅色
  warning: '#FFA500'  // 橙色
};

// 定義每種類型對應的圖示
const typeIcons: Record<HintType, typeof InfoIcon> = {
  info: InfoIcon,
  error: ErrorIcon,
  warning: WarningIcon
};

interface HintMessageProps {
  type?: HintType;
  message: string | React.ReactNode;
  icon?: React.ReactNode;
  containerSx?: SxProps<Theme>;
  typographySx?: SxProps<Theme>;
}

const HintMessage: React.FC<HintMessageProps> = ({
  type = 'info',
  message,
  icon,
  containerSx,
  typographySx
}) => {
  const Icon = typeIcons[type];
  const color = typeColors[type];

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5, // 改為 0.5 (4px) 或更小的值
        ...containerSx
      }}
    >
      {icon || <Icon sx={{ color, fontSize: 20 }} />}
      <Typography
        variant="body2"
        sx={{
          color,
          ...typographySx
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default HintMessage;
