<template>
  <div class="component-list" @dragstart="handleDrag">
    <el-card
      :draggable="true"
      :body-style="{ padding: '8px' }"
      v-for="(component, index) in components"
      :key="index"
      :data-index="index"
      class="card"
      shadow="hover"
    >
     <i :class="'el-icon-'+ component.icon"></i>
      <div>{{ component.label }}</div>
    </el-card>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
import { componentList } from "@/hooks/useComponents";
export default defineComponent({

  setup() {
    const components = reactive(componentList);
    //拖拽事件
    const handleDrag = (e: any) => {
      e.dataTransfer.setData("index", e.target.dataset.index);
    };
    return { components, handleDrag };
  },
});
</script>

<style  lang="scss" scoped>
.component-list {
  padding-top:20px;
  width: 256px;
  height: 100%;
  box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-shrink: 0;
}
.card {
  width: calc(50% - 20px);
  margin: 5px;
  max-height: 60px;
  font-size: 14px;
  text-align: center;
  letter-spacing: 12px;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
}
</style>