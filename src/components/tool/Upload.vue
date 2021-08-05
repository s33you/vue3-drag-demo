<template>
  <el-upload :before-upload="handleUpload" action="" accept="image/*">
    <el-button size="mini" type="primary">上传图片</el-button></el-upload
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Upload",
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
        this.$emit("update:modelValue", reader.result);
      };
      return false;
    },
  },
});
</script>

<style lang="scss" scoped></style>
