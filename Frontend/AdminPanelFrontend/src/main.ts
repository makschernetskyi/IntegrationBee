import { createApp, App as VueApp } from 'vue';
import './style.css';
import { createPinia, Pinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { router } from '@/router';
import App from './App.vue';
// @ts-expect-error ts declarations not provided
import Lara from '@/presets/lara';

//theme for prime vue
import 'primevue/resources/themes/lara-light-blue/theme.css';

const pinia: Pinia = createPinia();

const app: VueApp = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
	unstyled: false,
	pt: Lara,
});

app.mount('#app');
