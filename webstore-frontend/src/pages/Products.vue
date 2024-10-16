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
      const response = await fetch('/data.json'); // Adjust the path if necessary
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      jsonData.value = await response.json();
      console.log(jsonData.value)
      itemList.value = jsonData.value;
    } catch (error) {
      console.error('Error fetching JSON data:', error);
    }
  };
  
  onMounted(fetchJsonData);
  </script>
  
  