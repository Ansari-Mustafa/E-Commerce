<template>
    <v-container>
      <v-row>
        <v-col
          v-for="(item, index) in items"
          :key="index"
          :cols="calculateCols"
          :style="{ maxHeight: rowHeight + 'px', minHeight: '360px' }" 
        >
          <ItemCard
            :name="item.name"
            :img="item.img"
            :price="item.price"
          />
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import ItemCard from '@/components/ItemCard.vue';
  
  export default {
    name: 'ItemList',
    components: {
      ItemCard
    },
    props: {
      items: {
        type: Array,
        required: true
      },
      cols: {
        type: Number,
        default: 4
      },
      rowHeight: {
        type: Number,
        default: 100
      }
    },
    computed: {
      calculateCols() {
        return 12 / this.cols;
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  