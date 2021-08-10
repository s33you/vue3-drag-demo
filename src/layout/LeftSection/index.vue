<template>
  <el-tabs v-model="activeName"  tab-position="left">
    <el-tab-pane label="组件" name="components">
      <ComponentList />
    </el-tab-pane>
    <el-tab-pane label="配置" name="animate"> </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ComponentList from "@/layout/LeftSection/ComponentList.vue";
export default defineComponent({
  components: {
    ComponentList,
  },
  setup() {
    return {
      activeName: ref("components"),
    };
  },
});
</script>


