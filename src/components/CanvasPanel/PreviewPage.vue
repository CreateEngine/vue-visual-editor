<template>
  <div class="preview-box">
    <div class="preview-inner-box">
      <div class="preview-content">
        <div
          v-for="item in canvasComponentList"
          :key="item.renderId"
          class="preview-item"
        >
          <render-item :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import RenderItem from './RenderItem';

export default {
  name: 'PreviewPage',
  components: {
    RenderItem,
  },
  props: {
    canvasComponentList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.preview-box {
  width: 350px;
  height: 640px;
  margin: 0 auto;
  position: relative;
  padding: 60px 20px;
  border-radius: 40px;
  background-color: #000;
  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
  }
  .preview-inner-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 500px;
    background: #f2f2f2;
    .preview-content {
      flex: 1;
      overflow: auto;
      padding: 0 5px;
      /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
      &::-webkit-scrollbar {
        width: 7px;
        height: 7px;
      }

      /*定义滚动条轨道 内阴影+圆角*/
      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #f5f5f5;
      }

      /*定义滑块 内阴影+圆角*/
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
        background-color: #c8c8c8;
      }
    }
    img {
      width: 100%;
    }
    .preview-item {
      padding: 5px 0;
    }
  }
}
</style>
