<template>
    <div>
      <canvas ref="chart"></canvas>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    name: 'FourthChartComponent',
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
    methods: {
      renderChart() {
        console.log('Rendering chart with data:', this.chartData);
        console.log('Rendering chart with options:', this.chartOptions);
        if (this.chart) {
          this.chart.destroy();
        }
        this.chart = new Chart(this.$refs.chart, {
          type: 'bar',
          data: this.chartData,
          options: this.chartOptions
        });
      }
    },
    watch: {
      chartData: {
        handler(newData, oldData) {
          console.log('ChartData watcher triggered');
          if (JSON.stringify(newData) !== JSON.stringify(oldData)) {
            this.renderChart();
          }
        },
        deep: true
      },
      chartOptions: {
        handler(newOptions, oldOptions) {
          console.log('ChartOptions watcher triggered');
          if (JSON.stringify(newOptions) !== JSON.stringify(oldOptions)) {
            this.renderChart();
          }
        },
        deep: true
      }
    },
    beforeUnmount() {
      if (this.chart) {
        this.chart.destroy();
      }
    }
  };
  </script>
  
  <style scoped>
  canvas {
    max-width: 200%;
  }
  </style>
  