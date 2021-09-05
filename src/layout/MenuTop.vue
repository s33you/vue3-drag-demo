<template>
  <div class="menu">
    <div class="left_area"></div>
    <div class="right_area">
      <el-button type="primary" @click="handleSave" size="small"
        >保存</el-button
      >
      <el-button @click="handlePreview" size="small">预览</el-button>
    </div>
    <el-dialog v-model="dialogView">
      <preview />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import Preview from "@/render/index.vue";
import { store } from "@/hooks/useComponents";
import { cloneDeep } from "lodash";
export default defineComponent({
  name: "menu-top",
  components: {
    Preview,
  },
  setup() {
    const dialogView = ref(false);
    const handleSave = () => {
      store.commit("save");
    };
    const handlePreview = () => {
      dialogView.value = true;
    };
    return {
      dialogView,
      handleSave,
      handlePreview,
    };
  },
});
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  height: $menu-height;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2 px 0px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
}
.right_area {
  padding: 10px;
}
</style>
