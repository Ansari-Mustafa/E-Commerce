<template>
    <v-carousel
    height="500"
    hide-delimiters
    progress="#42b883"
    show-arrows="hover"
    interval="4000"
    cycle
    >
      <template v-slot:prev="{ props }">
        <v-btn
          color="primary"
          icon="mdi-chevron-left"
          @click="props.onClick"
        ></v-btn>
      </template>
      <template v-slot:next="{ props }">
        <v-btn
          color="primary"
          icon="mdi-chevron-right"
          @click="props.onClick"
        ></v-btn>
      </template>
      <v-carousel-item
        src="/pic1.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="/pic2.jpg"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="/pic3.jpg"
        cover
      ></v-carousel-item>
    </v-carousel>
</template>

<style scoped>

</style>