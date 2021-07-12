<script lang="tsx">
import { defineComponent, h, resolveComponent } from "vue";
import { store, componentList } from "@/hooks/useComponents";
import getStyle from '@/uitls/style'
export default defineComponent({
  setup() {
    //监听放置事件
    const handleDrop = (e: DragEvent) => {
      console.log(e);
      e.preventDefault();
      e.stopPropagation();
      let index = e.dataTransfer!.getData("index");
      //判定是否是从组件列表拖拽而来
      if (index) {
        store.commit('addComponent', componentList[Number(index)]);
      }
    };
    //拖拽结束事件
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.dataTransfer!.dropEffect = "move";
    };
    const components = store.state.components;
    return { handleDragOver, handleDrop, components };
  },
  render(){
    return  <div class="context" onDrop={this.handleDrop} onDragover={this.handleDragOver}>
        <div>
          {this.components.map(component=>{
              return h(resolveComponent(component.type),{
                style:getStyle(Object.assign(component.style,component.layout))
              },)
          })}        
        </div>
  </div>
  }
});
</script>

<style  lang="scss" scoped>
.context {
  flex-shrink: 0;
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.12);
  max-width: 80%;
}
</style>