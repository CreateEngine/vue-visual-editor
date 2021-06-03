<template>
  <div class="preview-inner-box" :style="previewStyle">
    <div class="preview-content">
      <div
        v-for="item in canvasComponentList"
        :key="item.renderId"
        class="preview-item"
      >
        <render-item :item="item" :support="['events']" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import RenderItem from './../RenderItem';

export default {
  name: 'ScreenshotPage',
  components: {
    RenderItem,
  },
  computed: {
    ...mapGetters(['globalConfig', 'canvasComponentList']),
    previewStyle() {
      const style = Object.assign({}, this.globalConfig.style);
      style.backgroundImage = `url(${style.backgroundImage})`;
      return style;
    },
  },
};
</script>

<style lang="scss" scoped>
.preview-inner-box {
  position: relative;
  width: 100%;
  height: 500px;
  background: #f2f2f2;
  .preview-top {
    position: absolute;
    top: 0;
  }
  .preview-bottom {
    position: absolute;
    bottom: 0;
  }
  .preview-content {
    height: 429px;
    overflow: auto;
    padding: 0 5px;
    // padding-top: 39px;
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
</style>
