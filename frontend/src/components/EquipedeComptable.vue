<template>
  <div class="content-container">
    <h1 class="text-center mb-4">Équipe Comptable - Tableaux des Données</h1>
    
    <b-tabs card class="custom-tab">
      <b-tab title="Revenus et coûts" active>
        <div class="table-container">
          <div class="form-group mb-4">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Rechercher par ville" 
              v-model="revenueCostQuery"
            />
          </div>
          <b-table
            id="revenue-cost-table"
            striped
            outlined
            hover
            foot-clone
            table-variant="light"
            :items="sortedPaginatedRevenueCostItems"
            :fields="revenueCostFields"
            responsive="sm"
          >
            <template #cell(total_revenue)="data">
              ${{ data.item.total_revenue.toLocaleString() }}
            </template>
            <template #cell(total_cost)="data">
              ${{ data.item.total_cost.toLocaleString() }}
            </template>
            <template #cell(difference)="data">
              ${{ data.item.difference.toLocaleString() }}
            </template>
            <template #cell(margin)="data">
              {{ data.item.margin }}%
            </template>
          </b-table>
          <b-pagination
            v-if="totalPagesRevenueCost > 1"
            v-model="currentPageRevenueCost"
            :total-rows="totalItemsRevenueCost"
            :per-page="itemsPerPage"
            aria-controls="revenue-cost-table"
          ></b-pagination>
        </div>
      </b-tab>
      
      <b-tab title="Commandes et produits">
        <div class="table-container">
          <div class="form-group mb-4">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Rechercher par ville" 
              v-model="ordersProductQuery"
            />
          </div>
          <b-table
            id="orders-product-table"
            striped
            outlined
            hover
            foot-clone
            table-variant="light"
            :items="sortedPaginatedOrdersProductItems"
            :fields="ordersProductFields"
            responsive="sm"
          >
            <template #cell(avg_revenue_per_order)="data">
              ${{ data.item.avg_revenue_per_order.toLocaleString() }}
            </template>
          </b-table>
          <b-pagination
            v-if="totalPagesOrdersProduct > 1"
            v-model="currentPageOrdersProduct"
            :total-rows="totalItemsOrdersProduct"
            :per-page="itemsPerPage"
            aria-controls="orders-product-table"
          ></b-pagination>
        </div>
      </b-tab>

      <b-tab title="Clients et profits">
        <div class="table-container">
          <div class="form-group mb-4">
            <input 
              type="text" 
              class="form-control" 
              placeholder="Rechercher par ville" 
              v-model="clientsProfitQuery"
            />
          </div>
          <b-table
            id="clients-profit-table"
            striped
            outlined
            hover
            foot-clone
            table-variant="light"
            :items="sortedPaginatedClientsProfitItems"
            :fields="clientsProfitFields"
            responsive="sm"
          ></b-table>
          <b-pagination
            v-if="totalPagesClientsProfit > 1"
            v-model="currentPageClientsProfit"
            :total-rows="totalItemsClientsProfit"
            :per-page="itemsPerPage"
            aria-controls="clients-profit-table"
          ></b-pagination>
        </div>
      </b-tab>

      <b-tab title="Répartition des revenus" @click="updatePieChart">
        <div  class="chart-container">
          <label for="thresholdRange">Ajuster le seuil pour inclure les villes ayant un revenu total supérieur à :</label>
          <input type="range" id="thresholdRange" min="0.03" max="0.1" step="0.01" v-model="threshold" @change="updatePieChart" />
          <span>{{ (threshold * 100).toFixed(0) }}%</span>
          <canvas id="pieChartCanvas"></canvas>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import axios from 'axios';
import { Chart } from 'chart.js';

