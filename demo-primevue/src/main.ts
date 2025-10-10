import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'

import { FancyCrud } from '@fancy-crud/vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

import fancyConfig from './plugins/fancy-crud'

import App from './App.vue'
import './styles/main.sass'

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)

app.use(FancyCrud, fancyConfig)

app.mount('#app')


