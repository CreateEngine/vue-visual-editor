<template>
  <div class="m-button">
    <div class="m-button-text">
      1111
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
.m-button {
  display: flex;
  align-items: center;
  .m-button-text {
    flex: 1;
  }
}
</style>
