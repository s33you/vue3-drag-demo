<template>
  <header>
    <Menu />
  </header>
  <main class="main">
    <ComponentList />
    <Context />
    <AttrList />
  </main>
</template>

<script lang="ts">
import AttrList from "@/layout/AttrList.vue";
import ComponentList from "@/layout/ComponentList.vue";
import Context from "@/layout/Context/Context.vue";
import { defineComponent } from "vue";
import Menu from "@/layout/Menu.vue";
export default defineComponent({
  name: "App",
  components: {
    AttrList,
    ComponentList,
    Context,
    Menu,
  },
});
</script>

<style lang="scss">
html,
body {
  margin: 0;
  width: 100vw;
  height: 100vh;
}
#app {
  width: 100%;
  height: 100%;
}
*{
  box-sizing: border-box;
}
.main {
  width: 100%;
  height: calc(100% - #{$menu-height});
  display: flex;
}
</style>
