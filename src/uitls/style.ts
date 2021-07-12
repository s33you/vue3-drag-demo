/**
 * @description 处理原始style数据
 * @param style 需要处理的原始数据
 * @param filter 过滤列表,不需要处理的字段
 */
export default function getStyle(style: any, filter = [] as any) {
    //过滤列表，需要处理的字段
    const needUnit = [
        "fontSize",
        "width",
        "height",
        "top",
        "left",
        "borderWidth",
        "letterSpacing",
        "lineHeight",
        "borderRadius",
        "textShadow",
    ];

    const result: any = {};
    if (!style) {
        return result
    }
    const shadowSize = style.hasOwnProperty('shadowSize') ? style["shadowSize"] : 2;
    Object.keys(style).forEach((key: string) => {
        if (!filter.includes(key)) {
            if (key === "textShadow") {
                if (style[key]) {
                    result[key] = `2px 2px ${shadowSize}px ${style[key]}`

                }
                return;
            }
            if (key != "rotate") {
                result[key] = style[key];

                if (needUnit.includes(key)) {
                    result[key] += "px";
                }
            } else {
                result.transform = key + "(" + style[key] + "deg)";
            }
        }
    });
    return result;
}
