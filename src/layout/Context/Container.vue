<script lang="tsx">
import { computed, defineComponent, PropType, resolveComponent } from "vue";
import getStyle from "@/utils/style";
import Shape from "./Shape.vue";
import { store } from "@/hooks/useComponents";
export default defineComponent({
  props: {
    defaultStyle: {
      type: Object as PropType<Style>,
    },
    layout: {
      required: true,
      type: Object as PropType<Layout>,
      default: () => {
        return {
          width: 100,
          height: 100,
        };
      },
    },
    element: {
      required: true,
      type: Object as PropType<BaseComponent>,
    },
  },
  emits:['click'],
  render() {
    const Component = resolveComponent(this.element.type) as any;
    return (
      <div
        class="container"
        style={getStyle(this.element.layout)}
        onClick={() => {
          store.commit("setCurrentComponent", this.element);
        }}
      >
        <Shape
          layout={this.element.layout}
          active={store.getters.isActiveComponent(this.element)}
        />
        <Component vModel={this.element.modelValue} />
      </div>
    );
  },
});
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  resize: both;
  background-color: #fff;
}
</style>
