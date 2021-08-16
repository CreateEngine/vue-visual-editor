<template>
  <div class="event-config">
    <div class="add-events">
      <el-dropdown>
        <el-button type="primary" size="small">
          添加事件<i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, index) in eventTypeList" :key="index">
            <div @click="addEvent(item.value)">{{ item.label }}</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="event-tips">
        事件在编辑模式下无效果
      </div>
    </div>
    <div
      v-show="selectComponent.events && selectComponent.events.length"
      class="events-list"
    >
      <el-collapse accordion>
        <el-collapse-item
          v-for="(item, index) in selectComponent.events"
          :key="index"
        >
          <template slot="title">
            <div class="events-item">
              <span class="events-item-name">事件 {{ index + 1 }}</span>
              <span class="events-item-type">{{
                item.type | getLabelText(eventTypeList)
              }}</span>
              <span
                class="events-item-btn"
                @click.stop.prevent="deleteEvent(index)"
                ><i class="el-icon-delete"
              /></span>
            </div>
          </template>
          <div class="el-animate-item">
            <div class="attr-item-edit-wrapper">
              <p class="attr-item-title">跳转链接：</p>
              <div class="attr-item-edit-input">
                <el-input
                  v-model="item.url"
                  type="textarea"
                  :rows="3"
                  placeholder="请输入跳转链接"
                  @change="updataComponent(selectComponent)"
                />
              </div>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "EventConfig",
  filters: {
    /**
     * 根据value获取label
     * @param value
     * @param list 对象列表
     */
    getLabelText(value, list, label = "label") {
      const data = list.find((v) => v.value === value);
      if (data) {
        return data[label];
      } else {
        return "";
      }
    },
  },
  computed: {
    ...mapGetters(["selectComponent", "eventTypeList", "canvasComponentList"]),
  },
  methods: {
    ...mapMutations("editor", ["SET_SELECTCOMPONENT", "MODIFYCOMPONENT"]),
    /**
     * 添加事件
     * @param type 事件名称
     */
    addEvent(type) {
      const currentRenderId = this.selectComponent.renderId;
      this.canvasComponentList.forEach((itemOuter) => {
        if (itemOuter.renderId === currentRenderId) {
          this.addNestItemEvent(type, itemOuter);
        }
        if (itemOuter.options && itemOuter.options.columns) {
          itemOuter.options.columns.forEach((itemInner) => {
            itemInner.children.forEach((item) => {
              if (item.renderId === currentRenderId) {
                this.addNestItemEvent(type, item);
              }
            });
          });
        }
      });
    },
    addNestItemEvent(type, item) {
      const eventDefaultData = {
        type: type,
        url: "",
      };
      if (!item.events) {
        item.events = [];
      }
      // 不可重复添加事件
      let isExit = false;
      item.events.forEach((item) => {
        if (item.type === type) {
          isExit = true;
        }
      });
      if (isExit === true) {
        this.$message.error("不可重复添加该事件！");
        return;
      }
      item.events.push(eventDefaultData);
      this.updataComponent(item);
    },
    /**
     * 删除事件
     * @param index
     */
    deleteEvent(index) {
      const selectComponent = this.selectComponent;
      selectComponent.events.splice(index, 1);
      this.updataComponent(selectComponent);
    },
    updataComponent(selectComponent) {
      this.MODIFYCOMPONENT(JSON.parse(JSON.stringify(selectComponent)));
    },
  },
};
</script>

<style lang="scss" scoped>
.event-config {
  padding: 10px;
  .add-events {
    .event-tips {
      margin: 10px 0;
      color: #666666;
      font-size: 13px;
    }
  }

  .events-list {
    margin: 10px 0;
    .events-item {
      display: flex;
      flex: 1;
    }
    .events-item-type {
      flex: 1;
      text-align: center;
    }
  }
}
</style>
