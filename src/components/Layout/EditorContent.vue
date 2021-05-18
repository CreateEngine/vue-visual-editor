<template>
  <div class="editor-content">
    <component-panel :canvas-component-list="canvasComponentList" />
    <canvas-panel
      :canvas-component-list="canvasComponentList"
      :select-component="selectComponent"
      @setSelectComponent="setSelectComponent"
      @deleteComponentList="deleteComponentList"
    />
    <config-panel
      :canvas-component-list="canvasComponentList"
      :select-component="selectComponent"
      @setSelectComponentNoHistory="setSelectComponentNoHistory"
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
    selectComponent: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    setSelectComponent(item) {
      this.$emit('setSelectComponent', item);
    },
    setSelectComponentNoHistory(item) {
      this.$emit('setSelectComponentNoHistory', item);
    },
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
