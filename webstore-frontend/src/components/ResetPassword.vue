<template>
    <v-container class="h-100 w-100">
        <v-card class="w-auto mx-auto" :max-width="700">
            <h1 class="text-center mb-4">Reset Password</h1>
            <form @submit.prevent="handleForgotPassword">
                <v-text-field
                  v-model="email"
                  :error-messages="showErrors ? emailErrorMessage : ''"
                  :rules="emailRules"
                  class="px-4"
                  label="Email address"
                  placeholder="email@example.com"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                ></v-text-field>
                <p class="text-center my-2" v-if="alertmsg">{{ alertmsg }}</p>
                <div class="text-center mb-4">
                    <v-btn type="submit" color="primary" size="large" :disabled="emailSent">
                      Reset
                    </v-btn>
                </div>
            </form>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { forgotPassword } from '@/router/authService';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const alertmsg = ref('');
const emailSent = ref(false);
const showErrors = ref(false);
const emailRules = [
    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Invalid email format'
];

const emailErrorMessage = ref('');

const handleForgotPassword = async () => {
    showErrors.value = true; // Show errors when the button is pressed
    const emailValidations = emailRules.map(rule => rule(email.value));
    const emailHasErrors = emailValidations.some(validation => validation !== true);

    if (emailHasErrors) {
        emailErrorMessage.value = emailValidations.filter(validation => validation !== true).join(', ');
        return; // Prevent submission
    }

    try {
        await forgotPassword(email.value);
        emailSent.value = true;
        alertmsg.value = "Password reset email sent! Please check your inbox.";
        setTimeout(() => {
            router.push('/')
        }, 1500);
    } catch (error) {
        alertmsg.value = "Error sending password reset email."
        console.error('Error sending password reset email: ' + error.message);
    }
};
</script>
