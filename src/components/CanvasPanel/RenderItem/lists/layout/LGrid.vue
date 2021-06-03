<template>
  <div class="l-grid">
    <el-row
      type="flex"
      :gutter="item.options.gutter"
      :justify="item.options.justify"
      :align="item.options.align"
    >
      <l-grid-col
        v-for="(element, index) in item.options.columns"
        :key="index"
        :item="element"
      />
    </el-row>
  </div>
</template>

<script>
import LGridCol from "./LGridCol";

export default {
  name: "LGrid",
  components: {
    LGridCol,
  },
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
