<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">Tableau pour la Direction</h1>
    
    <div class="form-group mb-4">
      <input 
        type="text" 
        class="form-control" 
        placeholder="Search by product category name" 
        v-model="searchQuery"
      />
    </div>

    <b-table
      id="category-table"
      striped
      outlined
      hover
      foot-clone
      table-variant="light"
      :items="paginatedCategories"
      :fields="fields"
      responsive="sm"
    >
      <template #cell(actions)="row">
        <b-button size="sm" @click="showDetails(row.item)">Details</b-button>
      </template>
    </b-table>

    <b-pagination
      v-if="totalPages > 1"
      v-model="currentPage"
      :total-rows="totalItems"
      :per-page="itemsPerPage"
      aria-controls="category-table"
    ></b-pagination>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: [],
      searchQuery: '',
      currentPage: 1,
      itemsPerPage: 10,
      fields: [
        { key: 'product_category_name_english', label: 'Category Name (English)', sortable: true },
        { key: 'product_category_name', label: 'Category Name (Local)', sortable: true }
      ]
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  methods: {
    showDetails(item) {
      alert(`Showing details for: ${item.product_category_name_english}`);
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}

.form-control, .b-pagination {
  margin-bottom: 10px;
}
</style>
