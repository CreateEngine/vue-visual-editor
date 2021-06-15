<template>
  <div>
    <div class="config-title">基础样式</div>
    <el-collapse class="page-config">
      <el-collapse-item title="尺寸配置" name="size">
        <size-config
          :component-style="selectComponent.options.commonStyle"
          @setStyleConfig="setStyleConfig"
        />
      </el-collapse-item>
      <el-collapse-item title="边框配置" name="border">
        <border-config
          :component-style="selectComponent.options.commonStyle"
          @setStyleConfig="setStyleConfig"
        />
      </el-collapse-item>
      <el-collapse-item title="间距配置" name="margin">
        <margin-padding-config
          :component-style="selectComponent.options.commonStyle"
          @setStyleConfig="setStyleConfig"
        />
      </el-collapse-item>
      <el-collapse-item title="阴影配置" name="shodow">
        <shadow-config
          :component-style="selectComponent.options.commonStyle"
          @setStyleConfig="setStyleConfig"
        />
      </el-collapse-item>
      <el-collapse-item title="字体配置" name="font">
        <font-config
          :component-style="selectComponent.options.commonStyle"
          @setStyleConfig="setStyleConfig"
        />
      </el-collapse-item>
      <el-collapse-item title="背景配置" name="background">
        <background-config
          :background-style="selectComponent.options.commonStyle"
          @setStyleConfig="setStyleConfig"
        />
      </el-collapse-item>
      <el-collapse-item title="透明度配置" name="opacity">
        <opacity-config
          :component-style="selectComponent.options.commonStyle"
          @setStyleConfig="setStyleConfig"
        />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import SizeConfig from '../SizeConfig';
import BorderConfig from '../BorderConfig';
import FontConfig from '../FontConfig';
import MarginPaddingConfig from '../MarginPaddingConfig';
import ShadowConfig from '../ShadowConfig';
import BackgroundConfig from '../BackgroundConfig';
import OpacityConfig from '../OpacityConfig';

export default {
  name: 'CommonStyle',
  components: {
    SizeConfig,
    BorderConfig,
    FontConfig,
    MarginPaddingConfig,
    ShadowConfig,
    BackgroundConfig,
    OpacityConfig,
  },
  computed: {
    ...mapGetters(['selectComponent', 'unitType']),
  },
  methods: {
    ...mapMutations('editor', ['SET_SELECTCOMPONENT', 'ADDHISTORY']),
    setStyleConfig(style) {
      this.selectComponent.options.commonStyle = {
        ...this.selectComponent.options.commonStyle,
        ...style,
      };
      this.ADDHISTORY();
      this.SET_SELECTCOMPONENT(this.selectComponent);
    },
  },
};
</script>
<style lang="scss" scoped>
.config-title {
  padding: 10px;
  font-weight: 600;
  font-size: 14px;
}
</style>
