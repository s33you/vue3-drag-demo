<script lang="tsx">
import { computed, defineComponent, PropType, ref, resolveComponent } from "vue";
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
    const componentRef = ref({})
    return (
      <div
        class="container"
        style={getStyle(this.element.layout)}
        onClick={(e) => {
          e.stopPropagation();
          store.commit("setCurrentComponent", this.element);
        }}
      >
        <Shape
          layout={this.element.layout}
          active={store.getters.isActiveComponent(this.element)}
          component={componentRef}
        />
        <Component vModel={this.element.modelValue} ref={componentRef}/>
      </div>
    );
  },
});
</script>
<style lang="scss" scoped>
.container {
  margin-top:20px;
  position: relative;
  resize: both;
}
</style>
