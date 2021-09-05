<script lang="tsx">
import { store } from "@/hooks/useComponents";
import getStyle from "@/utils/style";
import { defineComponent, h, resolveComponent } from "vue";
export default defineComponent({
  setup() {},
  render() {
    const data = JSON.parse(localStorage.getItem('contextData') as string).data
    return (
      <div style={getStyle(store.state.context)} class="preview">
        {data.map((element: BaseComponent) => {
          const props = {
            ...element.props,
            style: getStyle(
              Object.assign(element.layout, element.style, {
                position: "absolute",
              })
            ),
          };
          if (element.props.modelValue !== undefined) {
            Object.assign(props, {
              modelValue: element.modelValue,
              "onUpdate:modelValue": (value: any) => {
                element.modelValue = value;
              },
            });
          }
          return h(resolveComponent(element.type), props);
        })}
      </div>
    );
  },
});
</script>

<style  lang="scss" scoped>
.preview {
  position: relative;
  overflow: hidden;
}
</style>