<template>
  <div>
    <div class="config-title">组件属性</div>
    <component
      :is="selectComponent.name"
      ref="renderComponent"
      :item="selectComponent"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MText from './MText';
import MImage from './MImage';
import MButton from './MButton';
import MDivider from './MDivider';
import MSlider from './MSlider';
import LGrid from './Layout/LGrid';

export default {
  name: 'ComponentAttr',
  components: {
    MText,
    MImage,
    MButton,
    MDivider,
    MSlider,
    LGrid
  },
  computed: {
    ...mapGetters(['selectComponent']),
  },
};
</script>
<style lang="scss" scoped>
.config-title {
  padding: 10px;
  font-weight: 600;
  font-size: 14px;
}
</style>
