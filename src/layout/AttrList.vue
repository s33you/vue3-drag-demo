<template>
 <div class="attr-list">
     <el-switch v-model="value" @change="handleChange"/>
 </div>
</template>
<script lang="ts">
import { defineComponent, ref} from "vue"
export default defineComponent({
    setup(){
      const value = ref(false)
      const handleChange = (value:any)=>{
        console.log(value)
      }
      return {value,handleChange}
      
    }
});
</script>

<style  lang="scss" scoped>
.attr-list{
    width:256px;
    height: 100%;
  flex-shrink: 0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>