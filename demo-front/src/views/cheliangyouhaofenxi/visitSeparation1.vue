<template>
  <div>
    <Card>
      <p slot="title" class="card-title">
        <Icon type="md-locate" style="margin-right:5px"></Icon>历史平均油耗
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
        labels: ["标准以下", "20%以下", "20%以上"],
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
      this.series = [4, 6, 2];
    }
  },
  mounted() {
    this.init();
  }
};
</script>
