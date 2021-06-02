<template>
  <div class="m-text">
    {{ item.options.datas }}
  </div>
</template>

<script>
export default {
  name: 'MText',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.m-text {
  white-space: normal;
  word-wrap: break-word;
}
</style>
