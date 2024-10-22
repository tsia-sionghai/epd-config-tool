import React from 'react';
import { Paper, Typography, Box, SxProps, Theme, useTheme } from '@mui/material';
import { colors } from '../theme'; // 假設 theme.ts 在 src 目錄下

interface SelectableButtonProps {
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  description: string;
  sx?: SxProps<Theme>;
}

const SelectableButton: React.FC<SelectableButtonProps> = ({
  selected,
  onClick,
  icon,
  title,
  description,
  sx = {},
}) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={selected ? 0 : 3}
      sx={{
        cursor: 'pointer',
        borderRadius: 4,
        bgcolor: selected ? colors.purple20 : colors.white,
        border: '2px solid',
        borderColor: selected ? colors.brightPurple : 'transparent',
        transition: 'all 0.3s',
        '&:hover': {
          bgcolor: selected ? colors.purple20 : colors.lightBlue60,
        },
        ...sx,
      }}
      onClick={onClick}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        height: '100%' 
      }}>
        {icon}
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mt: 1, 
            color: colors.primaryPurple 
          }}
        >
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 1, 
            textAlign: 'center',
            color: theme.palette.text.primary 
          }}
        >
          {description}
        </Typography>
      </Box>
    </Paper>
  );
};

export default SelectableButton;