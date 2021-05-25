<template>
  <div class="editor-header">
    <div class="title"><i class="icon iconfont iconbianjiqi" /> 页面生成器</div>
    <div class="tool">
      <button
        class="tool-item"
        :class="{ disabled: canvasComponentList.length === 0 }"
        :disabled="canvasComponentList.length === 0"
        @click="showAddPageDialog"
      >
        <i class="icon iconfont iconbaocun" />
        <span>保存</span>
      </button>
      <button
        class="tool-item"
        :class="{ disabled: canvasComponentList.length === 0 }"
        :disabled="canvasComponentList.length === 0"
        @click="clearCanvas"
      >
        <i class="icon iconfont iconshanchu" />
        <span>清空</span>
      </button>
      <button
        class="tool-item"
        :class="{ disabled: canvasComponentList.length === 0 }"
        :disabled="canvasComponentList.length === 0"
        @click="previewPage"
      >
        <i class="icon iconfont iconyulan" />
        <span>预览</span>
      </button>
      <button
        class="tool-item"
        :class="{ disabled: currentHistoryStep === historyStep - 1 }"
        :disabled="currentHistoryStep === historyStep - 1"
        @click="revoke"
      >
        <i class="icon iconfont iconchexiao" />
        <span>撤销</span>
      </button>
      <button
        class="tool-item"
        :class="{ disabled: currentHistoryStep === 0 }"
        :disabled="currentHistoryStep === 0"
        @click="backOff"
      >
        <i class="icon iconfont iconhuitui" />
        <span>回退</span>
      </button>
    </div>
    <!-- 保存 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="showAddPage"
      width="530px"
      @close="closeDialog"
    >
      <el-form
        ref="pageForm"
        :model="page"
        :rules="pageRules"
        label-position="left"
        label-width="60px"
        size="small"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="page.name" maxlength="30" show-word-limit />
        </el-form-item>
        <el-form-item class="form-button">
          <el-button type="info" @click="showAddPage = false">取消</el-button>
          <el-button type="primary" @click="savePage">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 预览 -->
    <el-dialog
      :visible.sync="showPreviewPage"
      custom-class="preview-dialog"
      width="530px"
    >
      <preview-page
        v-if="showPreviewPage"
        :canvas-component-list="canvasComponentList"
      />
    </el-dialog>
    <preview-page
      id="previewPage"
      :canvas-component-list="canvasComponentList"
    />
  </div>
</template>
<script>
import html2canvas from 'html2canvas';
import PreviewPage from '../CanvasPanel/PreviewPage';

export default {
  name: 'EditorHeader',
  components: {
    PreviewPage,
  },
  props: {
    canvasComponentList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    editPage: {
      type: Object,
      default: () => {
        return {};
      },
    },
    historyStep: {
      type: Number,
      default: () => {
        return 0;
      },
    },
  },
  data() {
    return {
      showAddPage: false,
      showPreviewPage: false,
      page: {
        name: '',
        thumbnail: '',
        renderJson: '',
      },
      currentHistoryStep: 0,
    };
  },
  computed: {
    pageRules() {
      return {
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur',
          },
        ],
      };
    },
    type() {
      if (this.editPage.id) {
        return 'EDIT'; // 编辑页面
      }
      return 'ADD'; // 新建页面
    },
    dialogTitle() {
      if (this.editPage.id) {
        return '编辑页面'; // 编辑页面
      }
      return '新建页面'; // 新建页面
    },
  },
  watch: {
    historyStep: {
      handler(newVal) {
        this.currentHistoryStep = newVal - 1;
      },
    },
  },
  mounted() {
    if (this.editPage.id) {
      this.page.name = this.editPage.name;
    }
  },
  methods: {
    async savePage() {
      this.$refs['pageForm'].validate(async valid => {
        if (valid) {
          this.page.renderJson = this.getRenderJSON();
          this.page.thumbnail = await this.getPageThumbnail();
          this.savePageAjax();
        }
      });
    },
    savePageAjax() {
      const params = {
        name: this.page.name,
        thumbnail: this.page.thumbnail,
        renderJson: this.page.renderJson,
      };
      if (this.type === 'ADD') {
        console.log('addPageAjax', params);
      } else {
        console.log('editPageAjax', params);
      }
      this.showAddPage = false;
    },
    getRenderJSON() {
      const tempCanvasList = Object.assign([], this.canvasComponentList);
      tempCanvasList.forEach(item => {
        delete item.icon;
      });
      return tempCanvasList;
    },
    async getPageThumbnail() {
      // 截图
      const canvasId = document.getElementById('previewPage');
      let canvasData;
      await html2canvas(canvasId, {
        scale: 0.25,
      }).then(canvas => {
        canvasData = canvas.toDataURL('image/png');
      });
      return canvasData;
    },
    showAddPageDialog() {
      this.showAddPage = true;
    },
    closeDialog() {
      this.resetForm();
    },
    resetForm() {
      if (this.type === 'ADD') {
        this.page.name = '';
      } else {
        this.page.name = this.editPage.name;
      }
      this.$refs['pageForm'].clearValidate();
    },
    previewPage() {
      this.showPreviewPage = true;
    },
    useHistory(index) {
      this.$emit('useHistory', index);
    },
    revoke() {
      if (this.currentHistoryStep >= this.historyStep - 1) {
        this.currentHistoryStep = this.historyStep - 1;
      } else {
        this.currentHistoryStep++;
      }
      this.useHistory(this.currentHistoryStep);
    },
    backOff() {
      if (this.currentHistoryStep <= 0) {
        this.currentHistoryStep = 0;
      } else {
        this.currentHistoryStep--;
      }
      this.useHistory(this.currentHistoryStep);
    },
    clearCanvas() {
      this.$emit('setComponentListNoHistory', []);
      this.$emit('setSelectComponent', {});
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
</style>
<style lang="scss" scoped>
.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  box-shadow: 0 2px 10px rgba(70, 160, 252, 0.6);
  background-image: linear-gradient(to right, #1278f6, #00b4aa);
  color: #ffffff;
  .tool {
    display: flex;
    /deep/ .tool-item {
      display: block;
      margin: 0 5px;
      padding: 0;
      font-size: 13px;
      background: transparent;
      border: none;
      color: #f5dab1;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
      &.disabled {
        color: #dadada;
        cursor: not-allowed;
      }
    }
  }
}
/deep/ .preview-dialog {
  background: transparent;
  box-shadow: none;
  .el-dialog__headerbtn .el-dialog__close {
    font-size: 40px;
    color: #ffffff;
  }
}
#previewPage {
    position: fixed;
    top: -9999px;
    z-index: -1;
    pointer-events: none;
}
</style>
