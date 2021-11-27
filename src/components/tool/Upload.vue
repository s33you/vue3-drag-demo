<template>
  <el-upload :before-upload="handleUpload" action="" accept="image/*">
    <el-button size="mini" type="primary">上传图片</el-button></el-upload
  >
</template>

<script lang="ts">
import { store } from "@/hooks/useComponents";
import { ElMessage } from "element-plus";
import { read } from "fs";
import { reduce, result } from "lodash";
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
      let oversize = false;
      if (file.size > 300 * 1024) {
        ElMessage.warning("文件过大,已自动压缩");
        oversize = true;
        // return false;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (oversize) {
          let img = new Image();
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            context!.drawImage(img, 0, 0, img.width, img.height);
            let result = canvas.toDataURL(file.type, 0.3);
            console.log(result);
            this.$emit("update:modelValue", result);
          };
          img.src = reader.result as string;
        } else {
          this.$emit("update:modelValue", reader.result);
        }
      };
    },
  },
});
</script>

<style lang="scss" scoped>
</style>
