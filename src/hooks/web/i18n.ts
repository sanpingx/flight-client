// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 引入翻译文件
import en from '@@/locales/en.ts';
import zh from '@@/locales/zh-CN.ts';

i18n
  .use(initReactI18next) // 绑定 react-i18next
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh }
    },
    lng: 'en', // 默认语言
    fallbackLng: 'en', // 当无法找到对应语言时，回退到此语言
    interpolation: {
      escapeValue: false // React 已经处理了 HTML 转义
    }
  });

export default i18n;
