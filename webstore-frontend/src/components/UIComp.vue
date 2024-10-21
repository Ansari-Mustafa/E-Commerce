<template>
    <div id="recaptcha-container-id"></div>
    <v-container>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="phoneNumber"
          label="Phone Number"
          :rules="[rules.required, rules.phone]"
          placeholder="+1234567890"
          clearable
        />
        <v-btn @click="sendCode" :disabled="!valid">Send Verification Code</v-btn>
  
        <v-text-field
          v-if="confirmationResult"
          v-model="verificationCode"
          label="Verification Code"
          :rules="[rules.required]"
          placeholder="Enter verification code"
          clearable
        />
        <v-btn v-if="confirmationResult" @click="confirmCode">Verify Code</v-btn>
  
        <v-alert
          v-if="message"
          :type="alertType"
          dismissible
          @close="message = ''"
        >
          {{ message }}
        </v-alert>
      </v-form>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { 
    sendVerificationCode, 
    confirmVerificationCode,
    setupRecaptcha // Import here
  } from '@/router/authService';
  
  const phoneNumber = ref('');
  const verificationCode = ref('');
  const confirmationResult = ref(null);
  const message = ref('');
  const alertType = ref('');
  const valid = ref(false);
  
  const rules = {
    required: value => !!value || 'Required.',
    phone: value => {
      const regex = /^\+?[1-9]\d{1,14}$/;
      return regex.test(value) || 'Invalid phone number.';
    }
  };
  
  const sendCode = async () => {
    try {
      const containerId = 'recaptcha-container-id';
      const appVerifier = setupRecaptcha(containerId); // Use the imported setupRecaptcha
      confirmationResult.value = await sendVerificationCode(phoneNumber.value, appVerifier);
      message.value = 'Verification code sent!';
      alertType.value = 'success';
      phoneNumber.value = ''; // Clear the phone number input
    } catch (error) {
      message.value = `Error sending verification code: ${error.message}`;
      alertType.value = 'error';
    }
  };
  
  const confirmCode = async () => {
    try {
      const user = await confirmVerificationCode(confirmationResult.value, verificationCode.value);
      message.value = 'Phone number verified successfully!';
      alertType.value = 'success';
    } catch (error) {
      message.value = `Error confirming verification code: ${error.message}`;
      alertType.value = 'error';
    }
  };
  </script>
  
  <style scoped>
  /* Add any styles here */
  </style>
  