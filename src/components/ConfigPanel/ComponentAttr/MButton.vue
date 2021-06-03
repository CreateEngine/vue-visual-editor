<template>
  <div class="component-attr">
    <div class="component-attr-item">
      <div class="item-title">
        文本内容：
      </div>
      <div class="item-content">
        <el-input
          v-model="item.options.datas"
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MButton',
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
