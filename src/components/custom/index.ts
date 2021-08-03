import { App } from "vue";
import cText from '@custom/c-text.vue'
import cImg from '@custom/c-img.vue'
export const installComponent = (app: App) => {
    app.component('c-text', cText);
    app.component('c-img', cImg);
}