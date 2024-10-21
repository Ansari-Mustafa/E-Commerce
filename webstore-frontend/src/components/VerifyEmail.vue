<template>
    <v-card>
      <h2>Email Verification</h2>
      <p v-if="isVerified">Your email has been verified! You can now log in.</p>
      <p v-else>Verifying your email...</p>
    </v-card>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  
  const isVerified = ref(false);
  const router = useRouter();
  
  onMounted(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        isVerified.value = user.emailVerified;
        if (isVerified.value) {
          router.push('/');
        }
      }
    });
  });
  </script> 