<template>
  <div class="content-container">
    <h1>Data from Table Test2</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.id }} - {{ item.Name }} - {{ item.created_at }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: []
    };
  },
  async created() {
    try {
      const response = await axios.get('/api/test2');
      console.log('Data from test2:', response.data); 
      this.items = response.data;
    } catch (error) {
      console.error('Error fetching data from test2:', error);
    }
  }
}
</script>
