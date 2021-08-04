/*
 * @description 因为有很多特殊数据项要处理，所以用tsx语法
 */

import { h, resolveComponent} from "vue";
import attrStyle from "@/styles/attr_list.module.scss";
const labelMap: any = {
  width: "宽度",
  height: "高度",
  left: "左边距",
  top: "上边距",
  rotate: "旋转角度",
  fontSize: "字体大小",
  borderWidth: "边框宽度",
  letterSpacing: "字间距",
  lineHeight: "行间距",
  borderRadius: "圆角",
  marginTop: "上边距",
  marginBottom: "下边距",
  marginLeft: "左边距",
  marginRight: "右边距",
  color: "颜色",
  borderColor: "边框颜色",
  backgroundColor: "背景颜色",
  textAlign: "对齐方式",
  img:'背景图片',
  text:"内容文字",
};
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
    Select: ["textAlign"],
    Upload:['img']
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
  const mergeProp:any = {
    modelValue: props[key],
    size: "mini",
    "onUpdate:modelValue": (value: any) => (props[key] = value),
  };
  if(eleType =='Select'){
    mergeProp['attrName'] = key;
  }
  return (
    <div class={attrStyle["attr-item"]}>
      <el-form-item label={labelMap[key] + ":"}>
        {h(resolveComponent(eleType),mergeProp)}
      </el-form-item>
    </div>
  );
};
export { attrsRender, style2ElementKey };
