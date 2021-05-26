<template>
  <div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">选择单位:</div>
      <div class="config-tab-col-content">
        <el-select
          style="width:130px;"
          :value="globalConfig.style.marginUnit"
          placeholder="请选择单位"
          size="mini"
          @change="setStyleConfig($event, 'marginUnit')"
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
      <div class="config-tab-col-title">外上边距:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="globalConfig.style.marginTop"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'marginTop')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">外下边距:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="globalConfig.style.marginBottom"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'marginBottom')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">外左边距:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="globalConfig.style.marginLeft"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'marginLeft')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">外右边距:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="globalConfig.style.marginRight"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'marginRight')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">内上边距:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="globalConfig.style.paddingTop"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'paddingTop')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">内下边距:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="globalConfig.style.paddingBottom"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'paddingBottom')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">内左边距:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="globalConfig.style.paddingLeft"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'paddingLeft')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">内右边距:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="globalConfig.style.paddingRight"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'paddingRight')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarginPaddingConfig',
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
    };
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
