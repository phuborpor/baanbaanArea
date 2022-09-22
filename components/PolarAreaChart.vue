<template>
  <div class="flex chart-container w-1/2 h-full mx-auto bg-white">
    <canvas id="spider-chart"></canvas>
    <!-- <button @click="filldata()">1</button> -->
  </div>
</template>

<script>
// import { Chart, registerables } from 'chart.js'
// import spiderChartData from 'spider-data.js'
// Chart.register(...registerables)
import Chart from 'chart.js/auto'

export default {
  name: 'SpiderChart',
  props: {
    summaryList: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      chart: [],
      dataLabels: [],
      dataCount: [],
      // eslint-disable-next-line object-shorthand
      // spiderChartData: spiderChartData,
      spiderChartData: {
        type: 'polarArea',
        data: {
          labels: [],
          datasets: [
            {
              label: 'Dataset 1',
              data: [],
              backgroundColor: [
                'rgba(0, 153, 255, 0.5)',
                'rgba(0, 225, 255, 0.5)',
                'rgba(0, 255, 98, 0.5)',
                'rgba(25, 0, 255, 0.5)',
              ],
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            r: {
              ticks: {
                display: true,
              },
              pointLabels: {
                display: true,
                centerPointLabels: true,
                font: {
                  size: 12,
                },
              },
            },
          },
          plugins: {
            legend: false,
            tooltip: false,
          },
        },
      },
    }
  },
  watch: {
    summaryList() {
      this.dataLabels = []
      this.dataCount = []
      for (let i = 0; i < this.summaryList.length; i++) {
        this.dataLabels.push(this.summaryList[i].category)
        this.dataCount.push(this.summaryList[i].count)
      }
      this.filldata()
      // console.log(this.dataLabels)
      // console.log(this.dataCount)
    },
  },
  mounted() {
    const ctx = document.getElementById('spider-chart')
    // const importedModule = import('spider-chart')
    // const ctx = importedModule.default
    // eslint-disable-next-line no-new
    this.$chart = new Chart(ctx, this.spiderChartData)
    console.log(this.$chart)
  },
  methods: {
    filldata() {
      this.$chart.data.labels = this.dataLabels
      this.$chart.data.datasets[0].data = this.dataCount
      console.log(this.$chart.data.datasets[0].data)
      this.$chart.update()
    },
  },
}
</script>
