
type customComponent  = 'c-button'| 'c-text'|'el-button'
interface BaseComponent{
    layout:{
        width:number,
        height:number,
        top:number,
        left:number,
    }
    style:{
        [key in keyof CSSStyleDeclaration]?:any
    },
    label:string,
    type:customComponent
    componentValue:number|string
}
interface Operation<S>{
    (state:S,payload?:any): void;
}
interface MutationOpiton<S>{
        [propName: string]: Operation<S>
}
interface Options <S>{
    state: S
    mutations:MutationOpiton<S>
    getters?: MutationOpiton<S>
}
