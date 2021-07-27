<script lang="tsx">
import { store } from "@/hooks/useComponents";
import { computed, defineComponent, reactive } from "vue";
import { attrsRender } from "@/hooks/useAttrList";
export default defineComponent({
  setup() {
    const element = computed(() => store.state.currentComponent);
    return { element };
  },
  render() {
    if (this.element) {
      return (
        <div class="attr-list">
          {Object.keys(this.element!.style).map((key) => {
            return attrsRender(this.element!.style, key);
          })}
        </div>
      );
    }
    return "请先选择一个组件";
  },
});
</script>

<style lang="scss" scoped>
.attr-list {
  padding-top: 20px;
  width: 256px;
  height: 100%;
  flex-shrink: 0;
  box-shadow: 0px 12px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
