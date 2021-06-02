<template>
  <div class="component-panel">
    <div class="component-list">
      <category-widget
        :datas="basicComponent"
        :canvas-component-list="canvasComponentList"
        :component-name-map="componentNameMap"
        category="basicComponent"
      />
            <category-widget
        :datas="functionalComponent"
        :canvas-component-list="canvasComponentList"
        :component-name-map="componentNameMap"
        category="functionalComponent"
      />
      <category-widget
        :datas="businessComponent"
        :canvas-component-list="canvasComponentList"
        :component-name-map="componentNameMap"
        category="businessComponent"
      />
    </div>
  </div>
</template>
<script>
import {  basicComponent,functionalComponent, businessComponent, componentNameMap } from '../../config/component.js';
import CategoryWidget from './CategoryWidget.vue';

export default {
  name: 'ComponentPanel',
  components: {
    CategoryWidget,
  },
  props: {
    canvasComponentList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      basicComponent,
      functionalComponent,
      businessComponent,
      componentNameMap,
    };
  },
};
</script>

<style lang="scss" scoped>
.component-panel {
  width: 200px;
  overflow: auto;
  .component-list {
    padding: 8px 0;
    width: 100%;
  }
}
</style>
