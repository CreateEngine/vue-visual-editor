<template>
  <el-col :span="item.span" class="layout-col">
    <draggable
      id="componentsLists"
      :list="item.children"
      class="components-list"
      group="component"
      handle=".component-view-drag"
      ghost-class="ghost"
      animation="200"
    >
      <transition-group>
        <div class="layout-col-list" v-for="(el, i) in item.children" :key="i">
         <render-component :item="el"/>
        </div>
      </transition-group>
    </draggable>
  </el-col>
</template>

<script>
import { mapMutations } from "vuex";
import draggable from "vuedraggable";
import renderComponent from '../../index.vue'
console.log(renderComponent)
export default {
  name: "LGridCol",
  components: {
    draggable,
    renderComponent
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapMutations("editor", [
      "SET_SELECTCOMPONENT",
      "DELETECOMPONENT",
      "ADDHISTORY",
      "MODIFYCOMPONENT",
    ]),
    setSelectComponent(item) {
      this.SET_SELECTCOMPONENT(item);
      this.ADDHISTORY();
    },
    changeComponentList(evt) {
      if (evt.added) {
        this.setSelectComponent({
          ...evt.added.element,
          ...{ index: evt.added.newIndex },
        });
      }
      if (evt.moved) {
        this.setSelectComponent({
          ...evt.moved.element,
          ...{ index: evt.moved.newIndex },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.l-grid {
  padding: 5px;
  overflow: hidden;
}
.layout-col {
  min-height: 50px;
  min-width: 50px;
  padding: 5px;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px dashed #999;
  .layout-col-list {
    border: 2px inset rgba(0, 0, 0, 0.1);
    background: #fff;
    min-height: 50px;
  }
}
#componentsLists > span {
  display: block;
  min-height: 50px;
}
</style>
