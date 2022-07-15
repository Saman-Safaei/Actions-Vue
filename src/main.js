import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import Validators from './plugins/vee_rules';
import i18n from './i18n';

import './assets/fonts.scss';
import './assets/tailwind.scss';
import 'swiper/css';

const app = createApp(App);

app.use(i18n);
app.use(createPinia());
app.use(router);
app.use(Validators);

app.mount('#app');
