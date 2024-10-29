// src/components/common/SelectorField.tsx
import React from 'react';
import { Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const LabelContainer = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: '40px',
  paddingRight: '24px',
});

const LabelText = styled(Typography)({
  lineHeight: '40px',
  whiteSpace: 'nowrap',
});

interface SelectorFieldProps {
  label: string;
  children: React.ReactNode;
}

const SelectorField: React.FC<SelectorFieldProps> = ({
  label,
  children
}) => {
  return (
    <Grid 
      container 
      alignItems="center"  // 添加這個屬性
      spacing={0}
    >
      <LabelContainer item xs={2}>
        <LabelText>{label}</LabelText>
      </LabelContainer>
      <Grid item xs={9}>
        {children}
      </Grid>
    </Grid>
  );
};

export default SelectorField;
