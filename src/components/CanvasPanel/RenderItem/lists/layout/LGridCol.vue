<template>
  <el-col :span="item.span" class="layout-col">
    <div class="layout-col-list">
      <draggable
        id="childrenComponentList"
        :list="item.children"
        class="components-list"
        group="component"
        ghost-class="ghost"
        animation="200"
        @change="changeComponentList"
      >
        <transition-group>
          <div
            v-for="(element, index) in item.children"
            :key="element.renderId"
            class="darg-item"
            :class="{ active: selectComponent.renderId === element.renderId }"
            @click.stop="setSelectComponent({ ...element, ...{ index: index } })"
          >
            <render-item :item="element" />
            <div
              v-if="selectComponent.renderId == element.renderId"
              class="component-view-action"
            >
              <i
                class="icon iconfont iconshanchu"
                @click.stop="deleteComponentList(index)"
              />
            </div>
            <div
              v-if="selectComponent.renderId == element.renderId"
              class="component-view-drag"
            >
              <i class="icon iconfont iconyidong" />
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>
  </el-col>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import draggable from "vuedraggable";
import RenderItem from "./../../RenderItem";

export default {
  name: "LGridCol",
  components: {
    draggable,
    RenderItem,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["selectComponent", "canvasComponentList", "historyList"]),
  },
  methods: {
    deleteComponentList(index) {
      this.DELETECHILDRENCOMPONENT(index);
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
    ...mapMutations("editor", [
      "SET_SELECTCOMPONENT",
      "DELETECHILDRENCOMPONENT",
      "ADDHISTORY",
      "MODIFYCOMPONENT",
    ]),
    setSelectComponent(item) {
      this.SET_SELECTCOMPONENT(item);
      this.ADDHISTORY();
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
    height: 100%;
  }
}
#childrenComponentList > span {
  display: block;
  min-height: 50px;
}
.render-list {
  max-width: 440px;
  margin: 20px auto;
  .empty-data {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 2;
    text-align: center;
    font-size: 20px;
    color: #ccc;
    transform: translate(-50%, -50%);
  }
  .components-list {
    position: relative;
    & > span {
      display: block;
    }
  }
  .darg-item {
    // padding-bottom: 18px;
    position: relative;
    border: 1px dashed hsla(0, 0%, 66.7%, 0.7);
    background-color: rgba(236, 245, 255, 0.3);
    margin: 5px;
    &.active {
      outline: 2px solid #409eff;
      border: 1px solid #409eff;
    }
    &:hover {
      background: #ecf5ff;
      outline: 1px solid #409eff;
      outline-offset: 0px;
    }
    &.ghost {
      background: #f56c6c;
      border: 2px solid #f56c6c;
      outline-width: 0;
      height: 3px;
      box-sizing: border-box;
      font-size: 0;
      content: "";
      overflow: hidden;
      padding: 0;
    }
    .component-view-action {
      position: absolute;
      right: 0;
      bottom: 0;
      height: 28px;
      line-height: 28px;
      background: #409eff;
      z-index: 9;
      i {
        font-size: 14px;
        color: #fff;
        margin: 0 5px;
        cursor: pointer;
      }
    }
    .component-view-drag {
      position: absolute;
      left: -2px;
      top: -2px;
      bottom: -18px;
      height: 28px;
      line-height: 28px;
      background: #409eff;
      z-index: 9;
      cursor: move;
      i {
        font-size: 14px;
        color: #fff;
        margin: 0 5px;
        cursor: pointer;
        cursor: move;
      }
    }
    &.component-grid {
      &.active {
        outline: 2px solid #e6a23c;
        border: 1px solid #e6a23c;
      }
      &:hover {
        background: #ecf5ff;
        outline: 1px solid #e6a23c;
        outline-offset: 0px;
      }
      .component-view-action {
        background: #e6a23c;
      }
      .component-view-drag {
        background: #e6a23c;
      }
    }
  }
}
</style>
