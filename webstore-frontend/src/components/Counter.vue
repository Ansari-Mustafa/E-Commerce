<template>
  <v-card class="d-flex justify-space-between align-center pa-0" width="100px" rounded="lg" :elevation=props.elevation>
    <v-btn 
      @click="decrement" 
      :disabled="itemInCart.quantity <= 1" 
      icon
      class="mx-0"
      size="36px"
      variant="plain"
      :ripple="{ class: 'text-red' }"
      rounded="lg"
    >
      <v-icon>mdi-minus</v-icon>
    </v-btn>

    <span class="px-1 text-body-1">{{ itemInCart.quantity }}</span>

    <v-btn 
      @click="increment" 
      :disabled="itemInCart.quantity >= props.itemStock" 
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
<script setup>
import { useCartStore } from '@/stores/cart'; // Import the store

const props = defineProps({
  itemID: {
    type: Number,
    required: true
  },
  itemStock: {
    type: Number,
    required: true
  },
  elevation: {
    type: Number,
    required: true
  },
});

const cartStore = useCartStore(); // Access the cart store

const itemInCart = computed(() => {
  return cartStore.cartItems.find(item => item.id === props.itemID) || { quantity: 1 };
});

const increment = () => {
  cartStore.incrementQuantity(props.itemID);
};

const decrement = () => {
  cartStore.decrementQuantity(props.itemID);
};
</script>
