<template>
  <v-container fluid class="pa-0">
    <Carousel />
    <h1 class="text-center bg-primary py-2">Top Sellers</h1>
    <CardSlider/>
  </v-container>
</template>

<script setup>
import Carousel from '@/components/Carousel.vue';
import CardSlider from '@/components/CardSlider.vue';
</script>

