<template>
  <el-collapse class="page-config">
    <el-collapse-item title="背景配置" name="background">
      <background-config :global-config="globalConfig" @setStyleConfig="setStyleConfig" />
    </el-collapse-item>
    <el-collapse-item title="边距配置" name="marginPadding">
      <margin-padding-config :global-config="globalConfig" @setStyleConfig="setStyleConfig" />
    </el-collapse-item>
    <el-collapse-item title="字体配置" name="font">
      <font-config :global-config="globalConfig" @setFontConfig="setFontConfig" />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { globalConfig } from '../../../config/global.js';
import BackgroundConfig from '../BackgroundConfig';
import FontConfig from '../FontConfig';
import MarginPaddingConfig from '../MarginPaddingConfig';

export default {
  name: 'PageConfig',
  components: {
    BackgroundConfig,
    FontConfig,
    MarginPaddingConfig,
  },
  data() {
    return {
      globalConfig: Object.assign({}, globalConfig),
    };
  },
  methods: {
    setStyleConfig(config) {
      this.globalConfig.style = { ...this.globalConfig.style, ...config };
    },
    setFontConfig(config) {
      this.globalConfig.style.font = { ...this.globalConfig.style.font, ...config };
    },
  },
};
</script>
