// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { detectLanguage } from './utils/languageDetector';

// 導入翻譯文件
import zhTW from './locales/zh-TW/translation.json';
import enUS from './locales/en-US/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      'zh-TW': {
        translation: zhTW,
      },
      'en-US': {
        translation: enUS,
      },
    },
    lng: detectLanguage(),     // 使用語言檢測
    fallbackLng: 'en-US',      // 備用語言
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
