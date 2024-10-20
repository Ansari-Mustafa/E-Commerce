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
          color="grey"
          size="x-large"
          icon="mdi-chevron-left"
          variant="text"
          class="text-h5"
          @click="props.onClick"
        ></v-btn>
      </template>
      <template v-slot:next="{ props }">
        <v-btn
          color="grey"
          size="x-large"
          variant="text"
          icon="mdi-chevron-right"
          class="text-h5"
          @click="props.onClick"
        ></v-btn>
      </template>
      <v-carousel-item
        src="/pic1.png"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="/pic2.png"
        cover
      ></v-carousel-item>

      <v-carousel-item
        src="/pic3.png"
        cover
      ></v-carousel-item>
    </v-carousel>
</template>

<style scoped>

</style>