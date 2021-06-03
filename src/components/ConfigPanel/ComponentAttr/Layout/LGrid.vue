<template>
  <div class="component-attr" :item="selectComponent">
    <div class="component-attr-item">
      <div class="item-title">
        栅格间隔：
      </div>
      <div class="item-content">
        <el-input-number
          v-model="item.options.gutter"
          size="mini"
          controls-position="right"
          :step="10"
          :min="0"
          @change="setStyleConfig($event, 'fontWeight')"
        />
      </div>
    </div>
    <div class="component-attr-item">
      <div class="item-title">
        水平排列方式：
      </div>
      <div class="item-content">
        <el-select v-model="item.options.justify" size="mini">
          <el-option value="start" label="左对齐"></el-option>
          <el-option value="end" label="右对齐"></el-option>
          <el-option value="center" label="居中"></el-option>
          <el-option value="space-around" label="两侧间隔相等"></el-option>
          <el-option value="space-between" label="两端对齐"></el-option>
        </el-select>
      </div>
    </div>
    <div class="component-attr-item">
      <div class="item-title">
        垂直排列方式：
      </div>
      <div class="item-content">
        <el-select v-model="item.options.align"  size="mini">
          <el-option value="top" label="顶部对齐"></el-option>
          <el-option value="middle" label="居中"></el-option>
          <el-option value="bottom" label="底部对齐"></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "LGridConfig",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["selectComponent"]),
  },
  methods: {
    ...mapMutations("editor", ["SET_STYLECONFIG"]),
    setStyleConfig(config) {
      this.SET_STYLECONFIG(config);
    },
  },
};
</script>

<style lang="scss" scoped>
.component-attr {
  padding: 10px;
  .item-title {
    font-size: 13px;
  }
  .item-content {
    margin-top: 10px;
  }
}
</style>
