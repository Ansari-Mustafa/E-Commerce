<template>
    <v-menu activator="#profile-menu" :close-on-content-click="false">
      <v-card min-width="200" v-if="user">
        <v-list>
          <v-list-item :prepend-avatar="user.photoURL" :subtitle="user.email" :title="user.displayName">
          </v-list-item>
          <v-divider></v-divider>
            <v-list-item
            :ripple="{ class: 'text-primary' }"
            @click="console.log('Orders')"
              class="w-100"
                prepend-icon="mdi-shopping"
              >My Orders
            </v-list-item>
            <v-list-item
            :ripple="{ class: 'text-primary' }"
            @click="console.log('Address')"
              class="w-100"
                prepend-icon="mdi-map-marker-multiple"
              >Shipping Address
            </v-list-item>
            <v-list-item
            :ripple="{ class: 'text-primary' }"
            @click="console.log('Wishlist')"
              class="w-100"
                prepend-icon="mdi-heart"
              >Wishlist
            </v-list-item>
            <v-list-item
            :ripple="{ class: 'text-primary' }"
            @click="console.log('Account')"
              class="w-100"
                prepend-icon="mdi-account-star"
              >Account Details
            </v-list-item>
            <v-list-item v-if="admins.includes(user.uid)"
            :ripple="{ class: 'text-primary' }"
            @click="$router.push('/add-products')"
              class="w-100"
                prepend-icon="mdi-shield-account"
              >Admin Panel
            </v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            append-icon="mdi-pencil"
            variant="tonal"
            color="lab"
            @click="handleEditProfile"
          >
            Edit Profile
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="tonal"
            append-icon="mdi-logout"
            @click="handleLogout"
          >
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <v-card-actions class="d-flex flex-column">
          <v-btn
          class="w-100"
            color="primary"
            variant="tonal"
            append-icon="mdi-login"
            @click="router.push('/login')"
          >
            Login
          </v-btn>
          <v-btn
            append-icon="mdi-account-plus"
            variant="tonal"
            color="lab"
            @click="router.push('/register')"
          >
            Register
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { logout } from '@/router/authService';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  
  const user = JSON.parse(localStorage.getItem('user'));
  const fav = ref(false);
  const admins = ref(import.meta.env.VITE_ADMINS.split(','));
  
  // Handle logout function
  const handleLogout = async () => {
    try {
      await logout();
      console.log('Logged out successfully');
      window.location.reload(); // Refresh the page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  // You can define the handleEditProfile function if needed
  const handleEditProfile = () => {
    // Logic for editing the profile
  };
  </script>
  
  <style scoped>
  /* Add any styles you need here */
  </style>
  