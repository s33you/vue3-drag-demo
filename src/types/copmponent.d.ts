
type customComponent  = 'c-button'| 'c-text'|'el-button'
interface BaseComponent{
    layout:{
        width:number,
        height:number,
        top:number,
        left:number,
    }
    style:Partial<CSSStyleDeclaration>,
    label:string,
    type:customComponent
    componentValue:number|string
}
   