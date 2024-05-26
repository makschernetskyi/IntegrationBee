import { createApp, App as VueApp } from 'vue';
import './style.css';
import { createPinia, Pinia } from 'pinia';
import PrimeVue from 'primevue/config';
import { router } from '@/router';
import App from './App.vue';
// @ts-expect-error
import Katex from 'vue-katex-auto-render';

// import Lara from '@/presets/lara';
// @ts-expect-error ts declarations not provided
import Aura from '@/presets/aura';

import ToastService from 'primevue/toastservice';

//theme for prime vue
// import 'primevue/resources/themes/aura-light-blue/theme.css';

const pinia: Pinia = createPinia();

const app: VueApp = createApp(App);

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
	unstyled: true,
	pt: Aura,
});
app.use(ToastService);
app.directive('katex', Katex);

app.mount('#app');
