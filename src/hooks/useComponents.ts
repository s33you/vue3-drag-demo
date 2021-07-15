import { reactive, readonly } from "vue"

export const componentList: Array<BaseComponent> = [
    {
        type: 'el-button',
        style: {},
        layout: {
            width: 100,
            height: 100,
            top: 10,
            left: 10
        },
        label: '按钮',
        text: '按钮文字'
    },
    {
        type: 'el-switch',
        style: {
            color: "red",
            fontSize: 19
        },
        layout: {
            width: 100,
            height: 100,
            top: 10,
            left: 10
        },
        label: '开关',
        text: '按钮文字',
        modelValue:true,
       
    },
    {
        type: 'c-text',
        style: {
            color: "red",
            fontSize: 19
        },
        layout: {
            width: 100,
            height: 100,
            top: 10,
            left: 10
        },
        label: '文本',
        modelValue: '文本文字',
        props: {
            activeColor: "#13ce66",
            inactiveColor: "#ff4949"
        }
    }
]
type State = {
    components: Array<BaseComponent>
}
type MutationType = keyof (typeof mutations)
export class ComponentsStore {

    state: State
    readonly mutations: MutationOpiton<State>
    readonly getters?: MutationOpiton<State>
    constructor(options: Options<State>) {
        this.state = reactive(options.state)
        this.mutations = options.mutations
        this.getters = options.getters
    }
    public commit(type: MutationType, payload?: any) {
        if (this.mutations[type]) {
            this.mutations[type](this.state, payload)
            console.log('mutation:' + type)
        }
        else {
            throw new Error('this is no type of ' + type + 'in mutations')
        }
    }

}
const mutations = {
    addComponent(state: State, component: BaseComponent) {
        state.components.push(Object.assign({}, component))
    },
}
const state: State = {
    components: []
}
export const store = new ComponentsStore({
    state,
    mutations
})