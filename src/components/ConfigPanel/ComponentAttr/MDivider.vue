<template>
  <div class="component-attr">
    <div class="component-attr-item">
      <div class="item-title" style="color:#666666;">
        暂无组件属性项
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MDivider',
  props: {
    item: {
      type: Object,
      required: true,
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
