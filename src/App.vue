<template>
  <header>
    <MenuTop />
  </header>
  <main class="main">
    <LeftSection />
    <Context />
    <RightSection />
  </main>
</template>

<script lang="ts">
import Context from "@/layout/Context/Context.vue";
import { defineComponent, ref } from "vue";
import MenuTop from "@/layout/MenuTop.vue";
import RightSection from "@/layout/RightSection/index.vue";
import LeftSection from "@/layout/LeftSection/index.vue";
export default defineComponent({
  name: "App",
  components: {
    Context,
    MenuTop,
    LeftSection,
    RightSection,
  },
  setup(){
    

  }
})
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: #f5f5f5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  width: 6px;
  background: #b4bccc;
}
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
* {
  box-sizing: border-box;
}
.main {
  width: 100%;
  height: calc(100% - #{$menu-height});
  display: flex;
}
</style>
