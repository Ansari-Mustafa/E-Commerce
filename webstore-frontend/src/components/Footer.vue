<template>
    <v-footer
      class="bg-primary text-center d-flex flex-column mt-8"
      height="auto"
    >
    <div>
        <v-btn
            v-for="(icon, index) in icons"
            :key="icon"
            :icon="icon"
            class="mx-4"
            variant="text"
            @click="navigateToLink(links[index])"
        ></v-btn>
    </div>
    
    <v-container>
        <v-row>
        <v-col cols="12" md="4">
          <h6 class="text-subtitle-1 font-weight-bold">Quick Links</h6>
          <v-row>
            <v-col>
                <a href="/">Home</a>
                <br>
                <a href="/products">Products</a>
                <br>
                <a href="/categories">Categories</a>
            </v-col>
            <v-col>
                <a href="/services">Services</a>
                <br>
                <a href="/about">About</a>
                <br>
                <a href="/login">Login</a>
                <br>
            </v-col>
          </v-row>          
        </v-col>

        <v-col cols="12" md="4">
          <h6 class="text-subtitle-1 font-weight-bold">Our Locations</h6>
          <a href="">Karachi</a>
          <br>
          <a href="/">Islamabad</a>
        </v-col>

        <v-col cols="12" md="4">
          <h6 class="text-subtitle-1 font-weight-bold">Contact Us</h6>
          <p>For inquiries, call: <a href="tel:00923340005088">+92 334 0005088</a></p>
          <p>Email: <a href="mailto:labdeezign@gmail.com">labdeezign@gmail.com</a></p>
        </v-col>
      </v-row>
    </v-container>

    <v-divider></v-divider>

    <v-container class="">
        <v-row>
        <v-col class="text-center">
          <small>&copy; {{ new Date().getFullYear() }}  —  <strong class="gill-sans-font font-italic">DEEZIGN LAB LLC.</strong> All rights reserved.</small>
        </v-col>
      </v-row>
    </v-container>
    </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-whatsapp',
      'mdi-linkedin',
      'mdi-instagram',
    ],
    links: [
      'https://www.facebook.com/profile.php?id=61567072687466', // Add your Facebook link
      'https://wa.me/923340005088', // Add your WhatsApp link
      'https://www.linkedin.com/in/deezignlab', // Add your LinkedIn link
      'https://www.instagram.com/deezignlab', // Add your Instagram link
    ],
  }),
  methods: {
    navigateToLink(link) {
      window.open(link, '_blank');
    },
  },
}
</script>

<style>
 a {
    color:rgb(26, 206, 113);
 }
</style>