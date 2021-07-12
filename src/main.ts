import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/lib/theme-chalk/index.css';
import {installComponent} from '@/uitls/registerComponents'
const app = createApp(App)
installComponent(app)
app.mount('#app')

