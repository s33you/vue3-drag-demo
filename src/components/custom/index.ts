import { App } from "vue";
import cImg from '@custom/c-img.vue'
import cButton from '@custom/c-button.vue'
export const installComponent = (app: App) => {
    app.component('c-img', cImg);
    app.component('c-button', cButton);
}