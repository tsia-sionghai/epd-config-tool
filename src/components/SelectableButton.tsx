import React from 'react';
import { Paper, Typography, Box, SxProps, Theme } from '@mui/material';

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
  return (
    <Paper
      elevation={selected ? 0 : 3}
      sx={{
        cursor: 'pointer',
        borderRadius: 4,
        bgcolor: selected ? '#E5E5EC' : '#FFFFFF',
        border: '2px solid',
        borderColor: selected ? '#827BB5' : 'transparent',
        transition: 'all 0.3s',
        '&:hover': {
          bgcolor: selected ? '#E5E5EC' : '#F9FAFB',
        },
        ...sx,
      }}
      onClick={onClick}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
        {icon}
        <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold', color: '#4B5563' }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', color: '#6B7280' }}>
          {description}
        </Typography>
      </Box>
    </Paper>
  );
};

export default SelectableButton;
