<template>
    <v-container>
      <ItemsList :items="itemList" :cols="5" :rowHeight="360" />
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import ItemsList from '@/layouts/ItemsList.vue';
  
  const jsonData = ref(null);
  const itemList = ref([]);
  
  const fetchJsonData = async () => {
    try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    console.log(jsonData);
    itemList.value = jsonData;
  } catch (error) {
    console.error('Error fetching JSON data:', error);
  }
  };
  
  onMounted(fetchJsonData);
  </script>
  
  