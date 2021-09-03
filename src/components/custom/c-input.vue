<template>
  <div class="text-area">
    <input :value="modelValue" @input="handleInput"  @mousedown.stop=""/>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "c-input",
  config: {
    active:false,
    type: "c-input",
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
    label: "输入框",
    icon: "text",
    props: {
      modelValue: "输入框",
    },
    ref:ref({}),
    animations:[]
  } as BaseComponent,
  props: {
    modelValue: {
      type: String,
      defalut: "",
    },
    img: {
      type: String,
      default: "",
    },
  },
  emits:['update:modelValue'],
  setup(props,context) {
      const handleIntput = (e: any) => {
          console.log('input')
         context.emit('update:modelValue',e.target.value) 
      }
      return {
        handleIntput
      }
  },
});
</script>

<style lang="scss" scoped>
.text-area {
  width: 100%;
  height: 100%;
}
</style>
