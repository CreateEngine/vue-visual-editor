<template>
  <div class="m-slider">
    <el-carousel :interval="5000" arrow="never" :height="picHeight">
      <el-carousel-item
        v-for="(listItem, index) in item.options.datas"
        :key="index"
      >
        <a v-if="type === 'preview' && listItem.link" :href="listItem.link">
          <img
            :src="listItem.url"
            class="slider-image"
            crossorigin="anonymous"
          />
        </a>
        <img
          v-else
          :src="listItem.url"
          class="slider-image"
          crossorigin="anonymous"
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "MSlider",
  props: {
    type: {
      type: String,
      default: () => {
        return "canvas";
      },
    },
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    picHeight() {
      if (this.item.options.commonStyle && this.item.options.commonStyle.height) {
        return this.item.options.commonStyle.height + "px";
      }
      if (this.type === "preview") {
        return "130px";
      }
      return "180px";
    },
  },
};
</script>

<style lang="scss" scoped>
.m-slider {
  white-space: normal;
  word-wrap: break-word;
  /deep/ .el-carousel__button {
    width: 4px;
    height: 4px;
    border-radius: 50%;
  }
  .slider-image {
    width: 100%;
    height: 100%;
  }
}
</style>
