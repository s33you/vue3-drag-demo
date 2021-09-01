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
import { handleMove } from "@/hooks/useShape";
const Container = defineComponent({
  name: "Container",
  props: {
    defaultStyle: {
      type: Object as PropType<Style>,
    },
    index:{
      type:Number,
      required:true
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
    const active = store.getters.isActiveComponent(this.element);
    const container = inject<Layout>("container");
    const Component = () => {
      const props = {
        ref: componentRef,
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
        class={!active ? "container" : "container active"}
        style={getStyle(this.element.layout)}
        onClick={(e) => {
          e.stopPropagation();
          store.commit("setCurrentComponent", {component:this.element,index:this.index});
        }}
        onMousedown={(e) => {
          e.stopPropagation();
          store.commit("setCurrentComponent", {component:this.element,index:this.index});
          handleMove(e, this.element.layout, container!);
        }}
      >
        <Shape
          layout={this.element.layout}
          active={active}
          component={componentRef}
        />
        <Component />
        {this.element.children?.map((child,index) => {
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
