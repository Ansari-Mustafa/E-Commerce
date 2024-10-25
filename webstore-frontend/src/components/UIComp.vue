<template>
    <v-container>
      <v-card>
        <v-card-title>
          <v-icon class="me-2">mdi-cart-check</v-icon>
          <span class="headline">Checkout</span>
        </v-card-title>
        <v-card-text>
          <Cart />
          <div v-if="cartItems.length === 0" class="text-center">Your cart is empty.</div>
  
          <v-divider class="my-4"></v-divider>
  
          <v-row>
            <v-col>
              <h2 class="text-h6">Total: {{ totalAmount }} Rs.</h2>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="checkout">Proceed to Payment</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="cancel" color="grey">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useCartStore } from '@/stores/cart';
  import Counter from './Counter.vue';
  
  const cartStore = useCartStore();
  const cartItems = computed(() => cartStore.cartItems);
  
  // Total amount calculation
  const totalAmount = computed(() => {
    return cartItems.value.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(0);
  });
  
  // Placeholder for images
  const isImageLoaded = ref(true);
  import defaultImage from '@/../public/logo.png';
import Cart from './CartItems.vue';
  
  // Function to compute image source
  const computedImg = (img) => {
    return isImageLoaded.value ? img : defaultImage;
  };
  
  // Error handler for image loading
  const onImageLoadError = () => {
    isImageLoaded.value = false;
  };
  
  // Checkout function
  const checkout = () => {
    // Implement your checkout logic here
    alert("Proceeding to payment...");
  };
  
  // Cancel function
  const cancel = () => {
    // Implement your cancel logic here (e.g., navigate back)
    alert("Checkout canceled.");
  };
  </script>
  
  <style scoped>
  /* Add any styles you want here */
  </style>
  