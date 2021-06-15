<template>
  <div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">外上边距:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="componentStyle.marginTop"
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
          :value="componentStyle.marginBottom"
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
          :value="componentStyle.marginLeft"
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
          :value="componentStyle.marginRight"
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
          :value="componentStyle.paddingTop"
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
          :value="componentStyle.paddingBottom"
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
          :value="componentStyle.paddingLeft"
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
          :value="componentStyle.paddingRight"
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
