import { forEach, forInRight } from "lodash"

export function swapIndex<T = any>(arr: Array<T>, from: number, to: number) {
    const temp = arr[from]
    arr.splice(from, 1)
    arr.splice(to, 0, temp)
}
export async function animate(el: HTMLElement, animations: Array<Anima>) {
    const play = (animation: Anima) => {
        return new Promise<void>(resolve => {
            el.style.setProperty('animation', `${animation.name} ${animation.duration}s ${animation.timingFunction} ${animation.delay}s`)
            const removeAnimation = () => {
                el.removeEventListener('animationend', removeAnimation)
                el.removeEventListener('animationcancel', removeAnimation)
                el.style.setProperty('animation', '')
                resolve()
            }
            el.addEventListener('animationend', removeAnimation)
            el.addEventListener('animationcancel', removeAnimation)
        })
    }
    for(let animation of animations){
        await play(animation)
    }
}