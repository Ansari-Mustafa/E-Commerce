<template>
  <v-list>
    <v-list-item-group>
      <v-list-item
        v-for="item in cartItems"
        :key="item.id"
      >
        <v-list-item-content>
            <v-row>
                <v-col class="text-start" style="max-width: 80px;">
                    <v-img 
                    :src="computedImg(item.img)" 
                    class="ma-auto"
                    :max-width="80"
                    :max-height="80"
                    :min-width="50"
                    :min-height="50"
                    rounded="lg"
                    @error="onImageLoadError"
                    ></v-img>
                </v-col>

                <v-col>
                    <h1 class="text-h6 font-weight-bold">{{ item.name }}</h1>
                    <p> {{ (item.price * item.quantity).toFixed(0) }} Rs.</p>
                </v-col>
                <v-spacer></v-spacer>
                <v-col class="text-center">
                    <Counter class="position-absolute top-0 right-0 mt-1 mr-0.5" :itemID="item.id" :itemStock="item.stock" :elevation="0"/>
                    <v-btn :ripple="false" class="position-absolute bottom-0 right-0 mb-2 mr-6" icon="mdi-delete" variant="text" color="red"></v-btn>
                </v-col>
                <!-- <v-col>
                    <v-row class="mt-2 justify-space-between align-center">
                        <h1 class="text-h6 font-weight-bold">{{ item.name }}</h1>
                        <Counter :itemID="item.id" :itemStock="item.stock" :elevation="0"/>
                    </v-row>
                    <v-row class="mt-0 justify-space-between align-center">
                        <p> {{ (item.price * item.quantity).toFixed(0) }} Rs.</p>
                        <v-btn class="mr-6" icon="mdi-delete" variant="text" color="red"></v-btn>
                    </v-row>
                </v-col> -->
            </v-row>
        </v-list-item-content>
        <v-divider class="my-2"></v-divider>
      </v-list-item>
    </v-list-item-group>
  </v-list>
  <div v-if="cartItems.length === 0" class="text-center">Your cart is empty.</div>
</template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import logo from '@/../public/logo.png'; // Placeholder image for errors
  import { useCartStore } from '@/stores/cart';
  import Counter from './Counter.vue';
  
  const cartStore = useCartStore();
  const cartItems = computed(() => cartStore.cartItems);
  
  // Placeholder for images
  const isImageLoaded = ref(true);
  
  // Function to compute image source
  const computedImg = (img) => {
    return isImageLoaded.value ? img : logo; 
  };
  
  // Error handler for image loading
  const onImageLoadError = () => {
    isImageLoaded.value = false;
  };
  </script>
  
  <style scoped>
  /* Add any styles you want here */
  </style>
  