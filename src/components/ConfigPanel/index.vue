<template>
  <div class="config-panel">
    <div class="config-tabs">
      <el-tabs v-model="activeName">
        <el-tab-pane label="属性" name="attr">
          <div v-if="!selectComponent.category" class="config-tip">
            请选择需要配置的组件
          </div>
          <div
            v-if="
              ['businessComponent', 'chartComponent'].includes(
                selectComponent.category
              )
            "
            class="config-tip"
          >
            目前组件不支持属性修改
          </div>
          <component-attr
            v-if="
              selectComponent.category &&
                !['businessComponent', 'chartComponent'].includes(
                  selectComponent.category
                )
            "
          />
          <common-style
            v-if="
              selectComponent.category &&
                ![
                  'businessComponent',
                  'layoutComponent',
                ].includes(selectComponent.category)
            "
          />
        </el-tab-pane>
        <el-tab-pane label="事件" name="event">
          <div v-if="!selectComponent.category" class="config-tip">
            请选择需要绑定事件的组件
          </div>
          <div
            v-if="
              [
                'businessComponent',
                'layoutComponent',
              ].includes(selectComponent.category)
            "
            class="config-tip"
          >
            目前组件不支持事件绑定
          </div>
          <event-config
            v-if="
              selectComponent.category &&
                ![
                  'businessComponent',
                  'layoutComponent',
                ].includes(selectComponent.category)
            "
          />
        </el-tab-pane>
        <el-tab-pane label="页面配置" name="page">
          <page-config />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PageConfig from "./PageConfig";
import CommonStyle from "./CommonStyle";
import ComponentAttr from "./ComponentAttr";
import EventConfig from "./EventConfig";

export default {
  name: "ConfigPanel",
  components: {
    PageConfig,
    CommonStyle,
    ComponentAttr,
    EventConfig,
  },
  data() {
    return {
      activeName: "page",
    };
  },
  computed: {
    ...mapGetters(["selectComponent"]),
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
  .config-tip {
    padding: 10px;
    font-size: 13px;
    color: #666666;
  }
}
</style>
