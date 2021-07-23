<template>
    <div class="text-area">
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
    .input{
        width: calc(100% - 4px);
        padding: 0;
    }
}

</style>