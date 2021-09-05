<template>
  <el-upload :before-upload="handleUpload" action="" accept="image/*">
    <el-button size="mini" type="primary">上传图片</el-button></el-upload
  >
</template>

<script lang="ts">
import { ElMessage } from "element-plus";
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
      console.log(file)
      if(file.size > 1024 *1024 ){
        ElMessage.warning(
          "文件不能超过1M"
        )
        return ;
      }
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

<style lang="scss" scoped>

</style>
