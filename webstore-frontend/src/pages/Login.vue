<template>
    <v-container class="w-100 h-100 mt-5">
        <v-card class="my-auto mx-auto w-auto pa-8" max-width="600" elevation="6">
            <v-card-title class="text-center text-h4 mb-2">
                Login
            </v-card-title>
            <form @submit.prevent="handleLogin">
                <v-text-field
                class="mb-4 pointer"
                    v-model="email"
                    label="Email address"
                    placeholder="email@example.com"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    :rules="emailRules"
                    :error-messages="emailErrorMessage"
                ></v-text-field>
            
                <v-text-field
                class="pointer"
                v-model="password"
                :rules="passwordRules"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                label="Password"
                @click:append-inner="visible = !visible"
                :error-messages="errorMessage ? [errorMessage] : []"
                ></v-text-field>
            <v-card-text class="text-end py-0 my-0">
                <a @click="$router.push('/reset-password')" class="text-subtitle-1 text-blue text-right pointer">Forgot Password?</a>
            </v-card-text>
        
            <v-col class="d-flex flex-column">
                <v-btn type="submit" color="primary" size="large" class="">Login</v-btn>
                <v-divider :thickness="3" class="mx-4 my-4"></v-divider>
                <v-btn @click="handleGoogleLogin" color="red-darken-1" variant="outlined" prepend-icon="mdi-google" size="large" class="font-weight-bold">Continue with Google</v-btn>

                <v-divider :thickness="3" class="mx-4 my-5">Dont have an account?</v-divider>
                <v-btn :ripple="false" append-icon="mdi-chevron-right" text="Sign Up" variant="plain" color="blue" @click="$router.push('/register')">

                </v-btn>
            </v-col>
        </form>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login, loginWithGoogle } from '@/router/authService';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');
const emailErrorMessage = ref('');

const emailRules = [
    v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Invalid email format'
];

const passwordRules = [
    value => !!value || 'Password is required'
];

const handleLogin = async () => {
    // Validate email using the rules
    const emailValidations = emailRules.map(rule => rule(email.value));
    const emailHasErrors = emailValidations.some(validation => validation !== true);
    
    if (emailHasErrors) {
        emailErrorMessage.value = emailValidations.filter(validation => validation !== true).join(', ');
        return; // Prevent submission
    }

    try {
        const userCredential = await login(email.value, password.value);
        const user = userCredential.user;

        // Store user data in local storage
        localStorage.setItem('user', JSON.stringify({
            displayName: user.displayName,
            emailVerified: user.emailVerified,
            email: user.email,
            photoURL: user.photoURL,
            token: await user.getIdToken(),
            uid: user.uid
        }));
        window.location.reload();
    } catch (error) {
        errorMessage.value = "Invalid Credentials";
    }
};  
 

const handleGoogleLogin = async () => {
    try {
        const userCredential = await loginWithGoogle();
        const user = userCredential.user;
        console.log(user);
        console.log(userCredential)

        // Store user data in local storage
        localStorage.setItem('user', JSON.stringify({
            displayName: user.displayName,
            emailVerified: user.emailVerified,
            email: user.email,
            photoURL: user.photoURL,
            token: await user.getIdToken(),
            uid: user.uid
        }));

        window.location.reload();
    } catch (error) {
        errorMessage.value = error.message;
    }
};


const visible = ref(false)

</script>

<style>
.pointer {
    cursor: pointer !important;
}
</style>