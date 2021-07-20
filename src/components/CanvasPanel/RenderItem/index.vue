<template>
  <div ref="renderBox" class="component-render">
    <component
      :is="item.name"
      ref="renderComponent"
      :item="item"
      :style="commonStyle"
      style="max-width:100%;"
      :type="type"
      @click.native="supportEvents"
    />
  </div>
</template>
<script>
// 组件自动注册在main.js文件实现
export default {
  name: "RenderItem",
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
    support: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      scale: 2,
      height: "auto",
    };
  },
  computed: {
    componentStyle() {
      return {
        zoom: this.scale,
      };
    },
    commonStyle() {
      const commonStyle = Object.assign({}, this.item.options.commonStyle);
      let unitScale = 1;
      // if (this.type === "preview") {
      //   commonStyle.unit = "vw";
      //   unitScale = 1 / 7.5;
      // }
      // 宽高
      commonStyle.width = commonStyle.width
        ? commonStyle.width * unitScale + commonStyle.unit
        : "";
      commonStyle.height = commonStyle.height
        ? commonStyle.height * unitScale + commonStyle.unit
        : "";
      // 外边距
      commonStyle.marginTop = commonStyle.marginTop
        ? commonStyle.marginTop * unitScale + commonStyle.unit
        : "";
      commonStyle.marginBottom = commonStyle.marginBottom
        ? commonStyle.marginBottom * unitScale + commonStyle.unit
        : "";
      commonStyle.marginLeft = commonStyle.marginLeft
        ? commonStyle.marginLeft * unitScale + commonStyle.unit
        : "";
      commonStyle.marginRight = commonStyle.marginRight
        ? commonStyle.marginRight * unitScale + commonStyle.unit
        : "";
      // 内边距
      commonStyle.paddingTop = commonStyle.paddingTop
        ? commonStyle.paddingTop * unitScale + commonStyle.unit
        : "";
      commonStyle.paddingBottom = commonStyle.paddingBottom
        ? commonStyle.paddingBottom * unitScale + commonStyle.unit
        : "";
      commonStyle.paddingLeft = commonStyle.paddingLeft
        ? commonStyle.paddingLeft * unitScale + commonStyle.unit
        : "";
      commonStyle.paddingRight = commonStyle.paddingRight
        ? commonStyle.paddingRight * unitScale + commonStyle.unit
        : "";
      // 边框
      commonStyle.borderWidth = commonStyle.borderWidth
        ? commonStyle.borderWidth * unitScale + commonStyle.unit
        : "";
      commonStyle.borderRadius = commonStyle.borderRadius
        ? commonStyle.borderRadius * unitScale + commonStyle.unit
        : "";
      // 阴影
      commonStyle.hShadow = commonStyle.hShadow
        ? commonStyle.hShadow * unitScale + commonStyle.unit
        : "";
      commonStyle.vShadow = commonStyle.vShadow
        ? commonStyle.vShadow * unitScale + commonStyle.unit
        : "";
      commonStyle.blurShadow = commonStyle.blurShadow
        ? commonStyle.blurShadow * unitScale + commonStyle.unit
        : "";
      commonStyle.spreadShadow = commonStyle.spreadShadow
        ? commonStyle.spreadShadow * unitScale + commonStyle.unit
        : "";
      commonStyle.boxShadow =
        commonStyle.hShadow +
        " " +
        commonStyle.vShadow +
        " " +
        commonStyle.blurShadow +
        " " +
        commonStyle.spreadShadow +
        " " +
        commonStyle.colorShadow;
      // 字体
      commonStyle.fontSize = commonStyle.fontSize
        ? commonStyle.fontSize * unitScale + commonStyle.unit
        : "";
      // 背景图
      commonStyle.backgroundImage = `url(${commonStyle.backgroundImage})`;
      return commonStyle;
    },
  },
  mounted() {
    this.setScale();
    this.observerBoxSize();
  },
  methods: {
    setScale() {
      this.scale =
        this.$refs.renderBox.clientWidth /
        this.$refs.renderComponent.$el.clientWidth;
    },
    observerBoxSize() {
      window.addEventListener("resize", this.setScale, false);
    },
    supportEvents() {
      // TODO 目前只支持跳转链接事件
      if (this.support.includes("events")) {
        let isPreventComponentEvent = false;
        // 轮播图事件阻止
        if (this.item.name === "MSlider") {
          this.item.options.datas.forEach((item) => {
            if (item.link) {
              isPreventComponentEvent = true;
            }
          });
        }
        if (isPreventComponentEvent) {
          return;
        }
        const url = this.item.events && this.item.events[0].url;
        if (url) {
          window.location.href = url;
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.component-render {
  min-height: 26px;
}
</style>
