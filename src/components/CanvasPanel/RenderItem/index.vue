<template>
  <div ref="renderBox" class="component-render">
    <component
      :is="item.name"
      ref="renderComponent"
      :item="item"
    />
  </div>
</template>
<script>
import ADatePicker from './lists/ant/ADatePicker';
import APagination from './lists/ant/APagination';
export default {
  name: 'RenderItem',
  components: {
    ADatePicker,
    APagination
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      scale: 2,
      height: 'auto',
    };
  },
  computed: {
    componentStyle() {
      return {
        zoom: this.scale,
      };
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
      window.addEventListener('resize', this.setScale, false);
    },
  },
};
</script>
