/**
 * @description 讲值约束在区间内
 * @param min 
 * @param max 
 * @param value 
 */
export function limitInArea(min: number, max: number, value: number) {
    if (value > max) {
        return max
    }
    if (value < min) {
        return min
    }
    return value
}

export const pointList: Array<string> = ["ne", "se", "sw", "nw","w", "e", "n", "s"]; // 操作点列表


/**
 * @description 根据字符串算出对应的缩放点样式
 * @param props 
 * @param point 点的字符串
 */

export function getPointStyle(layout: Layout, point: string) {
    const { width, height } = layout;
    const hasT = /n/.test(point);
    const hasB = /s/.test(point);
    const hasL = /w/.test(point);
    const hasR = /e/.test(point);
    let newLeft = 0;
    let newTop = 0;

    // 四个角的点
    if (point.length === 2) {
        newLeft = hasL ? 0 : width;
        newTop = hasT ? 0 : height;
    } else {
        // 上下两点的点，宽度居中
        if (hasT || hasB) {
            newLeft = width / 2;
            newTop = hasT ? 0 : height;
        }

        // 左右两边的点，高度居中
        if (hasL || hasR) {
            newLeft = hasL ? 0 : width;
            newTop = Math.floor(height / 2);
        }
    }
    const style = {
        marginLeft: hasR || hasL? "-4px" : "-4px",
        marginTop: "-4px",
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: `${point}-resize`,
    };
    return style;
}
export default function useShape(){
    return {
        getPointStyle,
        pointList
    }
}