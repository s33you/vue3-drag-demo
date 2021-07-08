<template>
  <div
    class="context"
    @drop="handleDrop"
    :draggable="true"
    @dragover="handleDragOver"
  >
    画图区域
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    //监听放置事件
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      let index = e.dataTransfer!.getData("index");
      console.log(index);
    };
    //
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.dataTransfer!.dropEffect = "move";
    };
    return { handleDragOver, handleDrop };
  },
});
</script>

<style  lang="scss" scoped>
.context {
  flex-shrink: 0;
  flex-grow: 1;
  background: rgba(0, 0, 0, 0.12);
}
</style>