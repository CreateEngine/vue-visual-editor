<template>
  <div class="component-attr">
    <div class="component-attr-item">
      <el-collapse class="page-config">
        <el-collapse-item title="图片列表 (建议尺寸：410*230)" name="size">
          <div v-for="(listItem, index) in item.options.datas" :key="index" style="padding: 10px;">
            <div class="item-url-col">
              <div class="item-url-title">
                图片Url：
              </div>
              <div class="item-url-content">
                <el-upload
                  class="image-uploader"
                  :action="uploadUrl()"
                  :show-file-list="false"
                  accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                  :on-success="handleUrlSuccess"
                  @click.native="getCurrentIndex(index)"
                >
                  <img
                    v-if="listItem.url"
                    :src="listItem.url"
                    class="image-preview"
                  >
                  <i v-else class="el-icon-plus image-uploader-icon" />
                </el-upload>
                <el-input
                  v-model="listItem.url"
                  type="textarea"
                  :rows="3"
                  placeholder="请输入图片链接"
                  style="margin-top: 5px;"
                />
              </div>
            </div>
            <div class="item-url-col">
              <div class="item-url-title">
                跳转Url：
              </div>
              <div class="item-url-content">
                <el-input
                  v-model="listItem.link"
                  type="textarea"
                  :rows="3"
                  placeholder="请输入跳转链接"
                />
              </div>
            </div>
            <div class="item-operate">
              <span
                v-if="index === item.options.datas.length - 1"
                @click="addItem"
              ><i
                class="el-icon-circle-plus-outline"
              /></span>
              <span
                v-if="item.options.datas.length > 1"
                @click="deleteItem(index)"
              ><i
                class="el-icon-remove-outline"
              /></span>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MSlider',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { currentIndex: 0 };
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
    handleUrlSuccess(res) {
      // 获取访问 url 中的端口号
      const host = window.location.host;
      // 判断是http协议还是https协议
      const ishttps = document.location.protocol;
      this.item.options.datas[this.currentIndex].url = `${ishttps}//${host}${res.url}`;
      // this.item.options.datas[
      //   this.currentIndex
      // ].url = `https://appjavatest.linkdood.cn:10669${res.url}`;
    },
    addItem() {
      // FIXME（sf）默认图片 暂时放在服务器上
      const tempItem = {
        url:
          'https://appjavatest.linkdood.cn:10669/mqt-manager-center/api/static-files/upload/demo.png',
        link: '',
      };
      this.item.options.datas.push(tempItem);
    },
    deleteItem(index) {
      this.item.options.datas.splice(index, 1);
    },
    getCurrentIndex(index) {
      this.currentIndex = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.component-attr {
  .item-title-long {
    font-size: 13px;
    margin-bottom: 10px;
  }
  .item-title {
    font-size: 13px;
  }
  .item-url-col {
    margin-top: 15px;
  }
  .item-url-title {
    width: 70px;
    font-size: 12px;
  }
  .item-operate {
    width: 100%;
    margin-top: 10px;
    text-align: right;
    span {
      padding: 5px;
      font-size: 16px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
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
.item-url-col {
  display: flex;
}
</style>
