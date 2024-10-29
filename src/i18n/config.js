// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// 導入翻譯文件
import zhTW from '../locales/zh-TW/translation.json';
import enUS from '../locales/en-US/translation.json';
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
    lng: 'zh-TW', // 默認語言
    fallbackLng: 'en-US', // 備用語言
    interpolation: {
        escapeValue: false,
    },
});
export default i18n;
