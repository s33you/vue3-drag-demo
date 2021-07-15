<script lang="tsx">
import { defineComponent, PropType,resolveComponent,} from 'vue'
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
    render(){
        const Component = resolveComponent(this.element.type) as any
        return 
        
        <Component vModel={this.element.modelValue} />
    }
 
})
</script>


