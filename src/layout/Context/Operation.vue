<script lang="tsx">
import { defineComponent, h, PropType, ref, resolveComponent } from 'vue'
export default defineComponent({
    props:{
        defaultStyle:{
            type:Object as PropType<Style>
        },
        layout:{
            required:true,
            type:Object as PropType<Layout>,
            default:()=>{
                return {
                    width:100,
                    height:100
                }
            }
        },
        element:{
            required:true,
            type:Object as PropType<BaseComponent>
        }
    },
    setup(props,instance) {
        const count = ref(0)
        return {count}

    },
    render(){
       return  <div>
        {h(resolveComponent(this.element.type),this.element.props?{...this.element.props}:{})}
        </div>
    }
})
</script>
