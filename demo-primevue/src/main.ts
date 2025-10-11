import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import { FancyCrud } from '@fancy-crud/vue'
import fancyConfig from './plugins/fancy-crud'

import 'primeicons/primeicons.css'
import './main.css'

import '@fancy-crud/wrapper-primevue/dist/fancy-crud-wrapper-primevue.css'

const app = createApp(App);

app.use(FancyCrud, fancyConfig)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: 'dark',
            // cssLayer: {
            //     name: 'primevue',
            //     order: 'base, theme, primevue'
            // }
        }
    }
});


app.mount('#app')


