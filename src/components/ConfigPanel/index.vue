<template>
  <div class="config-panel">
    <div class="config-tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="属性" name="attr">
          <component-attr />
          <common-style />
        </el-tab-pane>
        <el-tab-pane label="事件" name="event">
          <event-config />
        </el-tab-pane>
        <el-tab-pane label="页面配置" name="page">
          <page-config />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import PageConfig from './PageConfig';
import CommonStyle from './CommonStyle';
import ComponentAttr from './ComponentAttr';
import EventConfig from './EventConfig';

export default {
  name: 'ConfigPanel',
  components: {
    PageConfig,
    CommonStyle,
    ComponentAttr,
    EventConfig,
  },
  data() {
    return {
      activeName: 'page',
    };
  },
};
</script>

<style lang="scss" scoped>
.config-panel {
  width: 300px;
  overflow: auto;
  .config-tabs {
    /deep/ .el-tabs__header {
      margin: 0;
    }
    /deep/ .el-tabs__item {
      padding: 0 10px;
    }
    /deep/ .el-collapse-item__header {
      padding-left: 10px;
      font-size: 14px;
    }
    /deep/ .config-tab-col {
      display: flex;
      justify-content: space-around;
      padding: 10px;
      .config-tab-col-title {
        width: 60px;
        font-size: 13px;
      }
      .config-tab-col-content {
        flex: 1;
        padding-left: 10px;
      }
    }
  }
  .config-list {
    padding: 8px 0;
    width: 100%;
    .config-item {
      .config-tab {
        border-bottom: 2px solid #409eff;

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
