<template>
  <div class="component-attr">
    <div class="component-attr-item">
      <div class="item-title">
        图片Url：
      </div>
      <div class="item-content">
        <el-upload
          class="image-uploader"
          :action="uploadUrl()"
          :show-file-list="false"
          accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
          :on-success="handleAvatarSuccess"
        >
          <img
            v-if="item.options.datas"
            :src="item.options.datas"
            class="image-preview"
          >
          <i v-else class="el-icon-plus image-uploader-icon" />
        </el-upload>
        <el-input
          v-model="item.options.datas"
          type="textarea"
          :rows="4"
          placeholder="请输入图片链接"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MImage',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    uploadUrl() {
      // return `https://appjavatest.linkdood.cn:10669/mqt-manager-center/api/files/logo`;
      // 获取访问 url 中的端口号
      const host = window.location.host;
      // 判断是http协议还是https协议
      const ishttps = document.location.protocol;
      return `${ishttps}//${host}/mqt-manager-center/api/files/logo`;
    },
    handleAvatarSuccess(res) {
      // 获取访问 url 中的端口号
      const host = window.location.host;
      // 判断是http协议还是https协议
      const ishttps = document.location.protocol;
      this.item.options.datas = `${ishttps}//${host}${res.url}`;
      // this.item.options.datas = `https://appjavatest.linkdood.cn:10669${res.url}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.component-attr {
  padding: 10px;
  .item-title {
    font-size: 13px;
  }
  .item-content {
    margin-top: 10px;
  }
}
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
.image-url {
  margin-top: 10px;
  width: 145px;
}
</style>
