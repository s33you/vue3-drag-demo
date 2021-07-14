<template>
    <div class="text-area">
        <input class="input"  @input="$emit('update:modelValue', $event.target.value)" :value="modelValue"/>
        <span>{{modelValue}}</span>
    </div>
</template>
<script lang="ts">
import { defineComponent} from "vue"
export default defineComponent({
    props:{
        modelValue:{
            type:String,
            defalut:""
        }
    },
    setup(){
        
    }
});
</script>

<style  lang="scss" scoped>
.text-area{
    width: 100%;
    height: 100%;
}

</style>