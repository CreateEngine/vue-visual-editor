import * as echarts from "echarts";

export function eLine({ dom, option }) {
   echarts.init(dom).setOption(option);
}
