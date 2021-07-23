<script lang="tsx">
import {
  computed,
  defineComponent,
  inject,
  PropType,
  provide,
  ref,
  resolveComponent,
} from "vue";
import getStyle from "@/utils/style";
import Shape from "./Shape.vue";
import { store } from "@/hooks/useComponents";
import { handleMove } from "@/hooks/useShape";
import { chdir } from "process";
const Container = defineComponent({
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
  emits: ["click"],
  setup(props) {
    // provide("container", props.element.layout);
  },
  render() {
    const Component = resolveComponent(this.element.type) as any;
    const componentRef = ref({});
    const active = store.getters.isActiveComponent(this.element);
    const container = inject<Layout>("container");
    return (
      <div
        class="container"
        style={getStyle(this.element.layout)}
        onClick={(e) => {
          e.stopPropagation();
          store.commit("setCurrentComponent", this.element);
        }}
        onMousedown={(e) => {
          handleMove(e, this.element.layout, container!);
        }}
      >
        <Shape
          layout={this.element.layout}
          active={active}
          component={componentRef}
        />
        <Component vModel={this.element.modelValue} ref={componentRef} />
        {this.element.children?.map((child) => {
          return (
            <Container
              layout={child.layout}
              element={child}
              defaultStyle={child.style}
            />
          );
        })}
      </div>
    );
  },
});
export default Container;
</script>
<style lang="scss" scoped>
.container {
  position: absolute;
  resize: both;
}
</style>
