<template>
  <div class="e-line">
    <div ref="echart" class="e-chart" style="width: 100%; height: 100%;" />
  </div>
</template>

<script>
import { eLine } from "./index";

export default {
  name: "EBar",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      option: {
        title: {
          text: "柱状图",
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
          },
        ],
      },
    };
  },
  mounted() {
    this.echartInit();
  },
  methods: {
    echartInit() {
      eLine({
        dom: this.$refs.echart,
        option: this.option,
      });
    },
  },
};
</script>
