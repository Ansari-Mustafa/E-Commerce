<template>
    <v-menu activator="#profile-menu" :close-on-content-click="false">
      <v-card min-width="400" v-if="user">
        <v-list>
          <v-list-item :subtitle="user.email" :title="user.displayName">
            <template v-slot:append>
              <v-btn
                :class="fav ? 'text-red' : ''"
                icon="mdi-heart"
                variant="text"
                @click="fav = !fav"
              ></v-btn>
            </template>
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
            Edit
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
      <v-card min-width="400" v-else>
        <v-card-actions>
          <v-btn
            append-icon="mdi-account-plus"
            variant="tonal"
            color="lab"
            @click="router.push('/register')"
          >
            Register
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="tonal"
            append-icon="mdi-login"
            @click="router.push('/login')"
          >
            Login
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
  