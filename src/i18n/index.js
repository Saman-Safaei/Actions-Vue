import { createI18n } from 'vue-i18n';
import fa from './fa';
import en from './en';

export default createI18n({
  legacy: false,
  locale: 'fa',
  fallbackLocale: 'en',
  messages: { en, fa },
});
