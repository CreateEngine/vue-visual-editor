<template>
  <div
    class="component-attr"
    v-if="(selectComponent.name = 'LGrid')"
    :item="selectComponent"
  >
    <div class="component-attr-item">
      <div class="item-title">
        文本内容：
      </div>
      <div class="item-content">
        <el-input
          v-model="item.options.datas"
          type="textarea"
          :rows="4"
          placeholder="请输入内容"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "LGridConfig",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["selectComponent"]),
  },
  methods: {
    ...mapMutations("editor", ["SET_STYLECONFIG"]),
    setStyleConfig(config) {
      this.SET_STYLECONFIG(config);
    },
  },
};
</script>

<style lang="scss" scoped>
.page-config-tips {
  margin: 10px;
  color: #666666;
  font-size: 13px;
}
</style>
