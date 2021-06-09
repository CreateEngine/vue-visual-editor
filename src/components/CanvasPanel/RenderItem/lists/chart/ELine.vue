<template>
  <div class="e-line">
    <div ref="echart" class="e-chart" style="width: 100%; height: 100%;" />
  </div>
</template>

<script>
import { eLine } from "./index";

export default {
  name: "ELine",
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
          text: "折线图",
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
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
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
