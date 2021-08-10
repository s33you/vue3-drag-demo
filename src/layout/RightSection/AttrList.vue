<script lang="tsx">
import { store } from "@/hooks/useComponents";
import { computed, defineComponent, reactive } from "vue";
import { attrsRender } from "@/hooks/useAttrList";
export default defineComponent({
  name:"AttrList",
  setup() {
    const element = computed(() => store.state.currentComponent);
    const activeNames = reactive([]);
    return { element, activeNames };
  },
  render() {
    if (this.element) {
      return (
        <div class="attr-list">
          <el-collapse v-model={this.activeNames}>
            <el-collapse-item title="基本属性" name="layout">
              <el-form>
                {Object.keys(this.element!.layout).map((key) => {
                  return attrsRender(this.element!.layout, key);
                })}
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="额外样式" name="style">
              <el-form>
                {Object.keys(this.element!.style).map((key) => {
                  return attrsRender(this.element!.style, key);
                })}
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="特殊属性" name="props">
              <el-form>
                {Object.keys(this.element!.props).map((key) => {
                  return attrsRender(this.element!.props, key);
                })}
              </el-form>
            </el-collapse-item>
          </el-collapse>
        </div>
      );
    }
    return (
      <div class="attr-list">
        <i class="el-icon-warning" />
        <span style="font-size:14px">请先选择一个组件</span>
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
.attr-list {
  overflow-y: auto;
  padding: 16px;
  min-width: 320px;
  height: 100%;
  flex-shrink: 0;
  box-shadow: 0px 12px 12px 0 rgba(0, 0, 0, 0.1);
}

</style>
