<script lang="tsx">
import {
  defineComponent,
  h,
  PropType,
  provide,
  reactive,
  resolveComponent,
} from "vue";
import { store, componentList } from "@/hooks/useComponents";
import Container from "./Container.vue";
import getStyle from "@/utils/style";
export default defineComponent({
  components: {},
  setup() {
    //监听放置事件
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      let index = e.dataTransfer!.getData("index");
      //判定是否是从组件列表拖拽而来
      if (index) {
        store.commit("addComponent", componentList[Number(index)]);
      }
    };
    const context = store.state.context
    //拖拽结束事件
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.dataTransfer!.dropEffect = "move";
    };
    const components = store.state.components;
    provide("container", context);
    return { handleDragOver, handleDrop, components };
  },
  render() {
    return (
      <div class="context">
      <div class="size-picker"></div>
        <div
        class="canvas"
        onDrop={this.handleDrop}
        onDragover={this.handleDragOver}
        onClick={() => store.commit("setCurrentComponent", null)}
        style={getStyle(store.state.context)}
      >
        {this.components.map((component) => {
          return (
            <Container
              defaultStyle={component.style}
              layout={component.layout}
              element={component}
            />
          );
        })}
      </div>
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
.context {
  position: relative;
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.12);
  overflow: auto;
}
.canvas{
  position: relative;
  margin:20px auto;
  background-color: #fff;
  width: 80%;
  height: 80%;
}
</style>
