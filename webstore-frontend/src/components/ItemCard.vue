<template>
    <v-card
    color=""
    rounded="lg"
    class="mx-auto my-12"
    :width="260"
    :height="325">

    <v-card-title>{{ name }}</v-card-title>

    <v-img 
      :src="computedImg" 
      class="ma-auto"
      :max-width="240"
      :max-height="180"
      :min-width="240"
      :min-height="180"
      @error="onImageLoadError"
    ></v-img>

    <v-card-text class="px-6">{{ price }} Rs.</v-card-text>

    <div class="d-flex justify-center align-center mx-auto my-auto">
        <v-fade-transition hide-on-leave>
            <v-btn v-if="!showCounter"
            color="blue"
            size="default"
            varient="text"
            flat
            rounded="lg"
            @click="addToCart"
            class="position-absolute left-0 bottom-0 ml-2 mb-2">
            Add to Cart
        </v-btn>

        <Counter v-else class="position-absolute left-0 bottom-0 ml-8 mb-2"/>
    </v-fade-transition>
        

        <v-btn color="blue"
            varient="text"
            flat
            rounded="lg"
            class="position-absolute right-0 bottom-0 mr-2 mb-2">
            Buy Now
        </v-btn>
    </div>
        

    </v-card>
</template>
  
<script>
import logo from '@/../public/logo.png';
import Counter from './Counter.vue';
export default {
    name: 'ItemCard',
    props: {
        name: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }, data() {
        return {
            isImageLoaded: true, // Track if the image is loaded successfully
            showCounter: false,
        };
    },
    computed: {
        computedImg() {
            // Return the image or default logo based on load status
            return this.isImageLoaded ? this.img : logo; // Use imported logo
        }
    },
    methods: {
        // This method is called when the image fails to load
        onImageLoadError() {
            this.isImageLoaded = false; // Set to false if the image fails to load
        },
        addToCart() {
            this.showCounter = true;
        },
    },
    components: { Counter }
}
</script>