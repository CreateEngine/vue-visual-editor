<template>
  <div id="app">
    <editor-header
      :canvas-component-list="canvasComponentList"
      :edit-page="editPage"
      :history-step="historyList.length"
      @useHistory="useHistory"
      @setComponentListNoHistory="setComponentListNoHistory"
      @setSelectComponent="setSelectComponent"
    />
    <editor-content
      :canvas-component-list="canvasComponentList"
      :select-component="selectComponent"
      @setSelectComponent="setSelectComponent"
      @setSelectComponentNoHistory="setSelectComponentNoHistory"
      @modifyComponentList="modifyComponentList"
      @deleteComponentList="deleteComponentList"
    />
    <tool
      :canvas-component-list="canvasComponentList"
      :select-component="selectComponent"
      :editor-config="editorConfig"
    />
  </div>
</template>
<script>
import { editorConfig } from "./config/editorConfig";
import EditorHeader from "./components/Layout/EditorHeader";
import EditorContent from "./components/Layout/EditorContent";
import Tool from "./components/Layout/Tool";

export default {
  name: "Editor",
  components: {
    EditorHeader,
    EditorContent,
    Tool,
  },
  data() {
    return {
      canvasComponentList: [],
      selectComponent: {},
      editPage: {},
      historyList: [],
      editorConfig: editorConfig,
      historyMaxSteps: editorConfig.history.maxSteps,
      SFRenderJson: "SFEditorConfig",
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.addHistory();
      // if (this.$route.query.id) {
      //   this.initData();
      //   return;
      // }
    },
    initData() {
      this.editPage = {
        name: "demo",
        id: "123",
        renderJson: [
          {
            category: "businessComponent",
            renderId: "Banner-1620807374976",
            name: "Banner",
            options: {
              datas: [
                "紧急通知：小区全体居民核酸检查",
                "清新家园11月20日断水通知",
                "垃圾分类，争做文明社区",
              ],
            },
          },
        ],
      };
      // 组件初始化渲染
      this.canvasComponentList = this.editPage.renderJson;
      this.setSelectComponent({
        ...this.canvasComponentList[0],
        ...{ index: 0 },
      });
    },
    setSelectComponent(item) {
      this.selectComponent = item;
      this.addHistory();
    },
    deleteComponentList(index) {
      if (this.canvasComponentList.length - 1 === index) {
        if (index === 0) {
          this.selectComponent = {};
        } else {
          this.selectComponent = {
            ...this.canvasComponentList[index - 1],
            ...{ index: index - 1 },
          };
        }
      } else {
        this.selectComponent = {
          ...this.canvasComponentList[index + 1],
          ...{ index: index + 1 },
        };
      }
      this.$nextTick(() => {
        this.canvasComponentList.splice(index, 1);
        this.addHistory();
      });
    },
    modifyComponentList(item) {
      const newItem = Object.assign({}, item);
      const tempItem = {};
      for (const key in newItem) {
        if (key !== "index") {
          tempItem[key] = newItem[key];
        }
      }
      this.canvasComponentList[newItem.index] = tempItem;
      this.addHistory();
    },
    setSelectComponentNoHistory(item) {
      this.selectComponent = item;
    },
    setComponentListNoHistory(list) {
      this.canvasComponentList = list;
    },
    addHistory() {
      const selectComponentTemp = JSON.stringify(this.selectComponent);
      const canvasComponentListTemp = JSON.stringify(this.canvasComponentList);
      const historyItem = {
        selectComponent: selectComponentTemp,
        canvasComponentList: canvasComponentListTemp,
      };
      if (this.historyList.length === this.historyMaxSteps) {
        this.historyList.shift();
      }
      this.historyList.push(historyItem);
      console.log(this.historyList, historyItem);
    },
    useHistory(index) {
      this.setComponentListNoHistory(
        JSON.parse(this.historyList[index].canvasComponentList)
      );
      this.setSelectComponentNoHistory(
        JSON.parse(this.historyList[index].selectComponent)
      );
    },
  },
};
</script>
<style scoped>
@import "./iconfont/iconfont.css";
</style>
