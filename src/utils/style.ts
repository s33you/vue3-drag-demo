/**
 * @description 处理原始style数据
 * @param style 需要处理的原始数据
 * @param filter 过滤列表,不需要处理的字段
 */

export default function getStyle(style: any, filter = [] as any) {
    //需要特殊处理的字段
    const specialKeyHandles:any = {
        'rotate': (result:any,value: string | number) => {
            result.transform = 'rotate' + '(' + value + 'deg)'
        }
    }
    //过滤列表，需要单位的字段
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
    ];
    const result: any = {};
    if (!style) {
        return result
    }
    Object.keys(style).forEach((key: string) => {
        if (!filter.includes(key)) {
            //特殊处理字段
            if(specialKeyHandles[key]){
                specialKeyHandles[key](result,style[key])
                return
            }
            //处理普通字段，原封不动的返回
            result[key] = style[key];
            //处理需要单位的字段
            if (needUnit.includes(key)) {
                result[key] += "px";
                return
            }
         
      
        }
    });
    return result;
}
