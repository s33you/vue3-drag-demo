import { reactive, readonly } from "vue"

export const componentList: Array<BaseComponent> = [
    {
        type: 'el-button',
        style: {},
        layout: {
            width: 100,
            height: 100,
            top: 0,
            left: 0
        },
        label: '按钮',
        componentValue: '按钮文字'
    },
    {
        type: 'el-button',
        style: {
            color:"red",
            fontSize:19
        },
        layout: {
            width: 100,
            height: 100,
            top: 0,
            left: 0
        },
        label: '按钮',
        componentValue: '按钮文字'
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
    public commit(type:MutationType,payload?:any){
        if (this.mutations[type]){
            this.mutations[type](this.state,payload)
            console.log('mutation:' + type)
        } 
        else{
            throw new Error('this is no type of ' + type + 'in mutations')
        }
    }
    
}
const mutations = {
    addComponent(state:State,component:BaseComponent) {
        state.components.push(component)
    },
}
const state:State = {
    components:[]
}
export const store = new ComponentsStore({
    state,
    mutations
})