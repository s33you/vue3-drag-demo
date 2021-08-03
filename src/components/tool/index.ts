import Select from './Select.vue';
import { App } from "vue";
export const installTool = (app: App) => {
    app.component('Select', Select);
}