export default {
  data() {
    return {
      revenueCostItems: [],
      ordersProductItems: [],
      clientsProfitItems: [],
      revenueCostQuery: '',
      ordersProductQuery: '',
      clientsProfitQuery: '',
      currentPageRevenueCost: 1,
      currentPageOrdersProduct: 1,
      currentPageClientsProfit: 1,
      itemsPerPage: 10,
      threshold: 0.03,
      loading: false,
      chartData: [],
      pieChart: null,
      revenueCostFields: [
        { key: 'city', label: 'Ville' },
        { key: 'total_revenue', label: 'Revenu Total' },
        { key: 'total_cost', label: 'Coût Total' },
        { key: 'difference', label: 'Différence' },
        { key: 'margin', label: 'Marge (%)' },
      ],
      ordersProductFields: [
        { key: 'city', label: 'Ville' },
        { key: 'total_orders', label: 'Total des Commandes' },
        { key: 'most_sold_product', label: 'Produit le Plus Vendu' },
        { key: 'avg_revenue_per_order', label: 'Revenu Moyen par Commande' },
        { key: 'most_profitable_product', label: 'Produit le Plus Rentable' },
        { key: 'most_profitable_product_sales', label: 'Ventes du Produit le Plus Rentable' },
      ],
      clientsProfitFields: [
        { key: 'city', label: 'Ville' },
        { key: 'total_customers', label: 'Nombre de Clients' },
        { key: 'total_revenue', label: 'Revenu Total' },
        { key: 'total_cost', label: 'Coût Total' },
        { key: 'difference', label: 'Différence' },
      ],
    };
  },
  computed: {
    filteredRevenueCostItems() {
      return this.revenueCostItems.filter(item =>
        item.city &&
        item.total_revenue !== null &&
        item.total_cost !== null &&
        item.difference !== null &&
        item.margin !== null &&
        (!this.revenueCostQuery || item.city.toLowerCase().includes(this.revenueCostQuery.toLowerCase()))
      );
    },
    sortedFilteredRevenueCostItems() {
      return this.sortByTotalRevenue(this.filteredRevenueCostItems);
    },
    totalItemsRevenueCost() {
      return this.sortedFilteredRevenueCostItems.length;
    },
    totalPagesRevenueCost() {
      return Math.ceil(this.totalItemsRevenueCost / this.itemsPerPage);
    },
    sortedPaginatedRevenueCostItems() {
      const start = (this.currentPageRevenueCost - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedFilteredRevenueCostItems.slice(start, end);
    },

    filteredOrdersProductItems() {
      return this.ordersProductItems.filter(item =>
        item.city &&
        item.total_orders !== null &&
        item.most_sold_product &&
        item.avg_revenue_per_order !== null &&
        item.most_profitable_product &&
        item.most_profitable_product_sales !== null &&
        (!this.ordersProductQuery || item.city.toLowerCase().includes(this.ordersProductQuery.toLowerCase()))
      );
    },
    sortedFilteredOrdersProductItems() {
      return this.sortByTotalOrders(this.filteredOrdersProductItems);
    },
    totalItemsOrdersProduct() {
      return this.sortedFilteredOrdersProductItems.length;
    },
    totalPagesOrdersProduct() {
      return Math.ceil(this.totalItemsOrdersProduct / this.itemsPerPage);
    },
    sortedPaginatedOrdersProductItems() {
      const start = (this.currentPageOrdersProduct - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedFilteredOrdersProductItems.slice(start, end);
    },

    filteredClientsProfitItems() {
      return this.clientsProfitItems.filter(item =>
        item.city &&
        item.total_customers !== null &&
        item.total_revenue !== null &&
        item.total_cost !== null &&
        item.difference !== null &&
        (!this.clientsProfitQuery || item.city.toLowerCase().includes(this.clientsProfitQuery.toLowerCase()))
      );
    },
    sortedFilteredClientsProfitItems() {
      return this.sortByTotalCustomers(this.filteredClientsProfitItems);
    },
    totalItemsClientsProfit() {
      return this.sortedFilteredClientsProfitItems.length;
    },
    totalPagesClientsProfit() {
      return Math.ceil(this.totalItemsClientsProfit / this.itemsPerPage);
    },
    sortedPaginatedClientsProfitItems() {
      const start = (this.currentPageClientsProfit - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.sortedFilteredClientsProfitItems.slice(start, end);
    }
  },
  methods: {
    sortByTotalRevenue(items) {
      return [...items].sort((a, b) => b.total_revenue - a.total_revenue);
    },
    sortByTotalOrders(items) {
      return [...items].      sort((a, b) => b.total_orders - a.total_orders);
    },
    sortByTotalCustomers(items) {
      return [...items].sort((a, b) => b.total_customers - a.total_customers);
    },
    initializeChart() {
      console.log('Initializing chart with data:', this.chartData);
      if (this.pieChart) {
        this.pieChart.destroy();
      }

      const ctx = document.getElementById('pieChartCanvas');
      if (!ctx) {
        console.error('Chart canvas not found!');
        return; // Ensure the canvas is present
      }

      this.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: this.chartData.map(item => item.city),
          datasets: [{
            data: this.chartData.map(item => item.total_revenue),
            backgroundColor: [
              '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40',
              '#FFCD56', '#36A2EB'
            ],
            borderColor: 'transparent'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          color: "white",
          plugins: {
            title: {
              display: true,
              color: "white",
              text: 'Répartition du revenu total entre les différentes villes',
              padding: {
                top: 10,
                bottom: 10
              },
              font: {
                size: 20
              }
            }
          }
        }
      });

      this.loading = false; // Hide the loading indicator
      console.log('Chart initialized');
    },
    updatePieChart() {
      this.loading = true;
      console.log('Updating pie chart...');
      setTimeout(() => {
        const totalRevenueSum = this.revenueCostItems.reduce((sum, item) => sum + item.total_revenue, 0);
        const thresholdValue = this.threshold * totalRevenueSum;
        console.log('Total revenue sum:', totalRevenueSum);
        console.log('Threshold value:', thresholdValue);

        const filteredData = this.revenueCostItems.reduce(
          (acc, item) => {
            if (item.total_revenue > thresholdValue) {
              acc.push({ city: item.city, total_revenue: item.total_revenue });
            } else {
              if (!acc.other) acc.other = { city: 'Autres', total_revenue: 0 };
              acc.other.total_revenue += item.total_revenue;
            }
            return acc;
          },
          []
        );

        if (filteredData.other) {
          filteredData.push(filteredData.other);
        }

        this.chartData = filteredData;
        console.log('Filtered data for chart:', this.chartData);
        
        if (this.pieChart) {
          this.pieChart.destroy();
          this.pieChart = null;
        }

        setTimeout(() => {
          this.initializeChart();
        }, 500); // Ensure enough time for the chart to be destroyed before reinitializing
      }, 500); // Simulate loading time
    }
  },
  async created() {
    try {
      const response = await axios.get('/api/test3');
      console.log('Data from test3:', response.data);

      this.revenueCostItems = response.data;
      this.ordersProductItems = response.data;
      this.clientsProfitItems = response.data;
      this.updatePieChart();
    } catch (error) {
      console.error('Error fetching data from test3:', error);
    }
  }
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
  height: 60vh;
  width: 80vw;
}

.loading {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: white;
}
</style>

