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