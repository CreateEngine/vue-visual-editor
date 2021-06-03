<template>
  <div class="l-grid">
    <el-row
      type="flex"
      :gutter="item.options.gutter"
      :justify="item.options.justify"
      :align="item.options.align"
    >
      <el-col
        :span="24"
        class="layout-col"
        v-for="col in item.options.columns"
        :key="col"
      >
        <div class="layout-col-list" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LGrid",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.l-grid {
  padding: 5px;
  overflow: hidden;
}
.layout-col {
  padding: 5px;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px dashed #999;
  .layout-col-list {
    min-height: 50px;
    min-width: 50px;
    border: 2px inset rgba(0, 0, 0, 0.1);
    background: #fff;
  }
}
</style>
