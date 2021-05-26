<template>
  <div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">选择单位:</div>
      <div class="config-tab-col-content">
        <el-select
          style="width:130px;"
          :value="globalConfig.style.font.fontUnit"
          placeholder="请选择单位"
          size="mini"
          @change="setFontConfig($event, 'fontUnit')"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">字体大小:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="globalConfig.style.font.fontSize"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'fontSize')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">字体粗细:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="globalConfig.style.font.fontWeight"
          size="mini"
          controls-position="right"
          :step="100"
          :min="300"
          @change="setStyleConfig($event, 'fontWeight')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">对齐方式:</div>
      <div class="config-tab-col-content">
        <el-select
          style="width:130px;"
          :value="globalConfig.style.font.textAlign"
          placeholder="请选择对齐方式"
          size="mini"
          @change="setFontConfig($event, 'textAlign')"
        >
          <el-option
            v-for="item in textAligns"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">字体颜色:</div>
      <div class="config-tab-col-content">
        <el-color-picker
          :value="globalConfig.style.font.color"
          size="small"
          @change="setFontConfig($event,'color')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FontConfig',
  props: {
    globalConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      options: [
        { value: 'px', label: 'px' },
        { value: 'vw', label: 'vw' },
        { value: '%', label: '%' },
      ],
      textAligns: [
        { value: 'left', label: '左对齐' },
        { value: 'center', label: '居中' },
        { value: 'right', label: '右对齐' },
      ],
    };
  },
  methods: {
    setFontConfig(val, key) {
      this.$emit('setFontConfig', {
        [key]: val,
      });
    },
  },
};
</script>
