// src/utils/languageDetector.ts
import Cookies from 'js-cookie';

export type SupportedLanguage = 'zh-TW' | 'en-US';

// 取得瀏覽器語言
const getBrowserLanguage = (): string => {
  return navigator.language || (navigator as any).userLanguage;
};

// 轉換 CMS cookie 語言格式為我們的格式
const convertCmsLangFormat = (cmsLang: string): SupportedLanguage => {
  switch (cmsLang) {
    case 'zh_TW':
      return 'zh-TW';
    case 'en_US':
      return 'en-US';
    default:
      return 'en-US';
  }
};

// 主要的語言偵測函數
export const detectLanguage = (): SupportedLanguage => {
  // 1. 檢查 CMS cookie
  const cmsLang = Cookies.get('cms_lang');
  if (cmsLang) {
    return convertCmsLangFormat(cmsLang);
  }

  // 2. 檢查瀏覽器語言
  const browserLang = getBrowserLanguage();
  if (browserLang) {
    // 轉換瀏覽器語言格式
    const normalizedLang = browserLang.toLowerCase().replace('_', '-');
    if (normalizedLang === 'zh-tw') return 'zh-TW';
    if (normalizedLang.startsWith('en')) return 'en-US';
  }

  // 3. 預設使用 en-US
  return 'en-US';
};
