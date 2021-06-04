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
</style>
