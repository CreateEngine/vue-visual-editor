<template>
  <div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">背景颜色:</div>
      <div class="config-tab-col-content">
        <el-color-picker
          :value="globalConfig.style.backgroundColor"
          size="small"
          @change="setStyleConfig($event,'backgroundColor')"
        />
      </div>
    </div>
    <div class="config-tab-col">
      <div class="config-tab-col-title">背景图片:</div>
      <div class="config-tab-col-content">
        <div class="background-image">
          <el-upload
            class="image-uploader"
            :action="uploadUrl()"
            :show-file-list="false"
            accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
            :on-success="handleAvatarSuccess"
          >
            <img
              v-if="globalConfig.style.backgroundImage"
              :src="globalConfig.style.backgroundImage"
              class="image-preview"
            >
            <i v-else class="el-icon-plus image-uploader-icon" />
          </el-upload>
          <el-input
            :value="globalConfig.style.backgroundImage"
            class="image-url"
            type="textarea"
            :rows="3"
            placeholder="请输入图片地址"
            @input="setStyleConfig($event,'backgroundImage')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BackgroundConfig',
  props: {
    globalConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  methods: {
    uploadUrl() {
      // // 获取访问 url 中的端口号
      // const host = window.location.host;
      // // 判断是http协议还是https协议
      // const ishttps = document.location.protocol;
      // return `${ishttps}//${host}/mqt-manager-center/api/files/logo`;
      return `https://appjavatest.linkdood.cn:10669/mqt-manager-center/api/files/logo`;
    },
    handleAvatarSuccess(res) {
      this.setStyleConfig(`https://appjavatest.linkdood.cn:10669${res.url}`, 'backgroundImage');
    },
    setStyleConfig(val, key) {
      this.$emit('setStyleConfig', {
        [key]: val,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .image-uploader {
    /deep/ .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    /deep/ .el-upload:hover {
      border-color: #409eff;
    }
    .image-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 120px;
      height: 120px;
      line-height: 120px;
      text-align: center;
    }
    .image-preview {
      width: 120px;
      height: 120px;
      display: block;
    }
  }
  .image-url{
    margin-top: 10px;
    width: 145px;
  }
</style>
