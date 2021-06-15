<template>
  <div class="m-image">
    <img :src="item.options.datas" crossorigin="anonymous">
  </div>
</template>

<script>
export default {
  name: 'MImage',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.m-image {
  white-space: normal;
  word-wrap: break-word;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
