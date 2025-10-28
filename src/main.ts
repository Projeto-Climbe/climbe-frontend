import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './assets/theme.css'
import './assets/fixes.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
