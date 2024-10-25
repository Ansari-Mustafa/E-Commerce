<template>
    <v-container>
      <v-row>
        <v-col
          v-for="index in items"
          :key="index"
          :cols="calculateCols"
          :style="{ maxHeight: rowHeight + 'px', minHeight: '360px' }" 
        >
          <v-skeleton-loader
            :elevation="3"
            :width="230"
            class="px-2"
            type="heading, image, text, button"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    name: 'ItemListLoader',
    props: {
      items: {
        type: Number,
        default: 9
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
  