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
        <apexchart type="line" height="280" :options="chartOptions" :series="series" />
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
            chart: {
                height: 350,
                type: 'line',
                dropShadow: {
                    enabled: true,
                    color: '#000',
                    top: 18,
                    left: 7,
                    blur: 10,
                    opacity: 0.2
                },
                toolbar: {
                    show: false
                }
            },
            colors: ['#77B6EA', '#545454'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: '预算使用',
                align: 'left'
            },
            grid: {
                borderColor: '#e7e7e7',
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            markers: {
                size: 1
            },
            xaxis: {
                categories: []
            },
            yaxis: {
                title: {
                    text: ''
                },
                min: 0,
                max: 170
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
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
          data: [95, 73, 90, 103, 158, 101, 0, 0, 0, 0, 0, 0]
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
