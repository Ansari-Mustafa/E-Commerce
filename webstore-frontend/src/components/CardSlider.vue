<template>
    <v-sheet class="mx-auto px-0 bg-backgroundsec" elevation="8" width="full">
      <v-slide-group
        v-model="model"
        class="py-2 px-0"
        selected-class="bg"
        show-arrows
      >
        <v-slide-group-item
          v-for="item in items"
          :key="item.id"
          v-slot="{ isSelected, toggle, selectedClass }"
        >
          <ItemCard
            :name="item.name"
            :img="item.img"
            :price="item.price"
            @click="toggle"
            :class="['ma-4', selectedClass]"
            class="mr-4"
          />
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </template>
  
  <script>
  import ItemCard from './ItemCard.vue';
  
  export default {
    components: {
      ItemCard,
    },
    data() {
      return {
        model: null,
        items: [
          { id: 1, name: 'Item 1', img: '/logo.png', price: 100 },
          { id: 2, name: 'Item 2', img: 'path/to/image2.jpg', price: 200 },
          { id: 3, name: 'Item 1', img: '/logo.png', price: 100 },
          { id: 4, name: 'Item 2', img: 'path/to/image2.jpg', price: 200 },
          { id: 5, name: 'Item 1', img: '/logo.png', price: 100 },
          { id: 6, name: 'Item 2', img: 'path/to/image2.jpg', price: 200 },
          { id: 7, name: 'Item 1', img: '/logo.png', price: 100 },
          { id: 8, name: 'Item 2', img: 'path/to/image2.jpg', price: 200 },
        ],
      };
    },
  };
  </script>
  