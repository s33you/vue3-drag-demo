<template>
  <div
    class="context-menu"
    v-show="menuLayout.show"
    :style="{ top: menuLayout.top + 'px', left: menuLayout.left + 'px' }"
  >
    <ul class="menu-list">
      <template v-if="hasCurrentComponent">
        <li
          v-for="(item, index) in operations"
          :key="index"
          @click="item.handle"
        >
          {{ item.label }}
        </li>
      </template>
      <li v-else @click="paste">粘贴</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { store } from "@/hooks/useComponents";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "context-menu",
  setup() {
    const hasCurrentComponent = computed(() =>
      store.state.currentComponent == null ? false : true
    );
    const menuLayout = computed(() => store.state.menuLayout);
    const copy = () => {
      store.commit("copy");
    };
    const remove = () => {
      store.commit("remove");
    };
    const paste = (e: MouseEvent) => {
      store.commit("paste");
    };
    const operations = [
      {
        label: "复制",
        handle: copy,
      },
      {
        label: "删除",
        handle: remove,
      },
    ];
    return { hasCurrentComponent, menuLayout, operations, paste };
  },
});
</script>

<style lang="scss" scoped>
.context-menu {
  z-index: 99;
  position: absolute;
  width: 120px;
  box-shadow: 0 2px 6px 2px rgb(60 64 67 / 15%);
  background: #fff;
  border-radius: 2px;
  border: none;
  padding: 3px;
}
.menu-list {
  padding: 4px;
  font-size: 0px;
  padding: 0;
  list-style: none;
  li {
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    color: #5a5c5f;
    &:hover {
      background: #f5f5f5;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}
</style>
