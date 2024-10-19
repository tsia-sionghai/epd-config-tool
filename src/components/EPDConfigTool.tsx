import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Paper
} from '@mui/material';
import { uploadImage, generateConfig } from '../services/api';

const EPDConfigTool: React.FC = () => {
  const [config, setConfig] = useState({
    customer: 'NB',
    mode: 'Auto (Offline)',
    size: '13.3" (1200x1600)',
    rotate: '0',
    powerMode: 'Sleep',
    interval: '180',
    timeZone: '(GMT+08:00) Taipei',
    wifiSetting: '',
    ssid: '',
    wifiPassword: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleConfigChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setConfig(prevConfig => ({
      ...prevConfig,
      [name as string]: value
    }));
  };

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

  const handleGenerateConfig = async () => {
    try {
      const result = await generateConfig(config);
      console.log('Config generated:', result);
      // 處理生成的配置
    } catch (error) {
      console.error('Config generation error:', error);
      // 處理錯誤
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>EPD Configuration Setup</Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Basic Settings</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Customer"
              name="customer"
              value={config.customer}
              onChange={handleConfigChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Mode</InputLabel>
              <Select
                name="mode"
                value={config.mode}
                onChange={handleConfigChange}
                label="Mode"
              >
                <MenuItem value="Auto (Offline)">Auto (Offline)</MenuItem>
                <MenuItem value="CMS (Online)">CMS (Online)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Size</InputLabel>
              <Select
                name="size"
                value={config.size}
                onChange={handleConfigChange}
                label="Size"
              >
                <MenuItem value='13.3" (1200x1600)'>13.3" (1200x1600)</MenuItem>
                {/* Add other size options */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Common Settings</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Rotate</InputLabel>
              <Select
                name="rotate"
                value={config.rotate}
                onChange={handleConfigChange}
                label="Rotate"
              >
                <MenuItem value="0">0°</MenuItem>
                <MenuItem value="90">90°</MenuItem>
                <MenuItem value="180">180°</MenuItem>
                <MenuItem value="270">270°</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Power Mode</InputLabel>
              <Select
                name="powerMode"
                value={config.powerMode}
                onChange={handleConfigChange}
                label="Power Mode"
              >
                <MenuItem value="Sleep">Sleep</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
                <MenuItem value="Off">Off</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Interval (seconds)"
              name="interval"
              type="number"
              value={config.interval}
              onChange={handleConfigChange}
              inputProps={{ min: 180 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Time Zone</InputLabel>
              <Select
                name="timeZone"
                value={config.timeZone}
                onChange={handleConfigChange}
                label="Time Zone"
              >
                <MenuItem value="(GMT+08:00) Taipei">(GMT+08:00) Taipei</MenuItem>
                {/* Add other time zone options */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Auto Mode Settings</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="contained-button-file"
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span">
                Select Image
              </Button>
            </label>
            {selectedFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {selectedFile.name}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleUpload} disabled={!selectedFile}>
              Upload Image
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Button variant="contained" color="primary" onClick={handleGenerateConfig}>
        Generate Configuration File
      </Button>
    </Box>
  );
};

export default EPDConfigTool;