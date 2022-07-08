import { computed } from "vue";
import { useI18n } from "vue-i18n";

export function useLocale() {
  const { locale, availableLocales, t } = useI18n({ useScope: "global" });

  function switchLang() {
    if (locale.value === "en") locale.value = "fa";
    else locale.value = "en";
  }

  const direction = computed(() => (locale.value === "fa" ? "rtl" : "ltr"));

  return { locale, availableLocales, switchLang, direction, t };
}
