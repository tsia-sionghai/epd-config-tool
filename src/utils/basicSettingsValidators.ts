// src/utils/basicSettingsValidators.ts
type TranslationFunction = (key: string, options?: Record<string, unknown>) => string;

export type BasicSettingsField = 'customer' | 'serverSyncInterval';

// 驗證規則
const VALIDATORS = {
  CUSTOMER_REGEX: /^[A-Za-z0-9_-]+$/,
  SERVER_SYNC_INTERVAL: {
    MIN: 5,
    MAX: 1440
  }
};

// 驗證 serverSyncInterval 的輔助函數
function validateServerSyncInterval(
  value: string,
  t: TranslationFunction
): string {
  if (!value) {
    return t('common.error.serverSyncInterval.required');
  }

  const interval = parseInt(value, 10);
  
  if (isNaN(interval)) {
    return t('common.error.serverSyncInterval.invalid');
  }

  if (interval < VALIDATORS.SERVER_SYNC_INTERVAL.MIN) {
    return t('common.error.serverSyncInterval.tooSmall', {
      min: VALIDATORS.SERVER_SYNC_INTERVAL.MIN
    });
  }

  if (interval > VALIDATORS.SERVER_SYNC_INTERVAL.MAX) {
    return t('common.error.serverSyncInterval.tooLarge', {
      max: VALIDATORS.SERVER_SYNC_INTERVAL.MAX
    });
  }

  return '';
}

// 驗證 customer 的輔助函數
function validateCustomer(
  value: string,
  t: TranslationFunction
): string {
  if (!value.trim()) {
    return t('common.error.customer.required');
  }
  // 如果有其他 Customer 驗證規則...
  return '';
}

// 單一欄位驗證函數
export function validateBasicField(
  t: TranslationFunction,
  field: BasicSettingsField,
  value: string
): string {
  switch (field) {
    case 'customer':
      return validateCustomer(value, t);
      
    case 'serverSyncInterval':
      return validateServerSyncInterval(value, t);
      
    default:
      return '';
  }
}

// 整體設定驗證函數
export function validateBasicSettings(
  t: TranslationFunction,
  settings: {
    customer: string;
    serverSyncInterval?: string;
  },
  mode: 'cms' | 'nas'
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Customer 永遠需要驗證
  const customerError = validateBasicField(t, 'customer', settings.customer);
  if (customerError) {
    errors.customer = customerError;
  }

  // 只在 CMS 和 NAS 模式下驗證 serverSyncInterval
  if (['cms', 'nas'].includes(mode) && settings.serverSyncInterval !== undefined) {
    const intervalError = validateBasicField(t, 'serverSyncInterval', settings.serverSyncInterval);
    if (intervalError) {
      errors.serverSyncInterval = intervalError;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
