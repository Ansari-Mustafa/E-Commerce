<template>
    <div class="about-page" style="padding: 2em;"> 
        <v-container> 
            <v-row> 
                <v-col> 
                    <h1 class="text-center"
                    :class="lgText">Welcome to <span class="gill-sans-font font-weight-bold">Deezign Lab</span></h1> 
                    <p class=" text-center"
                    :class="mdText"> Your go-to destination for precision 3D printing and CAD modeling services in Pakistan. </p> 
                </v-col> 
            </v-row>

            <v-divider></v-divider>

            <v-row class="my-4">
            <v-col md="6" class="d-flex align-center">
                <v-img src="/deezignlab-logo.png" class="about-image" contain></v-img>
            </v-col>
            <v-col md="6">
                <h2 :class="lgText" class="text-h3">Our Passion for <br><span class="text-lab">3D</span><span class="text-primary"> Printing</span></h2>
                <p :class="mdText" class="pt-4">
                At <span class="gill-sans-font font-weight-bold">Deezign Lab</span>, we transform your ideas into tangible reality with our state-of-the-art 3D printing technology. 
                Whether you’re a designer seeking prototypes or an individual with a unique idea, we’re here to bring your vision to life.
                </p>
                <p class="text-h6">
                Located in the vibrant cities of Islamabad and Karachi, our team combines creativity with technical expertise, ensuring every print is a masterpiece.
                </p>
            </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row class="my-4">
            <v-col md="6">
                <h2 :class="lgText">Our Services</h2>
                <ul class="pl-6 pt-4"
                :class="mdText">
                <li><strong>3D Printing:</strong> Browse our extensive catalog of products and get high-quality 3D prints tailored to your needs.</li>
                <li><strong>Custom Quotes:</strong> Have a unique model in mind? Contact us for a personalized quote on any 3D model!</li>
                <li><strong>CAD Modeling:</strong> Need a design? Our skilled team offers CAD modeling services to help you create the perfect model.</li>
                </ul>
            </v-col>
            <v-col md="6" class="d-flex align-center">
                <v-img src="/printer.png" class="services-image" contain></v-img>
            </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row class="my-4">
            <v-col>
                <h2 :class="lgText">Why Choose Us?</h2>
                <p :class="mdText" class="pt-4">
                Our commitment to quality, innovation, and customer satisfaction sets us apart. We utilize advanced 3D printing technologies and materials to ensure that every project meets the highest standards. 
                Your satisfaction is our top priority, and we are dedicated to making your experience seamless and enjoyable.
                </p>
                <p :class="mdText">
                Join us in revolutionizing the way we create. Let’s make your ideas come to life, one layer at a time!
                </p>
            </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row class="my-4">
            <v-col>
                <h2 :class="lgText">Get in Touch</h2>
                <p class="pt-3" :class="mdText">
                Ready to start your 3D printing journey with us? Reach out today for quotes, inquiries, or to discuss your next big idea!
                </p>
                <v-btn color="primary" class="mt-4" size="x-large">Contact Us</v-btn>
            </v-col>
            </v-row>
        </v-container> 
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useDisplay } from 'vuetify';

// Use the display composable
const { mobile } = useDisplay();
const isMobile = ref(mobile.value); // Initialize with the current value

// Watch for changes in mobile value
watch(mobile, (newValue) => {
  isMobile.value = newValue;
});

// Computed property for text class
const lgText = computed(() => {
  return isMobile.value ? 'text-h3' : 'text-h1';
});
const mdText = computed(() => {
  return isMobile.value ? 'text-body' : 'text-h5';
});
</script>

<style scoped> 
    .about-image, .services-image { 
        max-width: 100%; 
        height: auto; 
    } 

</style>
