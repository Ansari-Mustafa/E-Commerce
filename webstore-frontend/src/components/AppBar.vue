<template>
  <div>
    <v-app-bar
      color="primary"
      dense
      dark
      elevation="11"
      flat
      shaped
      :height="68"
    >
    <v-row>
        
      <v-col v-if="isMobile" class="d-flex align-center justify-start ms-2">
        <v-btn rounded="lg"
        icon="mdi-menu" @click="navDrawer = !navDrawer">
        </v-btn>
      </v-col>  
      
      <v-col class="d-flex align-center justify-center ms-2" >
          <v-img src="@/assets/logo.png" 
          :height="60"
          :max-width="60"
          :min-width="50"
          aspect-ratio="1/1"
          cover 
          class="mx-2"
          @click="navigateTo('/')">
          </v-img>
          <div v-if="!isMobile" class="gill-sans-font pa-0 d-flex flex-row align-center">
            <p class="text-h5 mr-1 font-weight-bold">DEEZIGN</p>
            <p class="text-h3 font-weight-bold text-lab">LAB</p> 
          </div>
      </v-col>
        
        <v-col v-if="!isMobile" class="d-flex align-center justify-ceter">
          <v-tabs v-model="tab" background-color="primary" color="white">
            <v-tab value="home" @click="navigateTo('/')">
              <span>Home</span>
              <v-icon>mdi-home</v-icon>
            </v-tab>
            <v-tab value="categories" @click="navigateTo('/categories')">
              <span>Categories</span>
              <v-icon>mdi-format-list-bulleted-square</v-icon>
            </v-tab>
            <v-tab value="products" @click="navigateTo('/products')">
              <span>Products</span>
              <v-icon>mdi-shopping</v-icon>
            </v-tab>
            <v-tab value="services" @click="navigateTo('/services')">
              <span>Services</span>
              <v-icon>mdi-shape-plus</v-icon>
            </v-tab>
            <v-tab value="about" @click="navigateTo('/about')">
              <span>About</span>
              <v-icon>mdi-information-outline</v-icon>
            </v-tab>
          </v-tabs>
        </v-col>
          
        <v-col class="d-flex align-center justify-end">

          <v-text-field v-if=!isMobile
          @focus="searchBarClosed = false"
          @blur="searchBarClosed = true"
          placeholder="Search"
          v-model="search"
          filled
          dense
          variant="text"
          prepend-inner-icon="mdi-magnify"
          class="mt-6 expanding-search"
          :class="{'closed-search' : searchBarClosed && !search}"
          clearable
          ></v-text-field>

          <v-btn icon @click="navigateTo('/add-products')">
            <v-icon>mdi-account</v-icon>
          </v-btn>

          <v-btn icon @click="openCart" class="mr-2">
          <v-badge :content="totalCartItems">
              <v-icon>mdi-cart</v-icon> 
          </v-badge>
        </v-btn>
        </v-col>
    </v-row>
    </v-app-bar>
    
    <v-navigation-drawer
      v-model="navDrawer"
      temporary
      color="primary"
    >
      <v-list density="compact" nav>
        <v-list-item-group>
          <v-text-field
              placeholder="Search"
              filled
              dense
              variant="outlined"
              prepend-inner-icon="mdi-magnify"
              class="mt-2"
              clearable
              ></v-text-field>
          <v-divider></v-divider>
          <v-list-item
            class="d-flex justify-space-between mb-2"
            @click="navigateTo('/')"
            append-icon="mdi-home"
          >
            <span>Home</span>
          </v-list-item>
          <v-list-item
            class="d-flex justify-space-between mb-2"
            @click="navigateTo('/categories')"
            append-icon="mdi-format-list-bulleted-square"
          >
            <span>Categories</span>
          </v-list-item>
          <v-list-item
            class="d-flex justify-space-between mb-2"
            @click="navigateTo('/products')"
            append-icon="mdi-shopping"
          >
            <span>Products</span>
          </v-list-item>
          <v-list-item
            class="d-flex justify-space-between mb-2"
            @click="navigateTo('/services')"
            append-icon="mdi-shape-plus"
          >
            <span>Services</span>
          </v-list-item>
          <v-list-item
            class="d-flex justify-space-between mb-2"
            @click="navigateTo('/about')"
            append-icon="mdi-information-outline"
          >
            <span>About</span>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <Cart ref="cartRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Cart from '@/components/CartDialog.vue';

import { useCartStore } from '@/stores/cart';
const cartStore = useCartStore();
const cartRef = ref(null);
import { useRouter } from 'vue-router';

const openCart = () => {
  if (cartRef.value) {
    cartRef.value.open();
  }
};
const totalCartItems = computed(() => cartStore.totalItems);

import { watch } from 'vue'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay();
const isMobile = ref(mobile.value); // Initialize with the current value

// Watch for changes in mobile display state
watch(mobile, (newValue) => {
  isMobile.value = newValue; // Update isMobile whenever mobile changes
});

const router = useRouter();
const tab = ref('home');
const searchDialog = ref(false);
const navDrawer = ref(false);
const searchBarClosed = ref(true);

const navigateTo = (path) => {
  router.push(path);
};

  const logo = computed(() => { 
    return "@/assets/logo.png";
  })

</script>

<style scoped lang="sass">
  .expanding-search
    transition: max-width 0.3s !important
    max-width: 300px
    &.closed-search
      max-width: 48px

  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)

  
</style>
