<template>
    <v-container class="w-100 h-100 mt-5">
      <v-card class="my-auto mx-auto w-auto pa-8" max-width="600" elevation="6">
        <v-progress-linear
          :indeterminate="loadingProgress"
          class="pa-0 ml-n8 position-absolute top-0 w-100"
          color="primary"
          :model-value="step * 100 / 4"
          :height="5"
        ></v-progress-linear>

        <h1 class="text-center mb-4" v-if="step < 3">Sign Up</h1>
  
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field
              class="mb-4"
                v-model="firstName"
                label="First Name"
                placeholder="John"
                :rules="firstNameRules"
                :error-messages="firstNameErrorMessage"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="lastName"
                label="Last Name (Optional)"
                placeholder="Doe"
                variant="outlined"
              ></v-text-field>
            </v-card-text>
          </v-window-item>
  
          <v-window-item :value="2">
            <v-card-text>
              <v-text-field
              class="mb-0"
                v-model="email"
                label="Email Address"
                placeholder="email@example.com"
                :rules="emailRules"
                :error-messages="emailErrorMessage"
                variant="outlined"
              ></v-text-field>
            </v-card-text>
          </v-window-item>
  
          <v-window-item :value="3">
            <v-card-text>
              <v-text-field
              class="mb-4"
                v-model="password"
                :rules="passwordRules"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                label="Password"
                @click:append-inner="visible = !visible"
                :error-messages="errorMessage ? [errorMessage] : []"
                variant="outlined"
              ></v-text-field>
  
              <v-text-field
              class="mb-2"
                v-model="confirmPassword"
                :rules="[value => value === password || 'Passwords must match']"
                :append-inner-icon="visibleConfirm ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visibleConfirm ? 'text' : 'password'"
                placeholder="Confirm your password"
                prepend-inner-icon="mdi-lock-outline"
                label="Confirm Password"
                :disabled="password.length < 8"
                @click:append-inner="visibleConfirm = !visibleConfirm"
                variant="outlined"
              ></v-text-field>
            </v-card-text>
          </v-window-item>
  
          <v-window-item :value="4" class="text-center">
            <v-icon size="x-large" color="primary">mdi-email</v-icon>
            <v-card-text>
              <h1>Verify your Email</h1>
              <p class="text-body">
                We have sent a verification email to <strong>{{ email }}</strong>. Please check your inbox and follow the instructions.
              </p>
            </v-card-text>
            <div class="d-flex justify-center mb-4">
              <v-btn class="mr-6" color="primary" size="large" @click="checkEmailVerification()">Verify Email</v-btn>
              <v-btn color="lab" size="large">Resend Email</v-btn>
            </div>
            <p v-if="notVerified" class="text-red">Email not verified yet. Please check your inbox.</p>
          </v-window-item>
        </v-window>
  
        <v-divider v-if="step <= 3"></v-divider>
  
        <v-card-actions class="mt-3" v-if="step <= 3">
          <v-btn v-if="step > 1" variant="text" @click="step--">
            Back
          </v-btn>
          <v-btn v-else color="primary" variant="outlined" @click="$router.push('/login')">Login</v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="step < 4"
            :disabled="step === 1 ? firstName.length < 4 : step === 2 ? !isEmailValid : !password || !confirmPassword"
            color="primary"
            variant="flat"
            @click="step < 3 ? step++ : handleRegister()"
          >
            {{ step < 3 ? 'Next' : 'Register' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { register, checkEmailVerification } from '@/router/authService'
  
  const loadingProgress = ref(false);
  const router = useRouter();
  const step = ref(1);
  const firstName = ref('');
  const lastName = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  const errorMessage = ref('');
  const emailErrorMessage = ref('');
  const firstNameErrorMessage = ref('');
  const notVerified = ref(false);
  
  const firstNameRules = [
    v => !!v || 'First name is required',
    value => value.length > 3 || 'Enter Valid Name'
  ];
  
  const isEmailValid = computed(() => {
  return emailRules.every(rule => rule(email.value) === true);
});

  const emailRules = [
    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Invalid email format'
  ];
  
  const passwordRules = [
    value => !!value || 'Password is required',
    value => value.length >= 8 || 'Password must be at least 8 characters long',
  ];
  
  const visible = ref(false);
  const visibleConfirm = ref(false);
  
  const handleRegister = async () => {
    loadingProgress.value = true;
    // Validate the form
    const emailValidations = emailRules.map(rule => rule(email.value));
    const emailHasErrors = emailValidations.some(validation => validation !== true);
  
    const passwordValidations = passwordRules.map(rule => rule(password.value));
    const passwordHasErrors = passwordValidations.some(validation => validation !== true);
  
    if (emailHasErrors || passwordHasErrors) {
      emailErrorMessage.value = emailValidations.filter(validation => validation !== true).join(', ');
      return; // Prevent submission
    }
  
    try {
      await register(firstName.value, lastName.value, email.value, password.value);
      step.value++;
      await checkEmailVerification(router, notVerified);
    //   checkEmailVerification();
    } catch (error) {
      if (error.message.includes("email-already-in-use")) {
        step.value = 2;
        loadingProgress.value = false;
        emailErrorMessage.value = "This email is already registered. Please use a different email.";
      } else {
        errorMessage.value = "Registration failed. Please try again.";
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  