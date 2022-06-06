import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from "vue-i18n";

import App from './App.vue';
import router from './router';
import Validators from './plugins/vee_rules';
import i18n from "./i18n";

import "./assets/tailwind.scss";

const app = createApp(App);

app.use(createI18n({ legacy: false, locale: "fa", fallbackLocale: "en", messages: i18n }));
app.use(createPinia());
app.use(router);
app.use(Validators);

app.mount('#app');
