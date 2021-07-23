<template>
  <div class="menu">
    <div class="left_area"></div>
    <div class="right_area"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  height: $menu-height;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 2 px 0px rgba(0, 0, 0, 0.1);
}
</style>
