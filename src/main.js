import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import router from './router'
import './assets/main.css'
export const app = createApp(App)
app.use().use(ElementPlus).use(router).mount('#app')
