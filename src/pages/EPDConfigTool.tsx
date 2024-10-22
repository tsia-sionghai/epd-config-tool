import React, { useState } from 'react';
import { Grid, Typography, TextField, Select, MenuItem, Button, Paper, Box, styled } from '@mui/material';
import settingsIcon from '../assets/img_set.png';
import ModeSelector from '../components/ModeSelector';
import PowerModeSelector from '../components/PowerModeSelector';
import RotateSelector from '../components/RotateSelector';
import ImageUploader from '../components/ImageUploader';
import IntervalSelector from '../components/IntervalSelector';
import hintIcon from '../assets/ic_hint.png';
import alertIcon from '../assets/ic_alert.png';

const HintIcon = styled('img')({
  width: 18,
  height: 18,
  marginRight: 4,
});

const HintText = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
  fontSize: 14,
  color: '#666',
});

const EPDConfigurationTool: React.FC = () => {
  const [customer, setCustomer] = useState('');
  const [mode, setMode] = useState('auto');
  const [powerMode, setPowerMode] = useState('hibernation');
  const [timeZone, setTimeZone] = useState('GMT+08:00');
  const [size, setSize] = useState('13.3');
  const [rotate, setRotate] = useState(0);
  const [interval, setInterval] = useState(180);
  const [images, setImages] = useState<string[]>([]);
  const [sdCardPath, setSdCardPath] = useState(''); // 添加這一行

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <img src={settingsIcon} alt="Settings" style={{ marginRight: '8px', width: '80px', height: '80px' }} />
        <Typography variant="h6" component="h6">
          EPD Configuration Tool
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">基本設定</Typography>
          </Grid>
          
          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">Customer</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField 
                fullWidth 
                value={customer} 
                onChange={(e) => setCustomer(e.target.value)}
                placeholder="請輸入名稱"
              />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">Mode</Typography>
            </Grid>
            <Grid item xs={10}>
              <ModeSelector value={"auto"} onChange={setMode} />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">Power Mode</Typography>
            </Grid>
            <Grid item xs={10}>
              <PowerModeSelector value={"hibernation"} onChange={setPowerMode} />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">Time Zone</Typography>
            </Grid>
            <Grid item xs={10}>
              <Select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value as string)}
              >
                <MenuItem value="GMT-11:00">(GMT-11:00) Midway Island</MenuItem>
                <MenuItem value="GMT-10:00">(GMT-10:00) Hawaii</MenuItem>
                <MenuItem value="GMT-09:00">(GMT-09:00) Alaska</MenuItem>
                <MenuItem value="GMT-08:00">(GMT-08:00) Pacific Time (US &amp; Canada)</MenuItem>
                <MenuItem value="GMT-07:00">(GMT-07:00) Mountain Time (US &amp; Canada)</MenuItem>
                <MenuItem value="GMT-06:00">(GMT-06:00) Central Time (US &amp; Canada)</MenuItem>
                <MenuItem value="GMT-05:00">(GMT-05:00) Eastern Time (US &amp; Canada)</MenuItem>
                <MenuItem value="GMT-04:00">(GMT-04:00) Atlantic Time (Canada)</MenuItem>
                <MenuItem value="GMT-03:30">(GMT-03:30) Newfoundland</MenuItem>
                <MenuItem value="GMT-03:00">(GMT-03:00) Buenos Aires</MenuItem>
                <MenuItem value="GMT-02:00">(GMT-02:00) Mid-Atlantic</MenuItem>
                <MenuItem value="GMT-01:00">(GMT-01:00) Azores</MenuItem>
                <MenuItem value="GMT+00:00">(GMT+00:00) London</MenuItem>
                <MenuItem value="GMT+01:00">(GMT+01:00) Paris</MenuItem>
                <MenuItem value="GMT+02:00">(GMT+02:00) Athens</MenuItem>
                <MenuItem value="GMT+03:00">(GMT+03:00) Moscow</MenuItem>
                <MenuItem value="GMT+03:30">(GMT+03:30) Tehran</MenuItem>
                <MenuItem value="GMT+04:00">(GMT+04:00) Dubai</MenuItem>
                <MenuItem value="GMT+04:30">(GMT+04:30) Kabul</MenuItem>
                <MenuItem value="GMT+05:00">(GMT+05:00) Islamabad</MenuItem>
                <MenuItem value="GMT+05:30">(GMT+05:30) Kolkata</MenuItem>
                <MenuItem value="GMT+05:45">(GMT+05:45) Kathmandu</MenuItem>
                <MenuItem value="GMT+06:00">(GMT+06:00) Dhaka</MenuItem>
                <MenuItem value="GMT+06:30">(GMT+06:30) Yangon (Rangoon)</MenuItem>
                <MenuItem value="GMT+07:00">(GMT+07:00) Bangkok</MenuItem>
                <MenuItem value="GMT+08:00" selected>(GMT+08:00) Taipei</MenuItem>
                <MenuItem value="GMT+09:00">(GMT+09:00) Tokyo</MenuItem>
                <MenuItem value="GMT+10:00">(GMT+10:00) Sydney</MenuItem>
                <MenuItem value="GMT+12:00">(GMT+12:00) Auckland</MenuItem>
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
            <Grid item xs={2}>
              <Typography align="right">Size</Typography>
            </Grid>
            <Grid item xs={10}>
              <Select
                value={size}
                onChange={(e) => setSize(e.target.value as string)}
              >
                <MenuItem value="13.3" selected>13.3" (1200x1600)</MenuItem>
                <MenuItem value="25.3">25.3" (1800x3200)</MenuItem>
                <MenuItem value="28.3">28.3" (2160x3060)</MenuItem>
                <MenuItem value="31.5">31.5" (1440x2560)</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">Rotate</Typography>
            </Grid>
            <Grid item xs={10}>
              <RotateSelector value={rotate} onChange={setRotate} />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">Interval (seconds)</Typography>
            </Grid>
            <Grid item container alignItems="center" xs={10}>
              <IntervalSelector
                value={interval}
                onChange={setInterval}
                min={180}
                max={3600}
              />
              <HintText sx={{ ml: 2 }}>
                <HintIcon src={hintIcon} alt="Hint" />
                秒數需設定180秒以上
              </HintText>
            </Grid>
          </Grid>

          <Grid item container alignItems="flex-start" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">Select Image</Typography>
            </Grid>
            <Grid item xs={10}>
              <ImageUploader images={images} setImages={setImages} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ p: 1, mb: 2, backgroundColor: 'transparent' }}>
        <Grid item xs={12}>
          SD Card Path
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
            <TextField
              variant="standard"
              slotProps={{
                input: {
                  style: {
                    padding: 0, // 移除 padding，使其更像純文字
                  },
                },
              }}
              value={"\\E"} // 示例值
              placeholder="\\E"
              disabled 
              sx={{
                ml: 4,
                backgroundColor: 'transparent', // 設定背景色為透明
                '& .MuiInput-underline:before': {
                  borderBottom: 'none',
                },
                '& .MuiInput-underline:after': {
                  borderBottom: 'none',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottom: 'none',
                },
                '& .MuiInput-underline.Mui-disabled:before': {
                  borderBottom: 'none',
                },
                '& .MuiInputBase-input': {
                  padding: 0, // 再次確認移除 padding
                },
                minWidth: '20px',
                width: '20px',
              }}
            />
            <Button variant="contained" sx={{ minWidth: 'auto', textWrap: 'nowrap' }}>
              選擇路徑
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mt: 1,
            // color: theme.palette.text.secondary,
            fontSize: '14px',
          }}>
            <img 
              src={alertIcon} 
              alt="alert" 
              style={{ 
                width: '18px', 
                height: '18px', 
                marginRight: '4px' 
              }} 
            />
            請確認所選擇的儲存路徑位於SD卡中
          </Box>
        </Grid>
      </Box>

      <Box display="flex" alignItems="center" mb={2}>
        <Button variant="contained" fullWidth style={{ color: '#FFFFFF', boxShadow: '0 1px 2px rgb(0 0 0 / 30%)', borderRadius: '16px', backgroundColor: '#F9A965', height: '32px'}}>
          產生設定檔案
        </Button>
      </Box>
    </Box>
  );
};

export default EPDConfigurationTool;
