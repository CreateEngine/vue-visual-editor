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
          text: "饼图",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
              { value: 300, name: "视频广告" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
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
