import React, { useState } from 'react';
import { Grid, Typography, TextField, Select, MenuItem, Button, Paper, Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ModeSelector from './ModeSelector';
import PowerModeSelector from './PowerModeSelector';
import RotateSelector from './RotateSelector';
import ImageUploader from './ImageUploader';

const EPDConfigurationTool: React.FC = () => {
  const [customer, setCustomer] = useState('');
  const [mode, setMode] = useState('auto');
  const [powerMode, setPowerMode] = useState('normal');
  const [timeZone, setTimeZone] = useState('GMT+08:00');
  const [size, setSize] = useState('13.3" (1200x1600)');
  const [rotate, setRotate] = useState(0);
  const [interval, setInterval] = useState(180);
  const [images, setImages] = useState<string[]>([]);

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={2}>
        <SettingsIcon sx={{ mr: 1, fontSize: 30 }} />
        <Typography variant="h4" component="h1">
          EPD Configuration Tool
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">基本設定</Typography>
          </Grid>
          
          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={3}>
              <Typography align="right">Customer</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField 
                fullWidth 
                value={customer} 
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="請輸入名稱"
              />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={3}>
              <Typography align="right">Mode</Typography>
            </Grid>
            <Grid item xs={9}>
              <ModeSelector value={mode} onChange={setMode} />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={3}>
              <Typography align="right">Power Mode</Typography>
            </Grid>
            <Grid item xs={9}>
              <PowerModeSelector value={powerMode} onChange={setPowerMode} />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={3}>
              <Typography align="right">Time Zone</Typography>
            </Grid>
            <Grid item xs={9}>
              <Select
                fullWidth
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value as string)}
              >
                <MenuItem value="GMT+08:00">GMT+08:00 Taipei</MenuItem>
                {/* Add more time zones here */}
              </Select>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">單機操作設定</Typography>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={3}>
              <Typography align="right">Size</Typography>
            </Grid>
            <Grid item xs={9}>
              <Select
                fullWidth
                value={size}
                onChange={(e) => setSize(e.target.value as string)}
              >
                <MenuItem value="13.3 (1200x1600)">13.3" (1200x1600)</MenuItem>
                <MenuItem value="25.3 (1800x3200)">25.3" (1800x3200)</MenuItem>
                <MenuItem value="28.3 (2160x3060)">28.3" (2160x3060)</MenuItem>
                <MenuItem value="31.5 (1440x2560)">31.5" (1440x2560)</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={3}>
              <Typography align="right">Rotate</Typography>
            </Grid>
            <Grid item xs={9}>
              <RotateSelector value={rotate} onChange={setRotate} />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={3}>
              <Typography align="right">Interval (seconds)</Typography>
            </Grid>
            <Grid item xs={9}>
              <TextField
                type="number"
                value={interval}
                onChange={(e) => setInterval(Number(e.target.value))}
                InputProps={{
                  endAdornment: (
                    <>
                      <Button onClick={() => setInterval(prev => prev - 1)}>-</Button>
                      <Button onClick={() => setInterval(prev => prev + 1)}>+</Button>
                    </>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <ImageUploader images={images} setImages={setImages} />
          </Grid>
        </Grid>
      </Paper>

      <Box display="flex" alignItems="center" mb={2}>
        <Button variant="contained" color="primary" fullWidth>
          產生檔案
        </Button>
      </Box>
    </Box>
  );
};

export default EPDConfigurationTool;
