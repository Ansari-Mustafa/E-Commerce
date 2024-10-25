<template>
  <v-sheet class="mx-auto px-0 bg-backgroundsec" elevation="8" width="full">
    <v-slide-group
      v-model="model"
      class="py-2 px-0"
      selected-class="bg"
      show-arrows
    >
      <v-slide-group-item
        v-for="item in itemList"
        :key="item.id"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <ItemCard
          :id="item._id"
          :name="item.name"
          :img="item.coverImage"
          :price="item.price"
          :old_price="item.old_price"
          :stock="item.stock"
          @click="toggle"
          :class="['ma-4', selectedClass]"
          class="mr-4"
        />
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import ItemCard from '@/components/ItemCard.vue';

const loading = ref(false); // Define loading state
const model = ref(null); // Define model for v-model binding
const itemList = ref([]);

const fetchJsonData = async () => {
  loading.value = true;
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
  } finally {
    loading.value = false; // Set loading to false after fetching
  }
};

onMounted(fetchJsonData);
</script>
