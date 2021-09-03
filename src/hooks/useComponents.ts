import { nextTick, reactive, ref } from "vue"
import { clone, cloneDeep, remove } from 'lodash'
import { ElMessage } from 'element-plus'
import { swapIndex } from "@/utils/tools"
import { componentList } from "@/components/custom"
type State = {
    components: Array<BaseComponent>,
    currentComponent: BaseComponent | null
    currentComponentEl: HTMLElement | any,
    context: { width: number, height: number }
    menuLayout: { top: number, left: number, show: boolean }
    cloneSource: BaseComponent | null
    currentIndex: number
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
            // console.log(payload)
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
        let index = state.components.length - 1
        this.setCurrentComponent(state, {  index })
    },
    setCurrentComponent(state: State, {  index }: { index: number | null }) {
        if (state.currentComponent != null) {
            state.currentComponent.active = false
        }
        if (index != null) {
            state.currentIndex = index
            state.currentComponent = state.components[index]
            state.currentComponent.active = true;
            return 
        }  
        state.currentComponent = null
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
    },
    moveToTop(state: State) {
        let length = state.components.length
        if (state.currentIndex < length - 1) {
            swapIndex(state.components, state.currentIndex, length - 1)
        }
        else {
            ElMessage({
                message: '到顶了',
                type: 'warning'
            })
        }
    },
    moveToBottom(state: State) {
        if (state.currentIndex > 0) {
            swapIndex(state.components, state.currentIndex, 0)
        }
        else {
            ElMessage({
                message: '到底了',
                type: 'warning'
            })
        }
    },
    toTop(state: State) {
        let length = state.components.length
        if (state.currentIndex < length - 1 && state.currentIndex + 1 < length) {
            swapIndex(state.components, state.currentIndex, state.currentIndex + 1)
        }
        else {
            ElMessage({
                message: '到顶了',
                type: 'warning'
            })
        }
    },
    toBottom(state: State) {
        let length = state.components.length
        if (state.currentIndex < length && state.currentIndex > 0) {
            swapIndex(state.components, state.currentIndex, state.currentIndex - 1)
        }
        else {
            ElMessage({
                message: '到底了',
                type: 'warning'
            })
        }
    }
}
const state: State = {
    components: new Array(500).fill(0).map(()=>{
        return cloneDeep({
            active: false,
            type: "c-button",
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
                rotate: 0,
            },
            label: "按钮",
            icon: "thumb",
            props: {
                text: "按钮文字",
            },
            ref: ref({}),
            animations: []
        })
    }),
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
    currentIndex: 0,
    cloneSource: null,
    currentComponentEl: null
}
const getters = {
    // isActiveComponent(state: State) {
    //     // return (index: number) => { return state.currentIndex === index }
    // }
}
export const store = new ComponentsStore({
    state,
    mutations,
    getters
})