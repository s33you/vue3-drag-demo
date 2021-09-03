<template>
  <div class="text-area">
    <el-button>{{ text }}</el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "c-button",
  config: {
    active:false,
    type: "c-button",
    style: {
      color: "red",
      fontSize: 19,
      lineHeight: 40,
      borderRadius: 10,
      textAlign: "center",
    },
    layout: {
      width: 100,
      height: 100,
      top: 30,
      left: 10,
      rotate: 0,
    },
    label: "按钮",
    icon: "thumb",
    props: {
      text: "按钮文字",
    },
    ref:ref({}),
    animations:[]
  } as BaseComponent,
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
