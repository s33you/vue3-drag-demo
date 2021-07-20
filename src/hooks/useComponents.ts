import { reactive, readonly } from "vue"
import {cloneDeep} from 'lodash'
export const componentList: Array<BaseComponent> = [
    {
        type: 'el-button',
        style: {},
        layout: {
            width: 100,
            height: 100,
            top: 10,
            left: 10,
            rotate:0
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
        modelValue: true,

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
            left: 10,
            rotate: 0
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
    components: Array<BaseComponent>,
    currentComponent: BaseComponent | null
}
type MutationType = keyof (typeof mutations)
type GettersKeys = keyof (typeof getters)
type Getters = {
    [key in GettersKeys]: any
}
export class ComponentsStore {

    state: State
    readonly mutations: MutationOpiton<State>
    readonly privateGetters: MutationOpiton<State> = {}
    readonly getters: Getters | {
        [prpoName: string]: any
    } = {}
    constructor(options: Options<State>) {
        this.state = reactive(options.state)
        this.mutations = options.mutations
        if (options.getters) {
            this.privateGetters = options.getters
            Object.keys(this.privateGetters).forEach(key => {
                Object.defineProperty(this.getters, key, {
                    get: () => {
                        return this.privateGetters[key](this.state)
                    }
                })
            })
        }
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
        //生产环境的DeepClone 还是选择 lodash
        state.components.push(cloneDeep(component))
    },
    setCurrentComponent(state: State, component: BaseComponent) {
        state.currentComponent = component
    },
    setLayout({ currentComponent }: State, { top, left, width, height, rotate }: Layout) {
        if (currentComponent) {
            if (top) currentComponent.layout.top = top
            if (left) currentComponent.layout.left = left
            if (width) currentComponent.layout.width = width
            if (height) currentComponent.layout.height = height
            if (rotate) currentComponent.layout.rotate = rotate
        }
    },
}
const state: State = {
    components: [],
    currentComponent: null
}
const getters = {
    isActiveComponent(state: State) {
        return (component: BaseComponent) => { return state.currentComponent === component }
    }
}
export const store = new ComponentsStore({
    state,
    mutations,
    getters
})