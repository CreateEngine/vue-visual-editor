<template>
  <div class="component-category">
    <div class="category-title">{{ categoryTitle }}</div>
    <draggable
      tag="ul"
      :list="datas"
      :group="{ name: 'component', pull: 'clone', put: false }"
      :clone="cloneComponent"
      :move="handleMove"
      @end="handleMoveEnd"
      @start="handleMoveStart"
    >
      <li v-for="item in datas" :key="item.name">
        <a><i class="icon iconfont" :class="item.icon" /><span>{{
          componentNameMap[item.name]
        }}</span></a>
      </li>
    </draggable>
  </div>
</template>
<script>
import Draggable from 'vuedraggable';
import { category } from '../../config/component.js';

export default {
  name: 'CategoryWidget',
  components: {
    Draggable,
  },
  props: {
    datas: {
      type: Array,
      required: true,
    },
    canvasComponentList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    category: {
      type: String,
      required: true,
    },
    componentNameMap: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectDragComponent: {},
      isClone: true,
    };
  },
  computed: {
    categoryTitle() {
      return category[this.category];
    },
  },
  methods: {
    handleMoveEnd(evt) {
      console.log('end', evt, this.canvasComponentList);
      // if (this.isClone === false) {
      //   this.$message.error('组件已存在，不可重复拖拽！');
      //   this.isClone = true;
      // }
    },
    handleMoveStart({ oldIndex }) {
      this.selectDragComponent = this.datas[oldIndex];
    },
    handleMove() {
      // this.canvasComponentList.forEach(item => {
      //   if (item.name === this.selectDragComponent.name) {
      //     this.isClone = false;
      //   }
      // });
      return this.isClone;
    },
    cloneComponent(item) {
      return {
        ...item,
        ...{
          category: this.category,
          renderId: item.name + '-' + Date.now(),
        },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.component-category {
  width: 100%;
  overflow: auto;
  .category-title {
    padding: 8px 12px;
    font-size: 13px;
  }
  ul {
    position: relative;
    padding: 0 10px 10px;
    margin: 0;
    li {
      font-size: 12px;
      display: block;
      line-height: 26px;
      position: relative;
      left: 0;
      margin: 5px 1%;
      border: 1px solid #f4f6fc;
      &:hover {
        color: #409eff;
        border: 1px dashed #409eff;
        .preview-image {
          opacity: 1;
        }
      }
      & > a {
        display: block;
        cursor: move;
        background: #f4f6fc;
        border: 1px solid #f4f6fc;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .icon {
          margin-right: 6px;
          margin-left: 8px;
          font-size: 14px;
          display: inline-block;
          vertical-align: middle;
        }
        span {
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
}
.ghost {
  background: #f56c6c;
  border: 2px solid #f56c6c;
  outline-width: 0;
  height: 3px;
  box-sizing: border-box;
  font-size: 0;
  content: '';
  overflow: hidden;
  padding: 0;
}
</style>
