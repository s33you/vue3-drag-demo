

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


