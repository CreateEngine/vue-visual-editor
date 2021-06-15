<template>
  <div class="m-divider" />
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
.m-divider {
  width: 100%;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
}
</style>
