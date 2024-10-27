// src/components/NetworkSettings.tsx
import React, { useState } from 'react';
import { Grid, Paper, Typography, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ModeType, NetworkConfig } from '../types/common';
import WifiSelector from './WifiSelector';

interface NetworkSettingsProps {
  mode: ModeType;
  config: NetworkConfig;
  onConfigChange: (config: Partial<NetworkConfig>) => void;
  serverURL?: string;
  setServerURL?: (url: string) => void;
  nasURL?: string;
  setNasURL?: (url: string) => void;
}

const NetworkSettings: React.FC<NetworkSettingsProps> = ({
  mode,
  config,
  onConfigChange,
  serverURL,
  setServerURL,
  nasURL,
  setNasURL,
}) => {
  const { t } = useTranslation();
  const [ssid, setSSID] = useState('');
  const [password, setPassword] = useState('');
  const [ip, setIP] = useState('');
  const [netmask, setNetmask] = useState('');
  const [gateway, setGateway] = useState('');
  const [dns, setDNS] = useState('');

  if (mode === 'auto') return null;

  return (
    <Paper sx={{ p: 3, mb: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">
            {mode === 'cms' ? t('common.title.cms') : t('common.title.nas')}
          </Typography>
        </Grid>

        <Grid item container alignItems="center" spacing={2}>
          <Grid item xs={2}>
            <Typography align="right">{t('common.label.wifiSetting')}</Typography>
          </Grid>
          <Grid item xs={10}>
            <WifiSelector
              value={config.wifi}
              onChange={(value) => onConfigChange({ wifi: value })}
            />
          </Grid>
        </Grid>

        {/* Network settings fields */}
        <Grid item container alignItems="center" spacing={2}>
          <Grid item xs={2}>
            <Typography align="right">{t('common.label.ssid')}</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField 
              variant="outlined"
              fullWidth={true} 
              value={ssid} 
              onChange={(e) => setSSID(e.target.value)}
              placeholder={t('common.placeholder.ssid')}
            />
          </Grid>
        </Grid>

        {(config.wifi === 'wpa2Personal' || config.wifi === 'staticIP') && (
          <>
            <Grid item container alignItems="center" spacing={2}>
              <Grid item xs={2}>
                <Typography align="right">{t('common.label.password')}</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField 
                  variant="outlined"
                  fullWidth={true}  
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('common.placeholder.password')}
                />
              </Grid>
            </Grid>
          </>
        )}

        {config.wifi === 'staticIP' && (
          <>
            <Grid item container alignItems="center" spacing={2}>
              <Grid item xs={2}>
                <Typography align="right">{t('common.label.ip')}</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField 
                  variant="outlined"
                  fullWidth={true}  
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
                  variant="outlined"
                  fullWidth={true}  
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
                  variant="outlined"
                  fullWidth={true}  
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
                  variant="outlined"
                  fullWidth={true}  
                  value={dns} 
                  onChange={(e) => setDNS(e.target.value)}
                  placeholder={t('common.placeholder.dns')}
                />
              </Grid>
            </Grid>
          </>
        )}

        {mode === 'cms' && serverURL !== undefined && setServerURL && (
          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">{t('common.label.serverURL')}</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                variant="outlined"
                fullWidth={true} 
                value={serverURL}
                onChange={(e) => setServerURL(e.target.value)}
                placeholder={t('common.placeholder.serverURL')}
              />
            </Grid>
          </Grid>
        )}

        {mode === 'nas' && nasURL !== undefined && setNasURL && (
          <Grid item container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <Typography align="right">{t('common.label.nasURL')}</Typography>
            </Grid>
            <Grid item xs={10}>
              <TextField
                variant="outlined"
                fullWidth={true} 
                value={nasURL}
                onChange={(e) => setNasURL(e.target.value)}
                placeholder={t('common.placeholder.nasURL')}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default NetworkSettings;
