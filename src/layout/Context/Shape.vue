<template>
  <div
    class="shape-point"
    :class="active ? 'active' : ''"
    v-for="(item, index) in pointList"
    :key="index"
    :style="getPointStyle(layout, item)"
  ></div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { getPointStyle, pointList } from "@/hooks/useShape";
export default defineComponent({
  props: {
    layout: {
      type: Object as PropType<Layout>,
      requeired: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    return { pointList, getPointStyle };
  },
});
</script>

<style lang="scss" scoped>
.shape-point {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.active {
  background: #fff;
  border: 1px solid #59c7f9;
}
</style>
