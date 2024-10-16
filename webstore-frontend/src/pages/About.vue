<template>
    <div class="about-page" style="padding: 2em;"> 
        <v-container> 
            <v-row> 
                <v-col> 
                    <h1 class="text-h3 text-center">Welcome to <span class="gill-sans-font font-weight-bold">Deezign Lab</span></h1> 
                    <p class="text-h6 text-center"> Your go-to destination for precision 3D printing and CAD modeling services in Pakistan. </p> 
                </v-col> 
            </v-row>

            <v-divider></v-divider>

            <v-row class="my-4">
            <v-col md="6" class="d-flex align-center">
                <v-img src="/deezignlab-logo.png" class="about-image" contain></v-img>
            </v-col>
            <v-col md="6">
                <h2 class="text-h5">Our Passion for 3D Printing</h2>
                <p>
                At [Your Business Name], we transform your ideas into tangible reality with our state-of-the-art 3D printing technology. 
                Whether you’re a designer seeking prototypes or an individual with a unique idea, we’re here to bring your vision to life.
                </p>
                <p>
                Located in the vibrant cities of Islamabad and Karachi, our team combines creativity with technical expertise, ensuring every print is a masterpiece.
                </p>
            </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row class="my-4">
            <v-col md="6">
                <h2 class="text-h5">Our Services</h2>
                <ul>
                <li><strong>3D Printing:</strong> Browse our extensive catalog of products and get high-quality 3D prints tailored to your needs.</li>
                <li><strong>Custom Quotes:</strong> Have a unique model in mind? Contact us for a personalized quote on any 3D model!</li>
                <li><strong>CAD Modeling:</strong> Need a design? Our skilled team offers CAD modeling services to help you create the perfect model.</li>
                </ul>
            </v-col>
            <v-col md="6" class="d-flex align-center">
                <v-img src="/deezignlab-logo.png" class="services-image" contain></v-img>
            </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row class="my-4">
            <v-col>
                <h2 class="text-h5">Why Choose Us?</h2>
                <p>
                Our commitment to quality, innovation, and customer satisfaction sets us apart. We utilize advanced 3D printing technologies and materials to ensure that every project meets the highest standards. 
                Your satisfaction is our top priority, and we are dedicated to making your experience seamless and enjoyable.
                </p>
                <p>
                Join us in revolutionizing the way we create. Let’s make your ideas come to life, one layer at a time!
                </p>
            </v-col>
            </v-row>

            <v-divider></v-divider>

            <v-row class="my-4">
            <v-col>
                <h2 class="text-h5">Get in Touch</h2>
                <p>
                Ready to start your 3D printing journey with us? Reach out today for quotes, inquiries, or to discuss your next big idea!
                </p>
                <v-btn color="primary" @click="navigateToContact">Contact Us</v-btn>
            </v-col>
            </v-row>
        </v-container> 
    </div>
</template>

<script> 
export default { 
    methods: { 
        navigateToContact() { 
            this.$router.push({ name: 'Contact' }); 
        } 
    } 
} 
</script> 
<style scoped> 
    .about-image, .services-image { 
        max-width: 100%; 
        height: auto; 
    } 

</style>
