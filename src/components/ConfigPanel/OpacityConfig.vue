<template>
  <div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">透明度:</div>
      <div class="config-tab-col-content">
        <el-input-number
          :value="componentStyle.opacity"
          size="mini"
          controls-position="right"
          :min="0"
          :max="1"
          :step="0.1"
          @change="setStyleConfig($event, 'opacity')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OpacityConfig',
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
