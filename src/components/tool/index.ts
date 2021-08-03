import Select from './Select.vue';
import Upload from './Upload.vue'
import { App } from "vue";
export const installTool = (app: App) => {
    app.component('Select', Select);
    app.component('Upload', Upload);
}