import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import Validators from './plugins/vee_rules';

import "./assets/tailwind.scss";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Validators);

app.mount('#app');
