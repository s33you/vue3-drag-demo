
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import {version} from './src/components/custom'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    build:{
        lib:{
            name:"lotdrag",
            entry:path.resolve(__dirname,'src/components/custom/index.ts'),
        },
        rollupOptions:{
          
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
            '@custom': resolve(__dirname, 'src/components/custom') // 设置 `@` 指向 `src` 目录
        }
    },
})
