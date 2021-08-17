
type Style = {
    [key in keyof CSSStyleDeclaration]?: any
}
type timingFunction = "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear"
type Layout = {
    width: number,
    height: number,
    top: number,
    left: number,
    rotate?: number
}
interface BaseComponent<P = any> {
    layout: Layout
    style: Style
    label: string,
    type: customComponent
    modelValue?: number | string | boolean
    props?: P,
    ref:any,
    icon?: string,
    animations:Array<Anima>
    children?: BaseComponent[]
}
interface Operation<S> {
    (state: S, payload?: any): void;
}
interface MutationOpiton<S> {
    [propName: string]: Operation<S>
}
interface Options<S> {
    state: S
    mutations: MutationOpiton<S>
    getters?: MutationOpiton<S>
}
interface Anima {
    name: string,
    duration: number,
    timingFunction: timingFunction
    delay: number,
}