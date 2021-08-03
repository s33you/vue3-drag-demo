import { createApp } from 'vue'
import App from './App.vue'
import Element from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/packages/theme-chalk/src/base.scss'
import { installComponent } from '@/utils/registerComponents'
import { installTool } from '@/components/tool'
const app = createApp(App).use(Element)
installComponent(app)
installTool(app)
app.mount('#app')

