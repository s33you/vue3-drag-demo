<template>
  <div
    class="shape-point"
    v-for="(item, index) in pointList"
    :key="index"
    :style="getPointStyle(layout, item)"
  ></div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import {getPointStyle,pointList} from '@/hooks/useShape'
export default defineComponent({
  props: {
    layout: {
      type: Object as PropType<Layout>,
      requeired: true
    },
  },
  setup() {
    return {pointList,getPointStyle}
  },
});
</script>

<style  lang="scss" scoped>
.shape-point {
    position: absolute;
    background: #fff;
    border: 1px solid #59c7f9;
    width: 6px;
    height: 6px;
    border-radius: 50%;
}
</style>