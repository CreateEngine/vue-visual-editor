<template>
  <div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">水平阴影:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="componentStyle.hShadow"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'hShadow')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">垂直阴影:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="componentStyle.vShadow"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'vShadow')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">模糊距离:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="componentStyle.blurShadow"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'blurShadow')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">阴影大小:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="componentStyle.spreadShadow"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'spreadShadow')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">阴影颜色:</div>
      <div class="config-tab-col-content">
        <el-color-picker
          :value="componentStyle.colorShadow"
          size="small"
          @change="setStyleConfig($event, 'colorShadow')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SizeConfig',
  props: {
    componentStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    setStyleConfig(val, key) {
      this.$emit('setStyleConfig', {
        [key]: val,
      });
    },
  },
};
</script>
