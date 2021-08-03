<template>
  <el-select :model-value="modelValue" @change="handleChange"  >
    <el-option
      v-for="(option, index) in options"
      :key="index"
      :label="option.label"
      :value="option.value"
    >
    </el-option>
  </el-select>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
const optionsMap:any = {
  textAlign: [
    {
      value: "left",
      label: "左对齐",
    },
    {
      value: "right",
      label: "右对齐",
    },
    {
      value: "center",
      label: "居中对齐",
    },
  ],
};
export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "center",
    },
    attrName: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, context) {
    const options = reactive(optionsMap[props.attrName]);
    const handleChange = (value: string) => {
      context.emit("update:modelValue", value);
    };
    return { options, handleChange };
  },
});
</script>

<style lang="scss" scoped>
.select{
  width: 120px;
}
</style>
