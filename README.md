

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
```javascript
props:{
    options:{
        direction:'all'|'vertical'|'horizon' //可拖动方向，默认all
        editable:false| true //默认true
        dragable:false| true //默认true
    }
    element:{} // 元素信息本身
    layout:{} //布局
    style:{} //样式
    active:false|true,
    modelValue:string|number // 绑定值
    text:"" 文字
    props:{

    }//额外的属性
}
provide{
    'container':layout
}
//用于嵌套的情况下传入父级容器数据 container 定位
inject:[
    'container'
]
```