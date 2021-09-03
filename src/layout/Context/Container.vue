<script lang="tsx">
import {
  defineComponent,
  h,
  inject,
  PropType,
  ref,
  resolveComponent,
} from "vue";
import getStyle from "@/utils/style";
import Shape from "./Shape.vue";
import { store } from "@/hooks/useComponents";
const Container = defineComponent({
  name: "Container",
  props: {
    defaultStyle: {
      type: Object as PropType<Style>,
    },
    index: {
      type: Number,
      required: true,
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
    const componentRef = ref({});
    this.element.ref = componentRef;
    const Component = (props: any) => {
      props = {
        ref: componentRef,
        ...props,
        ...this.element.props,
        style: getStyle(this.element.style),
      };
      if (this.element.modelValue !== undefined) {
        Object.assign(props, {
          modelValue: this.element.modelValue,
          "onUpdate:modelValue": (value: any) =>
            (this.element.modelValue = value),
        });
      }
      return h(resolveComponent(this.element.type), props);
    };
    return (
      <div
        class={
          this.element.active === false
            ? "container"
            : "container active"
        }
        style={getStyle(this.element.layout)}
      >
        <Shape
          layout={this.element.layout}
          active={ this.element.active}
          component={componentRef}
        />
        <Component data-index={this.index} />
        {this.element.children?.map((child, index) => {
          return (
            <Container
              index={index}
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
.active {
  outline: 1px solid #6bbefd !important;
  will-change: transform;
}
</style>
