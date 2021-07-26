<template>
  <div class="attr-list">
      {{
        element
      }}
  </div>
</template>
<script lang="ts">
import { store } from "@/hooks/useComponents";
import { computed, defineComponent, reactive} from "vue";
export default defineComponent({
  setup() {
    const element = computed(() => store.state.currentComponent)
    return {element}
  },
});
</script>

<style  lang="scss" scoped>
.attr-list {
  padding-top: 20px;
  width: 256px;
  height: 100%;
  flex-shrink: 0;
  box-shadow: 0px 12px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>