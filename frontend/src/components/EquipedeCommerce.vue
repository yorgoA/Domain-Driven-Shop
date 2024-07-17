<template>
  <div class="content-container">
    <h1 class="text-center mb-4">Équipe Commerce - Tableaux des Données</h1>

    <b-tabs card class="custom-tab">
      <b-tab title="Metrics de vente des produits" active>
        <div class="table-container">
          <div class="form-group mb-4">
            <input type="text" class="form-control" placeholder="Rechercher par nom de produit"
              v-model="productSalesQuery" />
          </div>
          <b-table id="product-sales-table" striped outlined hover foot-clone table-variant="light"
            :items="sortedPaginatedProductSalesItems" :fields="productSalesFields" responsive="sm">
            <template #cell(payment_value)="data">
              ${{ data.item.payment_value.toLocaleString() }}
            </template>
            <template #cell(avg_revenue)="data">
              ${{ data.item.avg_revenue.toLocaleString() }}
            </template>
            <template #cell(avg_review_score)="data">
              {{ data.item.avg_review_score.toFixed(2) }}
            </template>
          </b-table>
          <b-pagination v-if="totalPagesProductSales > 1" v-model="currentPageProductSales"
            :total-rows="totalItemsProductSales" :per-page="itemsPerPage"
            aria-controls="product-sales-table"></b-pagination>
        </div>
      </b-tab>

      <b-tab title="Commande des villes et leur populations">
        <div class="table-container">
          <div class="form-group mb-4">
            <input type="text" class="form-control" placeholder="Rechercher par ville" v-model="cityOrdersQuery" />
          </div>
          <b-table id="city-orders-table" striped outlined hover foot-clone table-variant="light"
            :items="sortedPaginatedCityOrdersItems" :fields="cityOrdersFields" responsive="sm"></b-table>
          <b-pagination v-if="totalPagesCityOrders > 1" v-model="currentPageCityOrders"
            :total-rows="totalItemsCityOrders" :per-page="itemsPerPage"
            aria-controls="city-orders-table"></b-pagination>
        </div>
      </b-tab>

      <b-tab title="Comparaison des villes">
        <div class="chart-container">
          <b-form-select v-model="selectedCity" :options="cityOptions" @change="handleCityChange"></b-form-select>
          <div v-if="chartDataReady">
            <FourthChartComponent ref="cityChart" :chartData="chartData" :chartOptions="chartOptions" />
          </div>
        </div>
        <div class="market-penetration-container">
          <h4>Pénétration du marché pour {{ selectedCity }}</h4>
          <div class="market-penetration-value">
            {{ marketPenetration }}
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>


<script>
import axios from 'axios';
import FourthChartComponent from './charts/FourthChartComponent.vue';

