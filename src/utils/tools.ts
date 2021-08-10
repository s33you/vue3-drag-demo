import { cloneDeep } from "lodash";

export function swapIndex<T=any>(arr:Array<T>,from:number,to:number){
    const temp = arr[from]
    arr.splice(from, 1)
    arr.splice(to, 0, temp)
}