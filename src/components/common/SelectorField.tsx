// src/components/common/SelectorField.tsx
import React from 'react';
import { Grid, Typography, GridProps } from '@mui/material';
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
  verticalAlign?: 'flex-start' | 'center';  // 修改為使用 flex 的對齊值
  containerProps?: Partial<GridProps>;
}

const SelectorField: React.FC<SelectorFieldProps> = ({
  label,
  children,
  verticalAlign = 'center',
  containerProps
}) => {
  return (
    <Grid 
      container 
      alignItems={verticalAlign}  // 這裡使用 flex-start 而不是 top
      spacing={0}
      {...containerProps}
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
