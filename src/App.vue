<template>
<jsx/>
<el-button type="primary">11</el-button>
</template>

<script lang="ts">
import { defineComponent, render } from 'vue'
import {ElButton} from 'element-plus'
import jsx from '@/components/Jsx.vue'
export default defineComponent({
  name: 'App',
  components: {
    jsx,
    ElButton
  },
 
})
</script>

<style>

</style>
