<template>
  <el-collapse v-model="activeName" class="page-config">
    <div class="page-config-tips">
      页面配置在编辑模式下无效果
    </div>
    <el-collapse-item title="背景配置" name="background">
      <background-config
        :background-style="globalConfig.style"
        @setStyleConfig="setStyleConfig"
      />
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';
import BackgroundConfig from '../BackgroundConfig';

export default {
  name: 'PageConfig',
  components: {
    BackgroundConfig,
  },
  data() {
    return {
      activeName: 'background',
    };
  },
  computed: {
    ...mapGetters(['globalConfig']),
  },
  methods: {
    ...mapMutations('editor', ['SET_STYLECONFIG']),
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
