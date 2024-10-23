import React, { useState } from 'react';
import { Grid, Typography, TextField, Select, MenuItem, Button, Paper, Box, styled, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import settingsIcon from '../assets/img_set.png';
import ModeSelector from '../components/ModeSelector';
import PowerModeSelector from '../components/PowerModeSelector';
import RotateSelector from '../components/RotateSelector';
import IntervalSelector from '../components/IntervalSelector';
import ImageSection from '../components/ImageSection';
import HintMessage from '../components/HintMessage';
import CustomButton from '../components/CustomButton';
import hintIcon from '../assets/ic_hint.png';

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
  const { t } = useTranslation();
  const theme = useTheme();
  // 基本設定
  const [customer, setCustomer] = useState('');
  const [mode, setMode] = useState('auto');
  const [powerMode, setPowerMode] = useState('hibernation');
  const [timeZone, setTimeZone] = useState('GMT+08:00');
  const [size, setSize] = useState('13.3');
  const [rotate, setRotate] = useState(0);
  const [interval, setInterval] = useState(180);
  // 單機操作設定
  const [images, setImages] = useState<string[]>([]);
  // CMS 控制設定
  const [wifi, setWiFi] = useState('wpa2Personal');
  const [ssid, setSSID] = useState('');
  const [password, setPassword] = useState('');
  const [ip, setIP] = useState('');
  const [netmask, setNetmask] = useState('');
  const [gateway, setGateway] = useState('');
  const [dns, setDNS] = useState('');
  const [serverURL, setServerURL] = useState('https://api.ezread.com.tw/schedule');
  // NAS 設定
  const [nasURL, setNasURL] = useState('');
  // SD 卡路徑
  const [sdCardPath, setSdCardPath] = useState(''); // 添加這一行

  const handleDownloadBinary = () => {
    // 處理按鈕點擊事件
    console.log('下載播放檔案按鈕被點擊');
  };

  const handleGenerateConfig = () => {
    // 處理按鈕點擊事件
    console.log('產生設定檔案按鈕被點擊');
  };

  return (
    <Box>
      {/* 網頁標題 */}
      <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
        <img src={settingsIcon} alt="Settings" style={{ marginRight: '8px', width: '80px', height: '80px' }} />
        <Typography variant="h6" component="h6">
          {t('common.title.main')}
        </Typography>
      </Box>
      
      {/* 基本設定 */}
      <Paper sx={{ p: 3, mb: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">{t('common.title.basic')}</Typography>
          </Grid>
          
          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">{t('common.label.customer')}</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField 
                fullWidth 
                value={customer} 
                onChange={(e) => setCustomer(e.target.value)}
                placeholder={t('common.placeholder.enterName')}
              />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">{t('common.label.mode')}</Typography>
            </Grid>
            <Grid item xs={10}>
              <ModeSelector value={"auto"} onChange={setMode} />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">{t('common.label.powerMode')}</Typography>
            </Grid>
            <Grid item xs={10}>
              <PowerModeSelector value={"hibernation"} onChange={setPowerMode} />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">{t('common.label.timeZone')}</Typography>
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

      {/* 單機操作設定/播放圖片設定 */}
      <Paper sx={{ p: 3, mb: 2 }} id="auto-section">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {mode === 'auto' ? t('common.title.auto') : t('common.title.nasBinary')}
            </Typography>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">{t('common.label.size')}</Typography>
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
              <Typography align="right">{t('common.label.rotate')}</Typography>
            </Grid>
            <Grid item xs={10}>
              <RotateSelector value={rotate} onChange={setRotate} />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">{t('common.label.interval')}</Typography>
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
                {t('common.hint.intervalMin')}
              </HintText>
            </Grid>
          </Grid>

          <ImageSection 
            mode={mode}
            images={images}
            setImages={setImages}
            sx={{ mt: 0 }}
          />
        </Grid>
      </Paper>

      {/* CMS 控制設定 / NAS 設定 */}
      <Paper sx={{ p: 3, mb: 2 }} id="cms-section">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6">
              {mode === 'cms' && t('common.title.cms')}
              {mode === 'nas' && t('common.title.nas')}
            </Typography>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">{t('common.label.wifiSetting')}</Typography>
            </Grid>
            <Grid item xs={10}>
              <Select
                value={wifi}
                onChange={(e) => setWiFi(e.target.value as string)}
              >
                <MenuItem value="open">Open</MenuItem>
                <MenuItem value="wpa2Personal" selected>WPA2 personal</MenuItem>
                <MenuItem value="staticIP">Static IP</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">{t('common.label.ssid')}</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField 
                fullWidth 
                value={ssid} 
                onChange={(e) => setSSID(e.target.value)}
                placeholder={t('common.placeholder.ssid')}
              />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">{t('common.label.password')}</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField 
                fullWidth 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('common.placeholder.password')}
              />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">{t('common.label.ip')}</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField 
                fullWidth 
                value={ip} 
                onChange={(e) => setIP(e.target.value)}
                placeholder={t('common.placeholder.ip')}
              />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">{t('common.label.netmask')}</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField 
                fullWidth 
                value={netmask} 
                onChange={(e) => setNetmask(e.target.value)}
                placeholder={t('common.placeholder.netmask')}
              />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">{t('common.label.gateway')}</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField 
                fullWidth 
                value={gateway} 
                onChange={(e) => setGateway(e.target.value)}
                placeholder={t('common.placeholder.gateway')}
              />
            </Grid>
          </Grid>

          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">{t('common.label.dns')}</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField 
                fullWidth 
                value={dns} 
                onChange={(e) => setDNS(e.target.value)}
                placeholder={t('common.placeholder.dns')}
              />
            </Grid>
          </Grid>

          { mode === 'cms' && (
            <>
              <Grid item container alignItems="center" spacing={2}>
              <Grid item xs={2}>
                <Typography align="right">{t('common.label.serverURL')}</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField 
                  fullWidth 
                  value={serverURL} 
                  onChange={(e) => setServerURL(e.target.value)}
                  placeholder={t('common.placeholder.serverURL')}
                />
              </Grid>
            </Grid>
            </>
          )}

          { mode === 'nas' && (
            <>
              <Grid item container alignItems="center" spacing={2}>
              <Grid item xs={2}>
                <Typography align="right">{t('common.label.nasURL')}</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField 
                  fullWidth 
                  value={nasURL} 
                  onChange={(e) => setNasURL(e.target.value)}
                  placeholder={t('common.placeholder.nasURL')}
                />
              </Grid>
            </Grid>
            </>
          )}
        </Grid>
      </Paper>

      {/* SD 卡路徑 */}
      <Box sx={{ p: 1, mb: 2, backgroundColor: 'transparent' }}>
        <Grid item xs={12}>
          {t('common.label.sdCardPath')}
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
              {t('common.button.selectPath')}
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <HintMessage 
            type="error"
            message={t('common.hint.sdCardPathCheck')}
            containerSx={{ mt: 1 }}
            typographySx={{ color: theme.palette.text.primary }}
          />
        </Grid>
      </Box>

      {/* 產生設定檔案按鈕 */}
      <Box display="flex" alignItems="center" mb={2}>
        <CustomButton onClick={handleGenerateConfig}>
          {t('common.button.generateConfig')}
        </CustomButton>
      </Box>
    </Box>
  );
};

export default EPDConfigurationTool;
