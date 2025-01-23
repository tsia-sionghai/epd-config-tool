// src/components/common/SelectableButton.tsx
import React from 'react';
import { Paper, Box, Typography, styled } from '@mui/material';
import theme from '../../theme';

interface SelectableButtonProps {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ theme, selected }) => ({
  cursor: 'pointer',
  width: '100%',
  height: '150px', // 設定固定高度
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`, // 8px 16px
  transition: 'all 0.2s ease-in-out',
  backgroundColor: selected ? theme.palette.grey[200] : theme.palette.background.paper,
  border: selected ? `2px solid ${theme.palette.primary.dark}` : `2px solid transparent`,
  
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
    border: `2px solid ${theme.palette.primary.dark}`,
  },

  '&.Mui-disabled': {
    backgroundColor: theme.palette.grey[100],
    cursor: 'not-allowed',
  },
}));

const ContentWrapper = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start', // 使內容均勻分布
});

const IconWrapper = styled(Box)({
  // ...
});

const LabelWrapper = styled(Box)({
  textAlign: 'center',
  color: theme.palette.primary.main,
});

const DescriptionWrapper = styled(Typography)({
  textAlign: 'center',
  color: 'text.secondary',
  fontSize: '14px',
  lineHeight: '1.4',
});

const SelectableButton: React.FC<SelectableButtonProps> = ({
  selected,
  onClick,
  children,
  icon,
  description,
  disabled = false,
}) => {
  return (
    <StyledPaper
      selected={selected}
      onClick={disabled ? undefined : onClick}
      className={disabled ? 'Mui-disabled' : ''}
    >
      <ContentWrapper>
        {icon && (
          <IconWrapper>
            {icon}
          </IconWrapper>
        )}
        <Box>
          <LabelWrapper>
            <Typography variant="body1" component="div">
              {children}
            </Typography>
          </LabelWrapper>
          {description && (
            <DescriptionWrapper variant="body2">
              {description}
            </DescriptionWrapper>
          )}
        </Box>
      </ContentWrapper>
    </StyledPaper>
  );
};

export default SelectableButton;
