import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'

import {router} from "./router"

//animation on scroll
import aos from './plugins/aos.ts'

//masonry for tiles in news page
import MasonryWall from '@yeger/vue-masonry-wall'

// Vidstack custom elements
import { defineCustomElements } from 'vidstack/elements';
defineCustomElements();



//set up pinia store manager
const pinia = createPinia();
const app = createApp(App)
app.use(pinia)

//vue router configuration

app.use(router)

//animation on scroll
app.use(aos)

//masonry tiles for news
app.use(MasonryWall)

app.mount('#app')
