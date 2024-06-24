<template>
    <div class="container-fluid py-4">
      <h1 class="text-center mb-4">Dashboard</h1>
      
      <!-- Graphique -->
      <div class="chart-container mb-4">
        <ChartComponent :chartData="chartData" :chartOptions="chartOptions" />
      </div>
  
      <!-- Tableau -->
      <b-table
        id="direction-table"
        striped
        outlined
        hover
        foot-clone
        table-variant="light"
        :items="paginatedCategories"
        :fields="fields"
        responsive="sm"
      ></b-table>
  
      <!-- Pagination -->
      <b-pagination
        v-if="totalPages > 1"
        v-model="currentPage"
        :total-rows="totalItems"
        :per-page="itemsPerPage"
        aria-controls="direction-table"
      ></b-pagination>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import ChartComponent from './ChartComponent.vue';
  
  export default {
    name: 'DashboardView',
    components: {
      ChartComponent
    },
    data() {
      return {
        categories: [],
        currentPage: 1,
        itemsPerPage: 10,
        fields: [
          { key: 'product_category_name_english', label: 'Category Name (English)', sortable: true },
          { key: 'product_category_name', label: 'Category Name (Local)', sortable: true }
        ],
        chartData: {
          labels: [], // Labels for the x-axis
          datasets: [
            {
              label: 'Category Count',
              backgroundColor: '#42A5F5',
              data: [] // Data for the y-axis
            }
          ]
        },
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false
        }
      };
    },
    computed: {
      filteredCategories() {
        if (!this.searchQuery) {
          return this.categories;
        }
        return this.categories.filter(category => 
          category.product_category_name_english.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
      totalItems() {
        return this.filteredCategories.length;
      },
      totalPages() {
        return Math.ceil(this.totalItems / this.itemsPerPage);
      },
      paginatedCategories() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredCategories.slice(start, end);
      }
    },
    async created() {
      try {
        const response = await axios.get('/api/data');
        console.log('Data fetched from API:', response.data);
        this.categories = response.data;
        
        // Mettre à jour les données du graphique
        this.chartData.labels = this.categories.map(cat => cat.product_category_name_english);
        this.chartData.datasets[0].data = this.categories.map(cat => cat.product_category_name.length); // Ex. pour une donnée
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
  </script>
  
  <style scoped>
  .container-fluid {
    max-width: 1200px;
    margin: auto;
  }
  
  #direction-table {
    margin-top: 20px;
  }
  
  .b-pagination {
    margin-top: 20px;
  }
  
  .chart-container {
    position: relative;
    height: 40vh;
    width: 100%;
  }
  </style>
  