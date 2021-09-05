import { App } from "vue";
import cImg from '@custom/c-img.vue'
import cButton from '@custom/c-button.vue'
import cInput from '@custom/c-input.vue'
import { cloneDeep } from "lodash";



const componentPlugins = [cImg, cButton,cInput];

export const componentList: Array<BaseComponent> = [
]
export const installComponent = (app: App, component: any) => {
    app.component(component.name, component)
    componentList.push(cloneDeep(component.config))
}
export const version:string = "1.0.0"
export const initComponents = (app: App) => {
    componentPlugins.forEach(component => {
        installComponent(app, component)
    })
}


