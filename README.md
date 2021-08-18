# 基于 Vue3 的可拖拽式页面配置的复盘

## 动机

1. 项目中基于 vue2,没有用 vuex,自己写了个 eventBus 迭代修改十分不友好
2. 结合 Vue3 的 compositionApi 可以丢弃 vuex
3. 复盘项目，重新调整组件，数据的结构

## 设计

### 画布

画布这一块不从视图上去过多分析了，渲染方式主要是通过遍历元素数组 elementArr 去渲染对应的元素，全局使用 compositionApi 去管理数据流向,舍弃了 vuex,因为 compositionApi 足够强大,渲染是用 jsx 去做渲染,因为 vue3 对 jsx 的支持也更加 nice 了

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

**部分原理**

### 旋转:

通过 MouseEvent 拿到 鼠标位置,通过 HTMLElement.getBoundingClientRect 方法获取元素中心位置  
利用 Math.atan2 计算鼠标位置到中心位置与水平方向的夹角
由于是求差值，所以和哪个轴的角度都无所谓了
`atan2() `返回从原点(0,0) 到 (x,y) 点的线段与 x 轴正方向之间的平面角度(弧度值)，也就是 `Math.atan2(y,x)`。

### 拖拽:

组件列表到画布,`dragstart` 当用户开始拖动元素或选择文本时触发此事件。监听此事件，获取被拖拽的组件信息

```javascript
e.dataTransfer.setData("index", e.target.dataset.index);
//这里利用 index 去查找被拖拽的组件
```

### 画布监听 dragover 和 drop 事件

```javascript
  const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      let index = e.dataTransfer!.getData("index");
      //判定是否是从组件列表拖拽而来
      if (index) {
        store.commit("addComponent", componentList[Number(index)]);
      }
    };
    const context = store.state.context;
    //拖拽结束事件
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.dataTransfer!.dropEffect = "move";
    };

```

顺便提一下 dragEvent

```javascript
DataTransfer.dropEffect
//获取当前选定的拖放操作类型或者设置的为一个新的类型。值必须为  none, copy, link 或 move。
DataTransfer.effectAllowed
//提供所有可用的操作类型。必须是  none, copy, copyLink, copyMove, link, linkMove, move, all or uninitialized 之一。
DataTransfer.files
//包含数据传输中可用的所有本地文件的列表。如果拖动操作不涉及拖动文件，则此属性为空列表。
DataTransfer.items 只读
//提供一个包含所有拖动数据列表的 DataTransferItemList 对象。
DataTransfer.types 只读
//一个提供 dragstart  事件中设置的格式的 strings 数组。
```

再提一下 mouseEvent 的几个值

offsetX 相对于当前元素的左上角的偏移量  
pageX 相对于页面的左上角的偏移量  
clientX 相对于浏览器窗口的左上角的偏移量  
screenX 相对于屏幕的左上角的偏移量  

