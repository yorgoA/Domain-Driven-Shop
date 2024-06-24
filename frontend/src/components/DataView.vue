<template>
  <div>
    <h1>Product Categories</h1>
    <ul>
      <li v-for="category in categories" :key="category.id">
        {{ category.product_category_name_english }} ({{ category.product_category_name }})
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      categories: []
    };
  },
  async created() {
    try {
      const response = await axios.get('/api/data');
      console.log('Data fetched from API:', response.data);
      this.categories = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
</script>