export default {
  data() {
    return {
      productSalesItems: [],
      cityOrdersItems: [],
      productSalesQuery: '',
      cityOrdersQuery: '',
      currentPageProductSales: 1,
      currentPageCityOrders: 1,
      itemsPerPage: 10,
      selectedCity: '',
      marketPenetration:'',
      chartData: {
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
              color: "white",
            },
            grid: {
              display: true,
            },
            position: "left",
            title: {
              display: true,
              text: "Total des Commandes",
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
              text: "Population",
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
              text: "Ville",
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
      productSalesFields: [
        { key: 'product_category_name_english', label: 'Nom du Produit' },
        { key: 'payment_value', label: 'Valeur du Paiement' },
        { key: 'total_products_sold', label: 'Produits Vendus' },
        { key: 'avg_revenue', label: 'Revenu Moyen' },
        { key: 'return_rate', label: 'Taux de Retour' },
        { key: 'avg_delivery_time', label: 'Temps de Livraison Moyen' },
        { key: 'avg_review_score', label: 'Note Moyenne' },
      ],
      cityOrdersFields: [
        { key: 'city', label: 'Ville' },
        { key: 'total_orders', label: 'Total des Commandes' },
        { key: 'population', label: 'Population' },
      ],
      cityOptions: [],
    };
  },
  components: {
    FourthChartComponent,
  },
  computed: {
    filteredProductSalesItems() {
      return this.productSalesItems.filter((item) =>
        item.product_category_name_english &&
        item.payment_value !== null &&
        item.total_products_sold !== null &&
        item.avg_revenue !== null &&
        item.return_rate !== null &&
        item.avg_delivery_time !== null &&
        item.avg_review_score !== null &&
        (!this.productSalesQuery || item.product_category_name_english.toLowerCase().includes(this.productSalesQuery.toLowerCase()))
      );
    },
    totalItemsProductSales() {
      return this.filteredProductSalesItems.length;
    },
    totalPagesProductSales() {
      return Math.ceil(this.totalItemsProductSales / this.itemsPerPage);
    },
    paginatedProductSalesItems() {
      const start = (this.currentPageProductSales - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProductSalesItems.slice(start, end);
    },
    sortedPaginatedProductSalesItems() {
      return this.getSortedItems(this.paginatedProductSalesItems, 'total_products_sold');
    },
    filteredCityOrdersItems() {
      return this.cityOrdersItems.filter((item) =>
        item.city &&
        item.total_orders !== null &&
        item.population !== null &&
        (!this.cityOrdersQuery || item.city.toLowerCase().includes(this.cityOrdersQuery.toLowerCase()))
      );
    },
    totalItemsCityOrders() {
      return this.filteredCityOrdersItems.length;
    },
    totalPagesCityOrders() {
      return Math.ceil(this.totalItemsCityOrders / this.itemsPerPage);
    },
    paginatedCityOrdersItems() {
      const start = (this.currentPageCityOrders - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredCityOrdersItems.slice(start, end);
    },
    sortedPaginatedCityOrdersItems() {
      return this.getSortedItems(this.paginatedCityOrdersItems, 'total_orders');
    },
  },
  methods: {
    getSortedItems(items, key) {
      return items.slice().sort((a, b) => b[key] - a[key]);
    },
    handleCityChange() {
      this.updateChart();
    },
    updateChart() {
      setTimeout(() => {
        console.log('Updating chart with city:', this.selectedCity);
        const cityData = this.cityOrdersItems.find(item => item.city === this.selectedCity);

        if (!cityData) {
          console.error('Selected city not found!');
          return;
        }

        this.chartData = {
          labels: [this.selectedCity],
          datasets: [
            {
              label: 'Total des Commandes',
              data: [cityData.total_orders],
              backgroundColor: '#42A5F5',
              yAxisID: 'y',
            },
            {
              label: 'Population',
              data: [cityData.population],
              backgroundColor: '#FFA500',
              yAxisID: 'y1',
            },
          ],
        };
        this.marketPenetration = ((cityData.total_orders / cityData.population) * 100).toFixed(2) + '%';
        this.chartDataReady = true;
        this.$nextTick(() => {
          this.$refs.cityChart.renderChart();
        });
      }, 500); // Small timeout to ensure data is ready
    },
  },
  async created() {
    try {
      const response = await axios.get('/api/test2');
      this.productSalesItems = response.data;
      this.cityOrdersItems = response.data;

      this.cityOptions = this.cityOrdersItems
        .filter((item) => item.city)
        .map((item) => ({
          value: item.city,
          text: item.city,
        }));

      console.log('Product sales items:', this.productSalesItems);
      console.log('City orders items:', this.cityOrdersItems);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
};
</script>
<style scoped>
.content-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table-container {
  margin-top: 20px;
}

b-table {
  background: white;
  border-radius: 10px;
  overflow: hidden;
}

.custom-tab .nav-link {
  color: #fff !important;
  font-weight: bold;
}

.custom-tab .nav-link.active {
  color: #000 !important;
  background-color: #ffc107;
}

.chart-container {
  position: relative;
  height: 400px;
  width: 80vw;
}

.market-penetration-container {
  margin-top: 20px;
  text-align: center;
  padding-top: 20px;
  font-size: 18px;
  color: white;
}

.market-penetration-value {
  font-size: 24px;
  font-weight: bold;
  color: #ffc107;
}

.loading {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: white;
}
</style>