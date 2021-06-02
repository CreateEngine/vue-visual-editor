<template>
  <div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">尺寸:</div>
      <div class="config-tab-col-content">
        <el-input-number
          v-model="componentStyle.borderWidth"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'borderWidth')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">颜色:</div>
      <div class="config-tab-col-content">
        <el-color-picker
          v-model="componentStyle.borderColor"
          size="mini"
          @change="setStyleConfig($event, 'borderColor')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">样式:</div>
      <div class="config-tab-col-content">
        <el-select
          v-model="componentStyle.borderStyle"
          size="mini"
          clearable
          @change="setStyleConfig($event, 'borderStyle')"
        >
          <el-option
            v-for="item in borderStyleList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">边框弧度:</div>
      <div class="config-tab-col-content">
        <el-input-number
          v-model="componentStyle.borderRadius"
          size="mini"
          controls-position="right"
          :min="0"
          @change="setStyleConfig($event, 'borderRadius')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BorderConfig',
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
      borderStyleList: [
        {
          label: '实线',
          value: 'solid',
        },
        {
          label: '虚线',
          value: 'dashed',
        },
        {
          label: '点状',
          value: 'dotted',
        },
        {
          label: '双线',
          value: 'double',
        },
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
