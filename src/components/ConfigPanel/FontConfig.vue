<template>
  <div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">字体大小:</div>
      <div class="config-tab-col-content">
        <el-input-number
          v-model="componentStyle.fontSize"
          size="mini"
          controls-position="right"
          :min="12"
          @change="setStyleConfig($event, 'fontSize')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">字体粗细:</div>
      <div class="config-tab-col-content">
        <el-input-number
          v-model="componentStyle.fontWeight"
          size="mini"
          controls-position="right"
          :step="100"
          :min="400"
          @change="setStyleConfig($event, 'fontWeight')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">行间距：</div>
      <div class="config-tab-col-content">
        <el-input-number
          v-model="componentStyle.lineHeight"
          size="mini"
          controls-position="right"
          :min="0"
          :step="0.1"
          @change="setStyleConfig($event, 'lineHeight')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">对齐方式:</div>
      <div class="config-tab-col-content">
        <el-select
          v-model="componentStyle.textAlign"
          style="width:130px;"
          placeholder="请选择对齐方式"
          size="mini"
          @change="setStyleConfig($event, 'textAlign')"
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
          :value="componentStyle.color"
          size="small"
          @change="setStyleConfig($event, 'color')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'FontConfig',
  props: {
    componentStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      textAligns: [
        { value: 'left', label: '左对齐' },
        { value: 'center', label: '居中' },
        { value: 'right', label: '右对齐' },
      ],
    };
  },
  computed: {
    ...mapGetters(['unitType']),
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
