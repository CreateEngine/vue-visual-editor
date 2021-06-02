<template>
  <div id="canvasPanel" class="canvas-panel">
    <render-list
      id="renderCanvas"
      :canvas-component-list="canvasComponentList"
      @deleteComponentList="deleteComponentList"
    />
  </div>
</template>
<script>

import RenderList from './RenderList.vue';

export default {
  name: 'CanvasPanel',
  components: {
    RenderList,
  },
  props: {
    canvasComponentList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    deleteComponentList(index) {
      this.$emit('deleteComponentList', index);
    },
  },
};
</script>
<style lang="scss" scoped>
.canvas-panel {
  position: relative;
  flex: 1;
  background: #fafafa;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  overflow: auto;
}
</style>
