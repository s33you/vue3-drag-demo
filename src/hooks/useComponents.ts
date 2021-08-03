import { reactive } from "vue"
import { cloneDeep } from 'lodash'
import defalutImg from '@/assets/logo.png'
export const componentList: Array<BaseComponent> = [
    {
        type: 'el-button',
        style: {
            color: "red",
            fontSize: 19,
            lineHeight: 40,
            borderRadius: 10,
            textAlign: "center",
        },
        layout: {
            width: 100,
            height: 100,
            top: 30,
            left: 10,
            rotate: 0
        },
        label: '按钮',
        icon: 'thumb',
        props: {
            text: '按钮文字'
        }
    },
    {
        type: 'el-switch',
        style: {
            color: "red",
            fontSize: 19,
            lineHeight: 40,
            borderRadius: 10,
            textAlign: "center",
        },
        layout: {
            width: 100,
            height: 100,
            top: 30,
            left: 10,

        },
        icon: 'switch-button',
        label: '开关',
        modelValue: true,
        props: {
            activeColor: "#13ce66",
            inactiveColor: "#ff4949"
        },

    },
    {
        type: 'c-text',
        style: {
            color: "red",
            fontSize: 19,
            lineHeight: 40,
            borderRadius: 10,
            textAlign: "center",
        },
        layout: {
            width: 100,
            height: 100,
            top: 30,
            left: 10,
            rotate: 0
        },
        label: '文本',
        icon: 'document',
        props: {
            text: '文本文字'
        }
    },
    {
        type: 'c-img',
        style: {
            color: "red",
            fontSize: 19,
            lineHeight: 40,
            borderRadius: 10,
            textAlign: "center",
            backgroundImage:`url('${defalutImg}')`
        },
        layout: {
            width: 100,
            height: 100,
            top: 30,
            left: 10,
            rotate: 0
        },
        label: '图文',
        icon: 'document',
        props: {
            text: '文本文字'
        }
    }
]
type State = {
    components: Array<BaseComponent>,
    currentComponent: BaseComponent | null
    context: { width: number, height: number }
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
            // console.log('mutation:' + type)
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
        this.setCurrentComponent(state, state.components[state.components.length - 1])
    },
    setCurrentComponent(state: State, component: BaseComponent) {
        state.currentComponent = component
    },
    setLayout({ currentComponent }: State, { top, left, width, height, rotate }: Layout) {
        if (currentComponent) {
            top != undefined && (currentComponent.layout.top = top)
            left != undefined && (currentComponent.layout.left = left)
            width != undefined && (currentComponent.layout.width = width)
            height != undefined && (currentComponent.layout.height = height)
            rotate != undefined && (currentComponent.layout.rotate = rotate)
        }
    },
}
const state: State = {
    components: [],
    currentComponent: null,
    context: {
        width: 375,// 屏幕宽度,
        height: 720
    }
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