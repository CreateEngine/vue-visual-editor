<template>
  <div class="editor-content">
    <component-panel :canvas-component-list="canvasComponentList" />
    <canvas-panel
      :canvas-component-list="canvasComponentList"
      @deleteComponentList="deleteComponentList"
    />
    <config-panel
      :canvas-component-list="canvasComponentList"
      @modifyComponentList="modifyComponentList"
    />
  </div>
</template>

<script>
import CanvasPanel from '../CanvasPanel';
import ComponentPanel from '../ComponentPanel';
import ConfigPanel from '../ConfigPanel';

export default {
  name: 'EditorContent',
  components: {
    CanvasPanel,
    ComponentPanel,
    ConfigPanel,
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
    modifyComponentList(index, newItem) {
      this.$emit('modifyComponentList', index, newItem);
    },
    deleteComponentList(index) {
      this.$emit('deleteComponentList', index);
    },
  },
};
</script>

<style lang="scss" scoped>
.editor-content {
  display: flex;
  background: #ffffff;
  height: calc(100vh - 90px);
}
</style>
