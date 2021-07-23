

# 基于Vue3的可拖拽式页面配置的复盘  
  

## 动机

1. 项目中基于vue2,没有用vuex,自己写了个eventBus 迭代修改十分不友好
2. 结合Vue3的compositionApi 可以丢弃vuex
3. 复盘项目，重新调整组件，数据的结构


## 设计

### 画布

画布这一块不从视图上去过多分析了，渲染方式主要是通过遍历元素数组 elementArr 去渲染对应的元素，全局使用compositionApi去管理数据流向,舍弃了vuex,因为compositionApi足够强大,渲染是用jsx去做渲染,因为vue3对jsx的支持也更加nice了
```javascript
    setup(){
        ...
        return {elementArr,...}
    }
    render(){
       return  elementArr.map(element=>{

       })
    }
```

### 基础组件

**功能设计**

1. 可拖拽，可配置能拖拽的方向和缩放的维度
2. 具有层级，能够嵌套渲染
3. 提供丰富的可配置项，是否可编辑，可拖拽等等

**数据设计**  
```typescript
type customComponent = 'c-button' | 'c-text' | 'el-button' | 'el-select' |'el-switch'
type Style = {
    [key in keyof CSSStyleDeclaration]?: any
}
//元素布局信息
type Layout = {
    width: number,
    height: number,
    top: number,
    left: number,
    rotate?: number
}
interface BaseComponent<P=any>{
    layout:Layout
    style:Style
    label:string,
    type:customComponent //根据类型去渲染
    modelValue?:number|string|boolean
    text?:string
    props?:P //额外的props
    icon?:string
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
```