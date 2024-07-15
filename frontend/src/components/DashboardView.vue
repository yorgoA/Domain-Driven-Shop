<template>
  <div class="container-fluid py-4">
    <h1 class="text-center mb-4">Dashboard</h1>

    <b-tabs card class="custom-tab">
      <b-tab title="Top 30 Villes par Clients" active>
        <div class="chart-container mb-4">
          <ChartComponent
            v-if="chartDataReady"
            :chartData="chartData"
            :chartOptions="chartOptions"
            ref="customerChart"
          />
        </div>
      </b-tab>
      <b-tab title="Top 30 Villes par Revenu">
        <div class="chart-container mb-4">
          <ChartComponent
            v-if="revenueChartDataReady"
            :chartData="revenueChartData"
            :chartOptions="revenueChartOptions"
            ref="revenueChart"
          />
        </div>
      </b-tab>
      <b-tab title="Top 20 Villes par CA">
        <div class="chart-container mb-4">
          <ThirdChartComponent
            v-if="caPerClientChartDataReady"
            :chartData="caPerClientChartData"
            :chartOptions="caPerClientChartOptions"
            ref="caPerClientChart"
          />
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import axios from "axios";
import ChartComponent from "./charts/ChartComponent.vue";
import ThirdChartComponent from "./charts/ThirdChartComponent.vue";

export default {
  name: "DashboardView",
  components: {
    ChartComponent,
    ThirdChartComponent,
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [],
      },
      revenueChartData: {
        labels: [],
        datasets: [],
      },
      caPerClientChartData: {
        labels: [],
        datasets: [],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        color: "white",
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 2000,
              color: "white",
            },
            grid: {
              display: true,
            },
            title: {
              display: true,
              text: "Nombre de clients",
              color: "white",
            },
          },
          x: {
            ticks: {
              color: "white",
            },
            grid: {
              color: "transparent",
            },
            title: {
              display: true,
              text: "Villes",
              color: "white",
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";
                label = `${label}: ${context.formattedValue}`;
                return label;
              },
            },
          },
        },
      },
      revenueChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        color: "white",
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "white",
            },
            grid: {
              display: true,
            },
            title: {
              display: true,
              text: "Revenu total",
              color: "white",
            },
          },
          x: {
            ticks: {
              color: "white",
            },
            grid: {
              color: "transparent",
            },
            title: {
              display: true,
              text: "Villes",
              color: "white",
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";
                label = `${label}: ${context.formattedValue}`;
                return label;
              },
            },
          },
        },
      },
      caPerClientChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        color: "white",
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: "white",
            },
            grid: {
              display: true,
            },
            position: "left",
            title: {
              display: true,
              text: "CA par client",
              color: "white",
            },
          },
          y1: {
            beginAtZero: true,
            ticks: {
              color: "white",
            },
            grid: {
              display: false,
            },
            position: "right",
            title: {
              display: true,
              text: "CA par habitant",
              color: "white",
            },
          },
          x: {
            ticks: {
              color: "white",
            },
            grid: {
              color: "transparent",
            },
            title: {
              display: true,
              text: "Villes",
              color: "white",
            },
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || "";
                label = `${label}: ${context.formattedValue}`;
                return label;
              },
            },
          },
        },
      },
      chartDataReady: false,
      revenueChartDataReady: false,
      caPerClientChartDataReady: false,
    };
  },
  async created() {
    console.log("Fetching data...");
    await this.fetchCustomerData();
    await this.fetchRevenueData();
    await this.fetchCaPerClientData();
  },
  methods: {
    async fetchCustomerData() {
      try {
        const response = await axios.get("/api/top-30-cities");
        const data = response.data;
        console.log("Fetched customer data:", data);

        this.chartData = {
          labels: data.map((item) => item.city),
          datasets: [
            {
              label: "Nombre de clients",
              backgroundColor: "#42A5F5",
              borderColor: "#42A5F5",
              hoverBackgroundColor: "#42A5F5",
              hoverBorderColor: "#42A5F5",
              data: data.map((item) => item.num_clients),
              barPercentage: 0.75,
              categoryPercentage: 0.5,
            },
          ],
        };
        console.log("Processed Customer Chart Data:", this.chartData);
        this.chartDataReady = true;
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    },
    async fetchRevenueData() {
      try {
        const revenueResponse = await axios.get("/api/top-30-cities-revenue");
        const revenueData = revenueResponse.data;
        console.log("Fetched revenue data:", revenueData);

        this.revenueChartData = {
          labels: revenueData.map((item) => item.CITY),
          datasets: [
            {
              label: "Revenu total",
              backgroundColor: "#FFA500",
              borderColor: "#FFA500",
              hoverBackgroundColor: "#FFA500",
              hoverBorderColor: "#FFA500",
              data: revenueData.map((item) => item.total_revenue),
              barPercentage: 0.75,
              categoryPercentage: 0.5,
            },
          ],
        };
        console.log("Processed Revenue Chart Data:", this.revenueChartData);
        this.revenueChartDataReady = true;
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    },
    async fetchCaPerClientData() {
      try {
        const caPerClientResponse = await axios.get("/api/top-20-cities-by-ca-per-client");
        const caPerClientData = caPerClientResponse.data;
        console.log("Fetched CA per Client data:", caPerClientData);

        this.caPerClientChartData = {
          labels: caPerClientData.map((item) => item.customer_city),
          datasets: [
            {
              label: "CA par client",
              backgroundColor: "#FFA500",
              borderColor: "#FFA500",
              hoverBackgroundColor: "#FFA500",
              hoverBorderColor: "#FFA500",
              data: caPerClientData.map((item) => item.CA_per_Client),
              barPercentage: 0.75,
              categoryPercentage: 0.5,
              yAxisID: "y",
            },
            {
              label: "CA par habitant",
              backgroundColor: "#800080",
              borderColor: "#800080",
              hoverBackgroundColor: "#800080",
              hoverBorderColor: "#800080",
              data: caPerClientData.map((item) => item.CA_per_Capita),
              barPercentage: 0.75,
              categoryPercentage: 0.5,
              yAxisID: "y1",
            },
          ],
        };
        console.log("Processed CA per Client Chart Data:", this.caPerClientChartData);
        this.caPerClientChartDataReady = true;
      } catch (error) {
        console.error("Error fetching CA per Client data:", error);
      }
    },
  },
  watch: {
    chartDataReady(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          console.log("Rendering customer chart");
          this.$refs.customerChart.renderChart();
        });
      }
    },
    revenueChartDataReady(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          console.log("Rendering revenue chart");
          this.$refs.revenueChart.renderChart();
        });
      }
    },
    caPerClientChartDataReady(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          console.log("Rendering CA par Client chart");
          this.$refs.caPerClientChart.renderChart();
        });
      }
    },
  },
};
</script>

<style scoped>
.container-fluid {
  max-width: 1200px;
  margin: auto;
}

.chart-container {
  position: relative;
  height: 60vh;
  width: 80vw;
}

.custom-tab .nav-link {
  color: #fff !important;
  font-weight: bold;
}

.custom-tab .nav-link.active {
  color: #000 !important;
  background-color: #ffc107;
}
</style>

