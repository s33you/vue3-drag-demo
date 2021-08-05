import { reactive } from "vue"
import { cloneDeep, remove } from 'lodash'

type State = {
    components: Array<BaseComponent>,
    currentComponent: BaseComponent | null
    context: { width: number, height: number }
    menuLayout: { top: number, left: number, show: boolean }
    cloneSource: BaseComponent | null
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
    showContextMenu(state: State, { top, left }: Layout) {
        state.menuLayout.top = top
        state.menuLayout.left = left
        state.menuLayout.show = true
    },
    hideContextMenu(state: State) {
        state.menuLayout.show = false
    },
    copy(state: State) {
        state.cloneSource = cloneDeep(state.currentComponent)
    },
    remove(state: State) {
        state.components.find((component, index) => {
            if (component == state.currentComponent) {
                state.components.splice(index, 1)
            }
        })
    },
    paste(state: State) {
        if (state.cloneSource) {
            state.cloneSource.layout.top = state.menuLayout.top
            state.cloneSource.layout.left = state.menuLayout.left
            store.commit('addComponent', state.cloneSource)
        }
    }
}
const state: State = {
    components: [],
    currentComponent: null,
    context: {
        width: 375,// 屏幕宽度,
        height: 720
    },
    menuLayout: {
        top: 0,
        left: 0,
        show: false
    },
    cloneSource: null
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