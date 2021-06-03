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
        列配置项：
      </div>
      <div class="item-content">
        <draggable
          tag="ul"
          :list="item.options.columns"
          v-bind="{
            group: { name: 'options' },
            ghostClass: 'ghost',
            handle: '.drag-item',
          }"
          handle=".drag-item"
        >
          <li v-for="(col, index) in item.options.columns" :key="index">
            <i
              class="drag-item"
              style="font-size: 16px;margin: 0 5px;cursor: move;"
              ><i class="el-icon-rank"></i
            ></i>
            <el-input
              placeholder="栅格数"
              size="mini"
              style="width: 100px;"
              type="number"
              v-model.number="col.span"
            ></el-input>

            <el-button
              v-if="item.options.columns.length > 1 || index !== 0"
              @click="handleRemoveColumn(index)"
              circle
              plain
              type="danger"
              size="mini"
              icon="el-icon-minus"
              style="padding: 4px;margin-left: 5px;"
            ></el-button>
          </li>
        </draggable>
        <div style="margin-left: 22px;">
          <el-button type="text" @click="handleAddColumn">添加列</el-button>
        </div>
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
        <el-select v-model="item.options.align" size="mini">
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
import draggable from "vuedraggable";

export default {
  name: "LGridConfig",
  components: {
    draggable,
  },
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
    handleRemoveColumn(index) {
      this.item.options.columns.splice(index, 1);
    },
    handleAddColumn() {
      this.item.options.columns.push({
        span: 0,
        children: [],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.component-attr-item {
  margin-bottom: 10px;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      margin-bottom: 10px;
    }
  }
}
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
