<template>
  <div class="text-area">
    <img :src="img" class="img" v-if="img != ''" />
    <span>{{ text }}</span>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "c-img",
  config:{
    type: "c-img",
    style: {
      color: "red",
      fontSize: 19,
      lineHeight: 40,
      borderRadius: 10,
      textAlign: "center",
    },
    animations:[],
    layout: {
      width: 100,
      height: 100,
      top: 30,
      left: 10,
      rotate: 0,
    },
    ref:null,
    label: "图文",
    icon: "picture",
    props: {
      text: "文本文字",
      img: "",
    },
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
  .input {
    width: calc(100% - 4px);
    padding: 0;
  }
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
</style>
