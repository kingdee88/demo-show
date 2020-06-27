<template>
  <div>
    <Card>
      <p slot="title" class="card-title">
        <Icon type="md-locate" style="margin-right:5px"></Icon>预算使用分析
      </p>
      <Row type="flex" justify="center" align="middle" style="height:273px;">
        <apexchart type="donut" width="350" :options="chartOptions" :series="series" />
      </Row>
    </Card>
  </div>
</template>

<script>
var map;
export default {
  name: "visitSeparation",
  data() {
    return {
      series: [],
      chartOptions: {
        labels: ["差旅", "劳务", "培训", "采购", "用车"],
        plotOptions: {
          pie: {
            donut: {
              size: "70%"
            }
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          position: "right"
        }
      }
    };
  },
  methods: {
    init() {
      this.series = [8, 10, 5, 60, 17];
    }
  },
  mounted() {
    this.init();
  }
};
</script>
