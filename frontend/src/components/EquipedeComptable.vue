<template>
  <div>
    <h1>Data from Table Test3</h1>
    <ul>
      <li v-for="item in items" :key="item.type">
        {{ item.type }} - {{ item.color }}
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
      const response = await axios.get('/api/test3');
      console.log('Data from test3:', response.data); 
      this.items = response.data;
    } catch (error) {
      console.error('Error fetching data from test3:', error);
    }
  }
}
</script>
