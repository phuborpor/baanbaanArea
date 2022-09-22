<template>
  <div class="flex chart-container mx-auto bg-white">
    <canvas id="radar-chart"></canvas>
  </div>
</template>

<script>
// import { Chart, registerables } from 'chart.js'
// import spiderChartData from 'spider-data.js'
// Chart.register(...registerables)
// import Chart from 'chart.js/auto'

export default {
  name: 'RadarChart',
  props: {
    summaryList: {
      type: Array,
      default: null,
    },
  },

  data() {
    return {
      cateLabel: [],
      dataSet: [],
      dataCount: [],
    }
  },
  watch: {
    summaryList() {
      for (let i = 0; i < this.summaryList.length; i++) {
        this.dataSet.push(this.summaryList[i].category)
        this.dataCount.push(this.summaryList[i].count)
      }
      console.log(this.dataSet)
      console.log(this.dataCount)
    },
  },
  mounted() {
    // this.fillData()
  },
  methods: {
    // fillData() {
    //   const data = {
    //     labels: [
    //       'ร้านอาหาร',
    //       'วัด',
    //       'โรงเรียน',
    //       'ร้านเสริมสวย',
    //       'ร้านขายของ',
    //       'ตลาดนัด',
    //       'คอนโดมิเนียม',
    //     ],
    //     datasets: [
    //       {
    //         label: 'Mark 1',
    //         data: [65, 59, 90, 81, 56, 55, 40],
    //         fill: true,
    //         backgroundColor: 'rgba(92, 156, 230, 0.2)',
    //         borderColor: 'rgba(92, 156, 230, 1)',
    //         pointBackgroundColor: 'rgba(92, 156, 230, 1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(92, 156, 230, 1)',
    //       },
    //       {
    //         label: 'Mark 2',
    //         data: [28, 48, 40, 19, 96, 27, 100],
    //         fill: true,
    //         backgroundColor: 'rgba(92, 230, 166, 0.2)',
    //         borderColor: 'rgba(92, 230, 166, 1)',
    //         pointBackgroundColor: 'rgba(92, 230, 166, 1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(92, 230, 166, 1)',
    //       },
    //       {
    //         label: 'Mark 3',
    //         data: [68, 68, 76, 89, 86, 77, 55],
    //         fill: true,
    //         backgroundColor: 'rgba(92, 225, 230, 0.2)',
    //         borderColor: 'rgba(92, 225, 230, 1)',
    //         pointBackgroundColor: 'rgba(92, 225, 230, 1)',
    //         pointBorderColor: '#fff',
    //         pointHoverBackgroundColor: '#fff',
    //         pointHoverBorderColor: 'rgba(92, 225, 230, 1)',
    //       },
    //     ],
    //   }
    //   const config = {
    //     type: 'radar',
    //     data: data,
    //     options: {
    //       responsive: true,
    //       scales: {
    //         r: {
    //           ticks: {
    //             display: false,
    //           },
    //           pointLabels: {
    //             display: true,
    //             font: {
    //               size: 16,
    //             },
    //           },
    //         },
    //       },
    //       plugins: {
    //         legend: false,
    //         tooltip: false,
    //       },
    //       elements: {
    //         line: {
    //           borderWidth: 3,
    //         },
    //       },
    //     },
    //   }
    //   this.$cateLabel = new Chart(
    //     document.getElementById('radar-chart'),
    //     config
    //   )
    // },
  },
}
</script>
