// src/utils/networkValidators.ts
// 型別定義
export type ValidatableField = 'wifi' | 'ssid' | 'password' | 'ip' | 'netmask' | 'gateway' | 'dns' | 'serverURL';
type TranslationFunction = (key: string, options?: Record<string, unknown>) => string;

// 正則表達式定義
const VALIDATORS = {
  IP_REGEX: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
  NETMASK_REGEX: /^(255\.){3}[0-9]{1,3}$|^(255\.){2}[0-9]{1,3}\.0$|^255\.[0-9]{1,3}\.0\.0$|^[0-9]{1,3}\.0\.0\.0$/,
  SSID_REGEX: /^[A-Za-z0-9][\w\-\.]*([\w\-\.]*[A-Za-z0-9])?$/,
  WIFI_PASSWORD_REGEX: /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{8,63}$/,
  SERVER_URL_REGEX: {
    NAS: /^(smb|nfs|ftp|http|https):\/\/[\w-.]+(:\d+)?(\/[\w-./]*)?$/,
    CMS: /^https?:\/\/.+/
  }
};

// 輔助函數：檢查 IP 是否在同一個子網段
export function isInSameSubnet(ip1: string, ip2: string, netmask: string): boolean {
  const ip1Parts = ip1.split('.').map(Number);
  const ip2Parts = ip2.split('.').map(Number);
  const maskParts = netmask.split('.').map(Number);

  for (let i = 0; i < 4; i++) {
    if ((ip1Parts[i] & maskParts[i]) !== (ip2Parts[i] & maskParts[i])) {
      return false;
    }
  }
  return true;
}

// 單一欄位驗證函數
export function validateField(
  t: TranslationFunction,
  field: ValidatableField,
  value: string,
  config?: Record<string, string>,
  mode?: 'cms' | 'nas'
): string {
  switch (field) {
    case 'wifi':
      return value ? '' : t('network.error.wifi.required');
      
    case 'ssid':
      if (!value) {
        return t('network.error.ssid.required');
      }
      if (value.length > 32) {
        return t('network.error.ssid.tooLong');
      }
      return VALIDATORS.SSID_REGEX.test(value) ? '' : t('network.error.ssid.invalid');
      
    case 'password':
      if (!value) return t('network.error.password.required');
      return VALIDATORS.WIFI_PASSWORD_REGEX.test(value) ? '' : t('network.error.password.invalid');
      
    case 'ip':
      if (!value) return t('network.error.ip.required');
      return VALIDATORS.IP_REGEX.test(value) ? '' : t('network.error.ip.invalid');
      
    case 'netmask':
      if (!value) return t('network.error.netmask.required');
      return VALIDATORS.NETMASK_REGEX.test(value) ? '' : t('network.error.netmask.invalid');
      
    case 'gateway':
      if (!value) return t('network.error.gateway.required');
      if (!VALIDATORS.IP_REGEX.test(value)) return t('network.error.gateway.invalid');
      if (config?.ip && config?.netmask && 
          !isInSameSubnet(value, config.ip, config.netmask)) {
        return t('network.error.gateway.subnet');
      }
      return '';
      
    case 'dns':
      if (!value) return t('network.error.dns.required');
      return VALIDATORS.IP_REGEX.test(value) ? '' : t('network.error.dns.invalid');
      
    case 'serverURL':
      if (!value) {
        return t(`common.error.serverURL.required.${mode}`);
      }
      
      if (mode === 'nas') {
        return VALIDATORS.SERVER_URL_REGEX.NAS.test(value) 
          ? '' 
          : t('common.error.serverURL.invalid.nas');
      }
      
      return VALIDATORS.SERVER_URL_REGEX.CMS.test(value)
        ? ''
        : t('common.error.serverURL.invalid.cms');
      
    default:
      return '';
  }
}

// 完整網路設定驗證函數
export function validateNetworkSettings(
  t: TranslationFunction,
  mode: 'cms' | 'nas',
  config: {
    wifi: string;
    ssid: string;
    password: string;
    ip?: string;
    netmask?: string;
    gateway?: string;
    dns?: string;
  },
  serverURL?: string
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // 基本檢查
  const fields: ValidatableField[] = ['wifi', 'ssid'];
  
  // 根據 wifi 模式添加需要檢查的欄位
  if (['wpa2Personal', 'staticIP'].includes(config.wifi)) {
    fields.push('password');
  }
  
  if (config.wifi === 'staticIP') {
    fields.push('ip', 'netmask', 'gateway', 'dns');
  }
  
  // 在 CMS 和 NAS 模式都檢查 serverURL
  fields.push('serverURL');

  // 執行所有欄位的驗證
  for (const field of fields) {
    const value = field === 'serverURL' ? (serverURL || '') : (config[field] || '');
    const error = validateField(t, field, value, config, mode);
    if (error) {
      errors[field] = error;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
