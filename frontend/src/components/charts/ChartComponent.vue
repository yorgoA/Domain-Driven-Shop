<template>
    <div class="chart-container">
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
  import { nextTick } from 'vue';
  
  Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  
  export default {
    name: 'ChartComponent',
    props: {
      chartData: {
        type: Object,
        required: true
      },
      chartOptions: {
        type: Object,
        required: true
      }
    },
    mounted() {
      this.renderChart();
    },
    watch: {
      chartData: {
        handler(newData, oldData) {
          if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
            this.renderChart();
          }
        },
        deep: true
      },
      chartOptions: {
        handler(newOptions, oldOptions) {
          if (JSON.stringify(newOptions) !== JSON.stringify(oldOptions)) {
            this.renderChart();
          }
        },
        deep: true
      }
    },
    methods: {
      renderChart() {
        nextTick(() => {
          if (this._chart) {
            this._chart.destroy();
          }
          this._chart = new Chart(this.$refs.canvas, {
            type: 'bar',
            data: this.chartData,
            options: this.chartOptions
          });
        });
      }
    },
    beforeUnmount() {
      if (this._chart) {
        this._chart.destroy();
      }
    }
  }
  </script>
  
  <style scoped>
  .chart-container {
    position: relative;
    height: 60vh;
    width: 80vw;
  }
  
  canvas {
    display: block;
    width: 100%;
    height: 100%;
  }
  </style>
  