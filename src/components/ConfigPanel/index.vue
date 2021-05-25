<template>
  <div class="config-panel">
    <div class="config-list">
      <div class="config-item">
        <div class="config-tab">
          <div class="config-tab-item selected">组件属性</div>
        </div>
        <ul>
          <li class="disabled">
            业务组件不可配置
          </li>
        </ul>
        <div class="config-data">
          组件data属性:<br>
          <div v-if="selectComponent.options && selectComponent.options.datas">
            <div
              v-for="(item, index) in selectComponent.options.datas"
              :key="index"
            >
              <el-input :value="item" @input="changeData($event, index)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfigPanel',
  props: {
    selectComponent: {
      type: Object,
      default: () => {
        return {};
      },
    },
    canvasComponentList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  methods: {
    changeData(event, index) {
      const tempSelectComponent = Object.assign({}, this.selectComponent);
      tempSelectComponent.options.datas[index] = event;
      this.setSelectComponentNoHistory(tempSelectComponent);
      this.modifyComponentList(tempSelectComponent);
    },
    setSelectComponentNoHistory(item) {
      this.$emit('setSelectComponentNoHistory', item);
    },
    modifyComponentList(newItem) {
      this.$emit('modifyComponentList', newItem);
    },
  },
};
</script>

<style lang="scss" scoped>
.config-panel {
  width: 250px;
  overflow: auto;
  .config-list {
    padding: 8px 0;
    width: 100%;
    .config-item {
      .config-tab {
        border-bottom: 2px solid #409eff;
        display: flex;
        justify-content: center;
        .config-tab-item {
          width: 50%;
          padding: 8px 12px;
          font-size: 14px;
          margin-bottom: -2px;
          text-align: center;
          // &.selected {
          //   border-bottom: 2px solid #409eff;
          // }
        }
      }
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          padding: 8px;
          font-size: 14px;
          &.disabled {
            color: #666666;
            text-align: center;
          }
        }
      }
    }
  }
  .config-data {
    display: none;
  }
}
</style>
