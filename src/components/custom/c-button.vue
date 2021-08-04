<template>
  <div class="text-area">
    <el-button>{{ text }}</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "c-button",
  props: {
    text: {
      type: String,
      defalut: "",
    },
    img: {
      type: String,
      default: "",
    },
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
.text-area {
  width: 100%;
  height: 100%;
}
</style>
