<template>
  <div class="setting">
    <el-row :gutter="10" class="setting-col">
      <el-col :span="6">撤销回退步数限制：(10-100)</el-col>
      <el-col :span="18">
        <el-input-number
          v-model="history.maxSteps"
          :min="10"
          :max="100"
          size="small"
        />
      </el-col>
    </el-row>
    <el-row :gutter="10" class="setting-col">
      <el-col :span="6">自动保存时间间隔(分钟)：</el-col>
      <el-col :span="18">
        <el-input-number
          v-model="saveConfig.saveInterval"
          :min="1"
          size="small"
        />
      </el-col>
    </el-row>
    <el-row :gutter="10" class="setting-col">
      <el-col :offset="6" :span="18">
        <el-button
          size="small"
          type="primary"
          @click="saveSetting"
        >保存</el-button>
        <el-button
          size="small"
          type="text"
          @click="recoverySetting"
        >恢复默认设置</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Setting',
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
      history: {
        maxSteps: 0,
      },
      saveConfig: {
        saveInterval: 0,
      },
      editorConfigKey: 'SFEditorConfig',
    };
  },
  watch: {
    editorConfig: {
      handler() {
        this.getSFEditorConfig();
      },
    },
  },
  created() {
    this.getSFEditorConfig();
  },
  methods: {
    getSFEditorConfig() {
      const SFEditorConfig =
        JSON.parse(localStorage.getItem(`${this.editorConfigKey}`)) ||
        this.editorConfig;
      this.history = Object.assign({}, SFEditorConfig.history);
      this.saveConfig = Object.assign({}, SFEditorConfig.saveConfig);
    },
    saveSetting() {
      localStorage.setItem(
        `${this.editorConfigKey}`,
        JSON.stringify({ history: this.history, saveConfig: this.saveConfig })
      );
      this.$emit('closeEditorConfig');
    },
    recoverySetting() {
      this.history = this.editorConfig.history;
      this.saveConfig = this.editorConfig.saveConfig;
      console.log(this.editorConfig);
    },
  },
};
</script>

<style lang="scss" scoped>
.setting-col {
  margin: 15px 0;
}
</style>
