import { throttle } from "lodash";
import { inject, reactive } from "vue";
import { store } from "./useComponents";

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

// 操作点列表
export const pointList: Array<string> = reactive(["ne", "se", "sw", "nw", "w", "e", "n", "s"])

/**
 * @description 旋转操作
 * @param layout  布局信息
 * @param el 元素本身
 */
export function handleRotate(e: MouseEvent, layout: Layout, el: HTMLElement) {
    if (layout.rotate == undefined) {
        return
    }
    const pos = { ...layout }
    e.stopPropagation()
    e.preventDefault()
    // 初始坐标和初始角度
    const startY = e.clientY
    const startX = e.clientX
    const startRotate = pos.rotate!

    // 获取元素中心点位置
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // 旋转前的角度
    const rotateBefore = Math.atan2(startY - centerY, startX - centerX) / Math.PI * 180
    // 如果元素没有移动，则不保存快照
    const move = (moveEvent: MouseEvent) => {
        const curX = moveEvent.clientX
        const curY = moveEvent.clientY
        // 旋转后的角度
        const rotateAfter = Math.atan2(curY - centerY, curX - centerX) / Math.PI * 180
        // 获取旋转的角度值
        pos.rotate = Number((startRotate + rotateAfter - rotateBefore).toFixed(4))
        console.log(pos)
        // 修改当前组件样式
        store.commit('setLayout', pos)
    }
    const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
    }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
}


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
        marginLeft: hasR || hasL ? "-4px" : "-4px",
        marginTop: "-4px",
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: `${point}-resize`,
    };
    return style;
}
/**
 * @description 缩放操作
 * @param layout
 * @param el
 * @param e 
*/
export function handleZoom(e: MouseEvent, layout: Layout, el: HTMLElement, mark: string, container: Layout) {
    e.stopPropagation()
    e.preventDefault()
    let startX = e.clientX;
    let startY = e.clientY;
    let pos = { ...layout };
    let { height, width, top, left } = pos;
    let move = (moveEvent: MouseEvent) => {
        moveEvent.stopPropagation()
        moveEvent.preventDefault()
        /**
         * 判定是否为对角锚点
         */
        let proportion = /nw|ne|sw|se/.test(mark);

        let currX = moveEvent.clientX;
        let currY = moveEvent.clientY;

        let disY = currY - startY;
        let disX = currX - startX;

        let hasN = /n/.test(mark);
        let hasS = /s/.test(mark);
        let hasW = /w/.test(mark);
        let hasE = /e/.test(mark);

        /**
         * 判断是否大于container
         */

        if (container) {
            if (top < 0 || top + height > container.height) {
                top = top < 0 ? 0 : container.height - height;

            }
            if (left < 0 || left + width > container.width) {
                left = left < 0 ? 0 : container.width - width;
            }
        }
        //对角等比缩放
        // if (proportion) {
        //     if (hasN) {
        //         disX = disY * scale * (hasW ? 1 : -1);
        //     }
        //     if (hasS) {
        //         disX = disY * scale * (hasE ? 1 : -1);
        //     }
        // }

        let newHeight = +height + (hasN ? -disY : hasS ? disY : 0);
        let newWidth = +width + (hasW ? -disX : hasE ? disX : 0);
        /**
         * 对值做出限定，从而限定布局
         */
        pos["height"] = limitInArea(0, container!.height, newHeight)
        pos["width"] = limitInArea(0, container!.width, newWidth)
        pos["left"] = limitInArea(0, container!.width - pos['width'], left + (hasW ? disX : 0))
        pos["top"] = limitInArea(0, container!.height - pos['height'], top + (hasN ? disY : 0))
        store.commit('setLayout', pos)

    };
    let up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up)
}

export const handleMove = (e: MouseEvent, layout: Layout, container: Layout) => {
    e.stopPropagation();
    e.preventDefault();
    let pos = { ...layout }
    let startY = e.pageY;
    let startX = e.pageX;
    let startTop = pos["top"];
    let startLeft = pos["left"];
    let move = throttle((moveEvent: any) => {
        moveEvent.stopPropagation(); //阻止冒泡影响父组件
        let currX = moveEvent.pageX;
        let currY = moveEvent.pageY;
        let top = currY - startY + startTop;
        let left = currX - startX + startLeft;
        if (container) {
            if (top < 0 || top + pos.height > container.height) {
                top = top < 0 ? 0 : container.height - pos.height;
            }
            if (left < 0 || left + pos.width > container.width) {
                left = left < 0 ? 0 : container.width - pos.width;
            }
        }
        pos.top = top;
        pos.left = left;
        store.commit('setLayout', pos)
    },12)
    let up = () => {
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
};
export default function useShape() {
    return {
        getPointStyle,
        pointList
    }
}