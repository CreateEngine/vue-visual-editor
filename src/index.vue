<template>
  <div>
    <editor-header
      :edit-page="editPage"
    />
    <editor-content />
    <tool :editor-config="editorConfig" />
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import { getSinglePage } from '@/api/page';
import { editorConfig } from './config/editorConfig';
import EditorHeader from './components/Layout/EditorHeader';
import EditorContent from './components/Layout/EditorContent';
import Tool from './components/Layout/Tool';

export default {
  name: 'Editor',
  components: {
    EditorHeader,
    EditorContent,
    Tool,
  },
  data() {
    return {
      editPage: {},
      editorConfig: editorConfig,
      SFRenderJson: 'SFEditorConfig',
    };
  },
  computed: {
    ...mapGetters(['selectComponent', 'canvasComponentList']),
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      if (this.$route.query.id) {
        await this.initData();
        return;
      }
    },
    async initData() {
      const res = await getSinglePage(this.$route.query.id);
      const globalJSON = JSON.parse(res.data.content);
      this.setGlobalConfig(globalJSON.global);
      this.editPage = {
        name: res.data.name,
        id: res.data.id,
        renderJson: globalJSON.renderJson,
      };
      // 组件初始化渲染
      this.SET_COMPONENTLIST(this.editPage.renderJson);
      this.setSelectComponent({
        ...this.canvasComponentList[0],
        ...{ index: 0 },
      });
    },
    setSelectComponent(item) {
      this.SET_SELECTCOMPONENT(item);
      this.ADDHISTORY();
    },
    ...mapMutations('editor', [
      'SET_GLOBALCONFIG',
      'SET_SELECTCOMPONENT',
      'SET_COMPONENTLIST',
      'DELETECOMPONENT',
      'ADDHISTORY',
    ]),
    setGlobalConfig(globalConfig) {
      this.SET_GLOBALCONFIG(globalConfig);
    },
  },
};
</script>
<style scoped>
@import './iconfont/iconfont.css';
</style>
