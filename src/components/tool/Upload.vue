<template>
  <el-upload :before-upload="handleUpload" action="" accept="image/*"
    >上传</el-upload
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],

  methods: {
    handleUpload(file: File) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        this.$emit("update:modelValue", `url(${reader.result})`);
      };
      return false;
    },
  },
});
</script>

<style  lang="scss" scoped>
</style>