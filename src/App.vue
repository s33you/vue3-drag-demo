<template>
  <ComponentList/>
  <Context/>
  <AttrList/>
</template>

<script lang="ts">
import AttrList from '@/layout/AttrList.vue'
import ComponentList from '@/layout/ComponentList.vue'
import Context from '@/layout/Context/Context.vue'
import { defineComponent, render } from 'vue'
export default defineComponent({
  name: 'App',
  components: {
    AttrList,
    ComponentList,
    Context
  },
 
})
</script>

<style>

html,body{
  margin:0;
  width:100vw;
  height:100vh;
}
#app{
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
