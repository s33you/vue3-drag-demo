
type customComponent  = string | 'c-button'| 'c-text'|'el-button'|'el-select' 
type Style = {
    [key in keyof CSSStyleDeclaration]?: any
}
type Layout = {
    width: number,
    height: number,
    top: number,
    left: number,
}
interface BaseComponent<P=any>{
    layout:Layout
    style:Style
    label:string,
    type:customComponent
    componentValue?:number|string,
    modelValue?:number|string|boolean
    props?:P
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
