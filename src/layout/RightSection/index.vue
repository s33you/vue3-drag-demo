<template>
  <el-tabs v-model="activeName" type="card"  class="tabs">
    <el-tab-pane label="属性" name="attr" >
      <AttrList />
    </el-tab-pane>
    <el-tab-pane label="动画" name="animate" class="tabs"> </el-tab-pane>
    <el-tab-pane label="事件" name="event" class="tabs"> </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AttrList from "@/layout/RightSection/AttrList.vue";
export default defineComponent({
  components: {
    AttrList,
  },
  setup() {
    return {
      activeName: ref("attr"),
    };
  },
});
</script>

<style lang="scss" scoped>
.tabs {
  overflow-y: auto;
  height: 100%;
  width: 340px;
}

</style>
