<template>
  <div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">宽度:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="componentStyle.width"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'width')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">高度:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="componentStyle.height"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'height')"
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
