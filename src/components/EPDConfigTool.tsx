import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { uploadImage } from '../services/api';

const EPDConfigTool: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const result = await uploadImage(selectedFile);
        console.log('Upload result:', result);
        // 處理上傳結果
      } catch (error) {
        console.error('Upload error:', error);
        // 處理錯誤
      }
    }
  };

  return (
    <Box>
      <Typography variant="h4">EPD Configuration Tool</Typography>
      <input type="file" onChange={handleFileChange} />
      <Button variant="contained" onClick={handleUpload} disabled={!selectedFile}>
        Upload Image
      </Button>
      {/* 添加更多配置選項和表單元素 */}
    </Box>
  );
};

export default EPDConfigTool;
