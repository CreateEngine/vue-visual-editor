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
        :class="{ disabled: currentHistoryStep === historyList.length - 1 }"
        :disabled="currentHistoryStep === historyList.length - 1"
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
          <el-button type="info" @click="showAddPage = false">
            取消
          </el-button>
          <el-button type="primary" @click="savePage">
            确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 预览 -->
    <el-dialog
      :visible.sync="showPreviewPage"
      custom-class="preview-dialog"
      width="530px"
    >
      <preview-page v-if="showPreviewPage" />
    </el-dialog>
    <preview-page id="previewPage" type="screenshot" />
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import html2canvas from "html2canvas";
import PreviewPage from "../CanvasPanel/PreviewPage/index";
import { addPage, modifyPage } from "@/api/page";
import { uploadThumbnail } from "@/api/upload";

export default {
  name: "EditorHeader",
  components: {
    PreviewPage,
  },
  props: {
    editPage: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      showAddPage: false,
      showPreviewPage: false,
      page: {
        name: "",
        thumbnail: "",
        renderJson: "",
      },
      currentHistoryStep: 0,
    };
  },
  computed: {
    ...mapGetters(["globalConfig", "canvasComponentList", "historyList"]),
    pageRules() {
      return {
        name: [
          {
            required: true,
            message: "请输入名称",
            trigger: "blur",
          },
        ],
      };
    },
    type() {
      if (this.editPage.id) {
        return "EDIT"; // 编辑页面
      }
      return "ADD"; // 新建页面
    },
    dialogTitle() {
      if (this.editPage.id) {
        return "编辑页面"; // 编辑页面
      }
      return "新建页面"; // 新建页面
    },
  },
  watch: {
    "historyList.length": {
      handler(newVal) {
        this.currentHistoryStep = newVal - 1;
      },
    },
    editPage: {
      handler(newVal) {
        this.page.name = newVal.name;
      },
    },
  },
  methods: {
    async savePage() {
      this.$refs["pageForm"].validate(async (valid) => {
        if (valid) {
          this.page.renderJson = this.getRenderJSON();
          this.getPageThumbnail();
        }
      });
    },
    changeMyList() {
      // 改变pageChange 触发已打开的列表页重新请求
      localStorage.setItem("pageChange", Date.now());
    },
    async savePageAjax() {
      const pageRenderJSON = {
        global: this.globalConfig,
        renderJson: this.page.renderJson,
      };
      const params = {
        name: this.page.name,
        content: JSON.stringify(pageRenderJSON),
        thumb: this.page.thumbnail,
      };
      if (this.type === "ADD") {
        const addRes = await addPage(params);
        if (addRes.status === 200) {
          this.showAddPage = false;
          this.$message.success("页面新建成功！");
          this.changeMyList();
        }
      } else {
        const modifyRes = await modifyPage(this.editPage.id, params);
        if (modifyRes.status === 200) {
          this.showAddPage = false;
          this.$message.success("页面修改成功！");
          this.changeMyList();
        }
      }
    },
    getRenderJSON() {
      const tempCanvasList = Object.assign([], this.canvasComponentList);
      tempCanvasList.forEach((item) => {
        delete item.icon;
      });
      return tempCanvasList;
    },
    async getPageThumbnail() {
      // 截图
      const canvasId = document.getElementById("previewPage");
      await html2canvas(canvasId, {
        scale: 0.25,
        useCORS: true,
      }).then((canvas) => {
        canvas.toBlob(async (blob) => {
          // 以时间戳作为文件名 实时区分不同文件 按需求自己定义就好
          const filename = `${new Date().getTime()}.jpg`;
          // 转换canvas图片数据格式为formData
          const file2 = new File([blob], filename, { type: "image/jpg" });
          const formData = new FormData();
          formData.append("file", file2);
          // 将转换为formData的canvas图片 上传到服务器
          const res = await uploadThumbnail(formData);
          const originUrl = new URL(res.config.baseURL).origin;
          this.page.thumbnail = `${originUrl}${res.data.url}`;
          // 生成图片后再保存页面
          this.savePageAjax();
        });
      });
    },
    showAddPageDialog() {
      this.showAddPage = true;
    },
    closeDialog() {
      this.resetForm();
    },
    resetForm() {
      if (this.type === "ADD") {
        this.page.name = "";
      }
      this.$refs["pageForm"].clearValidate();
    },
    previewPage() {
      this.showPreviewPage = true;
    },
    revoke() {
      if (this.currentHistoryStep >= this.historyList.length - 1) {
        this.currentHistoryStep = this.historyList.length - 1;
      } else {
        this.currentHistoryStep++;
      }
      this.USEHISTORY(this.currentHistoryStep);
    },
    backOff() {
      if (this.currentHistoryStep <= 0) {
        this.currentHistoryStep = 0;
      } else {
        this.currentHistoryStep--;
      }
      this.USEHISTORY(this.currentHistoryStep);
    },
    clearCanvas() {
      this.SET_COMPONENTLIST([]);
      this.SET_SELECTCOMPONENT({});
      this.ADDHISTORY();
    },
    ...mapMutations("editor", [
      "SET_SELECTCOMPONENT",
      "USEHISTORY",
      "SET_COMPONENTLIST",
      "ADDHISTORY",
    ]),
  },
};
</script>
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
