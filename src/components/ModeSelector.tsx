// src/components/ModeSelector.tsx
import React from 'react';
import { Grid, Tooltip } from '@mui/material';
import SelectableButton from './common/SelectableButton';
import { ModeType } from '../types/common';
import { 
  AutoModeIcon, 
  CMSModeIcon, 
  NASModeIcon 
} from './icons/ModeIcons';
import { useTranslation } from 'react-i18next';

interface ModeSelectorProps {
  value: ModeType;
  onChange: (value: ModeType) => void;
  disabledModes?: ModeType[];  // 新增禁用模式的陣列
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ 
  value, 
  onChange, 
  disabledModes = [],  // 預設為空陣列
}) => {
  const { t } = useTranslation();
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <SelectableButton
          selected={value === 'auto'}
          onClick={() => onChange('auto')}
          icon={<AutoModeIcon />}
          description="直接於本機端進行圖片輪播。"
          disabled={disabledModes.includes('auto')}
        >
          單機操作 (離線模式)
        </SelectableButton>
      </Grid>
      
      <Grid item xs={4}>
        <SelectableButton
          selected={value === 'cms'}
          onClick={() => onChange('cms')}
          icon={<CMSModeIcon />}
          description="透過內容控制系統(CMS)來進行控制及換圖。"
          disabled={disabledModes.includes('cms')}
        >
          CMS控制 (連線模式)
        </SelectableButton>
      </Grid>
      
      <Grid item xs={4}>
        <Tooltip 
          title={t('common.tooltip.nasNotAvailable')}
          placement="top"
          arrow
        >
          <span>  {/* 使用 span 包裹是因為 Tooltip 不能直接包裹 disabled 的按鈕 */}
            <SelectableButton
              selected={value === 'nas'}
              onClick={() => onChange('nas')}
              icon={<NASModeIcon />}
              description="透過NAS進行換圖。"
              disabled={disabledModes.includes('nas')}  // NAS 按鈕會被禁用
            >
              NAS (連線模式)
            </SelectableButton>
          </span>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default ModeSelector;
