import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { colors } from '../theme';

// 使用自定義樣式的卡片
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 8,
  boxShadow: 'none',
  border: `1px solid ${colors.lightGray}`,
}));

// 自定義標題區域
const HeaderSection = styled(Box)(({ theme }) => ({
  backgroundColor: colors.purple20,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const FormExample: React.FC = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    type: '',
    hasError: false,
  });

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      {/* 頁面標題 */}
      <HeaderSection>
        <Typography variant="h6" color="primary">
          系統設定
        </Typography>
        <Typography variant="body2" color="text.secondary">
          請填寫以下資料以完成設定
        </Typography>
      </HeaderSection>

      {/* 主要表單卡片 */}
      <StyledCard>
        <CardContent>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* 文字輸入範例 */}
            <TextField
              variant="outlined"
              fullWidth={true} 
              label="使用者名稱"
              value={formState.username}
              onChange={(e) => setFormState({ ...formState, username: e.target.value })}
            />

            {/* 錯誤狀態範例 */}
            <TextField
              variant="outlined"
              fullWidth={true} 
              label="電子郵件" 
              error={formState.hasError}
              helperText={formState.hasError ? "請輸入有效的電子郵件地址" : ""}
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            />

            {/* 下拉選單範例 */}
            <FormControl fullWidth>
              <InputLabel>類型</InputLabel>
              <Select
                variant="outlined"
                fullWidth={true} 
                value={formState.type}
                label="類型"
                onChange={(e) => setFormState({ ...formState, type: e.target.value })}
              >
                <MenuItem value="type1">類型一</MenuItem>
                <MenuItem value="type2">類型二</MenuItem>
                <MenuItem value="type3">類型三</MenuItem>
              </Select>
            </FormControl>

            {/* 按鈕範例 */}
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  color: colors.darkGray,
                  borderColor: colors.darkGray,
                  '&:hover': {
                    borderColor: colors.black,
                    backgroundColor: 'transparent',
                  },
                }}
              >
                取消
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: colors.primaryPurple,
                  '&:hover': {
                    backgroundColor: colors.brightPurple,
                  },
                }}
              >
                確認
              </Button>
            </Box>
          </Box>
        </CardContent>
      </StyledCard>

      {/* 錯誤提示範例 */}
      <Box sx={{ mt: 2 }}>
        <Alert severity="error" sx={{ backgroundColor: colors.red20, color: colors.red }}>
          這是一個錯誤提示訊息
        </Alert>
      </Box>

      {/* 提示文字範例 */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" color="text.secondary">
          標題文字 (subtitle1)
        </Typography>
        <Typography variant="body1">
          一般內文 (body1)，展示預設的文字樣式。
        </Typography>
        <Typography variant="body2" color="text.secondary">
          次要內文 (body2)，用於補充說明或附註。
        </Typography>
      </Box>
    </Box>
  );
};

export default FormExample;