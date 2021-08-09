import { cloneDeep } from "lodash";

export function swapIndex<T=any>(arr:Array<T>,from:number,to:number){
    let temp = cloneDeep(arr[from]);
    arr[from] = arr[to];
    arr[to] = temp;
}