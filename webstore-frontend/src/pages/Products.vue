<template>
    <v-container>
      <ItemsListLoader v-if="loading" :items="9" :cols="5" :rowHeight="360" />
      <ItemsList v-else :items="itemList" :cols="5" :rowHeight="360" />
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import ItemsList from '@/layouts/ItemsList.vue';
  import ItemsListLoader from '@/layouts/ItemsListLoader.vue';
  
  const jsonData = ref(null);
  const itemList = ref([]);
  const loading = ref(true)
  
  const fetchJsonData = async () => {
    loading.value = true;
    try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    loading.value = false;
    const jsonData = await response.json();
    console.log(jsonData);
    itemList.value = jsonData;
  } catch (error) {
    console.error('Error fetching JSON data:', error);
    loading.value = true;
  }
  };
  
  onMounted(fetchJsonData);
  </script>
  
  