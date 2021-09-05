import { createApp } from 'vue'
import App from './App.vue'
import Element from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css';
import 'element-plus/packages/theme-chalk/src/base.scss'
import { initComponents } from '@/components/custom'
import { installTool } from '@/components/tool'

export const app = createApp(App).use(Element)
installTool(app)
initComponents(app)
app.mount('#app')

