<script lang="tsx">
import { handleMove } from "@/hooks/useShape";
import {
  computed,
  defineComponent,
  h,
  PropType,
  provide,
  reactive,
  resolveComponent,
} from "vue";
import { store } from "@/hooks/useComponents";
import Container from "./Container.vue";
import { componentList } from "@/components/custom";
import getStyle from "@/utils/style";
import ContextMenu from "./ContextMenu.vue";
export default defineComponent({
  name: "Context",
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
    const context = store.state.context;
    //拖拽结束事件
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.dataTransfer!.dropEffect = "move";
    };
    const ContextMenu = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      let top = e.offsetY;
      let left = e.offsetX;
      let target = e.target;
      while (!target.className.includes("canvas")) {
        left += target.offsetLeft;
        top += target.offsetTop;
        target = target.parentNode;
      }
      store.commit("showContextMenu", {
        top,
        left,
      });
    };
    const components = computed(() => store.state.components);
    provide("container", context);
    return { handleDragOver, handleDrop, components, context, ContextMenu };
  },
  render() {
    return (
      <div class="context">
        <div class="size-picker">
          <span>宽：</span>
          <el-input-number
            class="input-number"
            v-model={this.context.width}
            controls-position="right"
            size="mini"
          ></el-input-number>
          <span>高：</span>
          <el-input-number
            class="input-number"
            v-model={this.context.height}
            controls-position="right"
            size="mini"
          ></el-input-number>
        </div>

        <div
          class="canvas"
          onDrop={this.handleDrop}
          onDragover={this.handleDragOver}
          onClick={(e: any) => {
            if (e.target.dataset.index) {
              store.commit("setCurrentComponent", {
                index: e.target.dataset.index,
              });
              return;
            }
            store.commit("setCurrentComponent", {
              index: null,
            });
            store.commit("hideContextMenu");
          }}
          onMousedown={(e: any) => {
            if (e.target.dataset.index) {
              store.commit("setCurrentComponent", {
                index: e.target.dataset.index,
              });
              handleMove(e, store.state.currentComponent!.layout, this.context);
            }
          }}
          style={getStyle(store.state.context)}
          onContextmenu={this.ContextMenu}
        >
          {this.components.map((component, index) => {
            return (
              <Container
                index={index}
                defaultStyle={component.style}
                layout={component.layout}
                element={component}
              />
            );
          })}
          <ContextMenu />
        </div>
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
.context {
  box-sizing: border-box;
  position: relative;
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.12);
  overflow: auto;
}
.canvas {
  will-change: transform;
  position: relative;
  margin: 20px auto;
  background-color: #fff;
  width: 80%;
  height: 80%;
}
.size-picker {
  text-align: center;
  margin: 0 auto;
  font-size: 14px;
  .input-number {
    margin: 0 10px;
  }
}
</style>
