<template>
  <v-container>
    <ItemList :items="itemList" :cols="5" :rowHeight="360" />
  </v-container>
</template>

<script>
import ItemList from '@/layouts/ItemsList.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    ItemList,
  },
  data() {
    return {
      itemList: [],
    };
  },
  mounted() {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.get(`${import.meta.env.VITE_API_URL}/api/items`)
  .then(response => {
    console.log('Response data:', response.data); // Log the response data
    this.itemList = response.data;
  })
  .catch(error => {
    console.error('Error fetching items:', error);
  });
  },
};
</script>
