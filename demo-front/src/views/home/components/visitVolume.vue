<template>
  <div class="visit">
    <Card>
      <p slot="title" class="card-title">
        <Icon type="md-map" style="margin-right:5px"></Icon>本年度预算使用情况
      </p>
<!--      <div slot="extra">-->
<!--        <DatePicker type="daterange" placeholder="选择日期范围" style="width: 250px"></DatePicker>-->
<!--      </div>-->
      <div style="height:273px;">
        <apexchart type="bar" height="280" :options="chartOptions" :series="series" />
      </div>
    </Card>
  </div>
</template>

<script>
import echarts from "echarts";
import { addDays, subDays } from "date-fns";
var zh = require("../../../libs/zh.json");
export default {
  name: "visitVolume",
  data() {
    return {
      series: [
        {
          name: "",
          data: []
        }
      ],
      chartOptions: {
        colors: ["#398af7", "#63a3f9", "#b3d1fd"],
        chart: {
          stacked: true,
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          },
          locales: [zh],
          defaultLocale: "zh"
        },
        plotOptions: {
          bar: {
            columnWidth: "40%",
            horizontal: false
          }
        },
        xaxis: {
          categories: []
        },
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            format: "MMM dd日"
          }
        }
      }
    };
  },
  methods: {
    init() {
      this.series = [
        {
          name: "预算",
          data: [98, 69, 88, 108, 146, 129, 110, 140, 112, 95, 87, 115]
        },
        {
          name: "使用",
          data: [95, 73, 90, 103, 158, 101, 0, 20, 8, 13, 27, 13, 27]
        }
      ];
      let categories = [];
      let num = 13;
      let start = subDays(new Date(), num);
      for (let i = 1; i < num; i++) {
        categories.push(i+ '月');
      }
      this.chartOptions.xaxis.categories = categories;
    }
  },
  created() {
    this.init();
  }
};
</script>
<style lang="less">
.visit {
  .ivu-card-head {
    border-bottom: none !important;
  }
}
</style>
