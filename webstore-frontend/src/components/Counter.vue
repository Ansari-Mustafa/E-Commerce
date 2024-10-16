<template>
  <v-card class="d-flex justify-space-between align-center pa-0" width="100px" rounded="lg"
  elevation="3">
    <v-btn 
      @click="decrement" 
      :disabled="count <= min" 
      icon
      class="mx-0"
      size="36px"
      variant="plain"
      :ripple="{ class: 'text-red' }"
      rounded="lg"
    >
      <v-icon>mdi-minus</v-icon>
    </v-btn>

    <span class="px-1 text-body-1">{{ count }}</span>

    <v-btn 
      @click="increment" 
      :disabled="count >= max" 
      icon
      class="mx-0"
      size="36px"
      variant="plain"
      :ripple="{ class: 'text-green' }"
      rounded="lg"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: 'PlusMinusCounter',
  data() {
    return {
      count: 1,
      min: 1,
      max: 20,
    };
  },
  methods: {
    increment() {
      if (this.count < this.max) {
        this.count++;
      }
    },
    decrement() {
      if (this.count > this.min) {
        this.count--;
      }
    }
  }
}
</script>

<style scoped>

</style>
