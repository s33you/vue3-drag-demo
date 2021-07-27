/*
 * @description 因为有很多特殊数据项要处理，所以用tsx语法
 */

import { h, resolveComponent } from "vue";

const style2ElementKey = (key: string) => {
  const styleMap: {
    [propName: string]: Array<Style>;
  } = {
    "el-input-number": [
      "width",
      "height",
      "left",
      "top",
      "rotate",
      "fontSize",
      "borderWidth",
      "letterSpacing",
      "lineHeight",
      "borderRadius",
      "marginTop",
      "marginBottom",
      "marginLeft",
      "marginRight",
    ],
    "el-color-picker": ["color", "borderColor", "backgroundColor"],
  };
  const element = Object.entries(styleMap).find((element) => {
    if (element[1].includes(key)) {
      return true;
    }
  });
  return element ? element[0] : "el-input";
};

const attrsRender = (props: any, key: string) => {
  const eleType = style2ElementKey(key);
  return (
    <div>
      {key}:{" "}
      {h(resolveComponent(eleType), {
        modelValue: props[key],
        "onUpdate:modelValue": (value: any) => (props[key] = value),
      })}
    </div>
  );
};
export { attrsRender, style2ElementKey };
