<script lang="tsx">
import { store } from "@/hooks/useComponents";
import { animate } from "@/utils/tools";
import { computed, defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const animations = reactive([
      "scale-up-center",
      "scale-down-center",
      "rotate-center",
      "slide-top ",
      "slide-bottom",
      "bounce-top",
      "bounce-bottom",
    ]);

    const addAnimation = (animation: string) => {
      store.state.currentComponent?.animations.push({
        name: animation,
        duration: 1,
        timingFunction: "linear",
        delay: 0,
      });
    };
    const playAnimation = () => {
      console.log(store.state.currentComponent?.ref.$el);
      animate(
        store.state.currentComponent?.ref.$el,
        store.state.currentComponent!.animations
      );
    };
    const removeAnimation = (index: number) => {
      store.state.currentComponent?.animations.splice(index, 1);
    };
    return () => {
      return (
        <>
          <el-divider content-position="left">动画列表(点击添加)</el-divider>
          <div class="animation-list">
            {animations.map((animation) => {
              return (
                <el-tag
                  class="animation"
                  onClick={() => {
                    addAnimation(animation);
                  }}
                >
                  {animation}
                </el-tag>
              );
            })}
          </div>
          <el-divider content-position="left">当前组件动画</el-divider>
          <div class="animation-list">
            <div onClick={playAnimation}>
              播放<i class="el-icon-video-play"></i>
            </div>
            <br/>
            <div>
              {store.state.currentComponent?.animations.map(
                (animation, index) => {
                  return (
                    <el-tag
                      class="animation"
                      closable
                      onClose={() => {
                        removeAnimation(index);
                      }}
                    >
                      {animation.name}
                    </el-tag>
                  );
                }
              )}
            </div>
          </div>
        </>
      );
    };
  },
});
</script>

<style lang="scss" scoped>
.animation-list {
  overflow-y: auto;
  padding: 16px;
  min-width: 320px;
  height: 100%;
  flex-shrink: 0;
}
.animation {
  margin: 4px;
  cursor: pointer;
}
</style>
