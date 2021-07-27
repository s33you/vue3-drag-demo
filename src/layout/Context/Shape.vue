<template>
  <i
    class="el-icon-refresh rotate"
    v-show="active && layout.rotate !== undefined"
    @mousedown="handleRotate($event, layout, el)"
  ></i>
  <div
    class="shape-point"
    :class="active ? 'active' : ''"
    v-for="(point, index) in pointList"
    :key="index"
    @mousedown="handleZoom($event,layout, point,container)"
    :style="getPointStyle(layout, point)"
  ></div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, inject } from "vue";
import {
  getPointStyle,
  pointList,
  handleRotate,
  handleZoom,
} from "@/hooks/useShape";
export default defineComponent({
  props: {
    layout: {
      type: Object as PropType<Layout>,
      requeired: true,
      default:()=>{
        return {
            width: 100,
            height: 100,
            top: 10,
            left: 10,
            rotate:0
        }
      }
    },
    active: {
      type: Boolean,
      required: true,
    },
    component: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const el = computed(() => {
      return props.component.value.$el;
    });

    const container = inject<Layout>("container")!;

    return {
      pointList,
      getPointStyle,
      handleRotate,
      el,
      handleZoom,
      container,
    };
  },
});
</script>

<style lang="scss" scoped>
.shape-point {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  display: none;
}
.active {
  background:#fff;
  border: 1px solid #59c7f9;
  display: inherit;
}
.rotate {
  font-size: 20px;
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  color: #18abf0;
}
</style>
