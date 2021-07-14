import { App } from "vue";
import cText from '@custom/c-text.vue'
export const  installComponent= (app:App)=>{
    app.component('c-text',cText);
}