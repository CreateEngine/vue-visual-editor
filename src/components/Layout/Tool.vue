<template>
  <div class="editor-tool">
    <div class="editor-config">
      <i class="el-icon-setting" title="设置项" />
      <transition name="fade">
        <div v-show="showSavePage" class="save-page-tip">
          <i class="el-icon-loading" />
          <span>内容已自动保存</span>
        </div>
      </transition>
    </div>
    <div class="tool">
      <div class="tool-item" @click="narrowCanvasScale">
        <i class="icon iconfont iconsuoxiao" title="缩小" />
      </div>
      <div class="tool-item canvas-scale-range">
        <el-slider
          v-model="canvasScale"
          size="mini"
          :min="canvasScaleMin"
          :max="canvasScaleMax"
          :marks="marks"
          :format-tooltip="formatTooltip"
        />
      </div>
      <div class="tool-item" @click="enlargeCanvasScale">
        <i class="icon iconfont iconfangda" title="放大" />
      </div>
      <div
        v-if="isFullScreen === false"
        class="tool-item"
        @click="openFullScreen"
      >
        <i class="icon iconfont iconquanping" title="全屏" />
      </div>
      <div
        v-if="isFullScreen === true"
        class="tool-item"
        @click="exitFullScreen"
      >
        <i class="icon iconfont iconquanping" title="取消全屏" />
      </div>
    </div>
    <el-dialog
      title="设置"
      :visible.sync="showEditorConfig"
      fullscreen="fullscreen"
      width="600px"
    >
      <setting
        :editor-config="editorConfig"
        @closeEditorConfig="showEditorConfig = false"
      />
    </el-dialog>
  </div>
</template>
<script>
import Setting from '../Setting';
import { openFullScreen, exitFullScreen } from '../utils';

export default {
  name: 'Tool',
  components: {
    Setting,
  },
  props: {
    editorConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      isFullScreen: false,
      canvasScale: 100,
      canvasScaleMax: 200,
      canvasScaleMin: 50,
      scaleStep: 20,
      marks: {
        100: {
          style: {
            color: '#333333',
            fontWeight: '800',
            display: 'none',
          },
          label: this.$createElement('strong', '100%'),
        },
      },
      showEditorConfig: false,
      showSavePage: false,
      savePageTimeId: null,
      SFRenderJson: 'SFEditorConfig',
    };
  },
  watch: {
    canvasScale: {
      handler(newVal) {
        const componentsList = document.getElementById('renderCanvas');
        componentsList.style = `transform: scale(${newVal /
          100}); transform-origin: 0 0; zoom:1;`;
      },
    },
  },
  beforeDestroy() {
    clearInterval(this.savePageTimeId);
    this.savePageTimeId = null;
  },
  methods: {
    openFullScreen() {
      this.isFullScreen = !this.isFullScreen;
      openFullScreen(document.body);
    },
    exitFullScreen() {
      this.isFullScreen = !this.isFullScreen;
      exitFullScreen();
    },
    enlargeCanvasScale() {
      this.canvasScale = this.canvasScale + this.scaleStep;
      if (this.canvasScale > this.canvasScaleMax) {
        this.canvasScale = this.canvasScaleMax;
      }
    },
    narrowCanvasScale() {
      this.canvasScale = this.canvasScale - this.scaleStep;
      if (this.canvasScale < this.canvasScaleMin) {
        this.canvasScale = this.canvasScaleMin;
      }
    },
    formatTooltip(val) {
      return val + '%';
    },
  },
};
</script>

<style lang="scss" scoped>
.editor-tool {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 10px;
  background: #f1f2f3;
  border-top: 1px solid #e0e0e0;
  .editor-config {
    display: flex;
    justify-content: center;
    font-size: 14px;
    cursor: pointer;
    .save-page-tip {
      margin-left: 10px;
      font-size: 12px;
      color: #666666;
    }
  }
  .tool {
    display: flex;
    align-items: center;
    .tool-item {
      margin: 0 5px;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .canvas-scale-range {
    width: 120px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
