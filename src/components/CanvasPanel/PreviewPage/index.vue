<template>
  <div class="preview-box">
    <iframe
      v-if="type === 'preview'"
      :src="src"
      width="304"
      height="500"
      frameborder="no"
      border="0"
      marginwidth="0"
      marginheight="0"
      scrolling="no"
      allowtransparency="yes"
    />
    <screenshot-page v-else />
  </div>
</template>
<script>
import ScreenshotPage from './ScreenshotPage';

export default {
  name: 'PreviewPage',
  components: {
    ScreenshotPage,
  },
  props: {
    type: {
      type: String,
      default: () => {
        return 'preview';
      },
    },
  },
  data() {
    return {
      src: `${window.location.pathname}#/preview-page`,
    };
  },
};
</script>

<style lang="scss" scoped>
.preview-box {
  width: 350px;
  height: 640px;
  margin: 0 auto;
  position: relative;
  padding: 60px 20px;
  border-radius: 40px;
  background-color: #000;
  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
  }
}
</style>
