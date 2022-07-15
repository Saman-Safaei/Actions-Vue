import { defineRule, configure } from 'vee-validate';
import { min, email, required } from '@vee-validate/rules';
import i18n from '../i18n';

export default {
  install() {
    const { locale, t } = i18n.global;

    function messages(context) {
      return {
        fa: {
          required: `فیلد ${t('texts.' + context.field)} اجباری است.`,
          min: `تعداد کاراکتر های وارد شده در ${context.field} کمتر از ${context.rule.params[0]} تا است.`,
          email: `ایمیل وارد شده معتبر نیست‍‍‍`,
        },
        en: {
          required: `The ${context.field} field is required.`,
          min: `Minimum length of the ${context.field} field is ${context.rule.params[0]}`,
          email: `Enter a valid email.`,
        },
      };
    }

    defineRule('required', required);
    defineRule('min', min);
    defineRule('email', email);

    configure({
      generateMessage: context => {
        return messages(context)[locale.value][context.rule.name];
      },
    });
  },
};
