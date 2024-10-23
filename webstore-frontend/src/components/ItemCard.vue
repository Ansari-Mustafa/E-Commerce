<template>
    <v-card
    color=""
    rounded="lg"
    class="mx-auto my-12"
    :width="260"
    :height="325">

    <v-card-title>{{ props.name }}</v-card-title>

    <v-img 
      :src="computedImg" 
      class="ma-auto"
      :max-width="300"
      :max-height="220"
      :min-width="240"
      :min-height="180"
      @error="onImageLoadError"
    ></v-img>


    <div class="d-flex justify-center my-auto">
        <div class="d-flex-row justify-center align-end mb-1 position-absolute bottom-0 left-0 ml-6">
            <p v-if="props.old_price" class="text-decoration-line-through text-red font-weight-bold text-caption ml-n2 text-start mb-n2">{{ props.old_price }} Rs.</p>
            <p class="font-weight-bold text-body-1 ml-2 mb-2">{{ props.price }} Rs.</p>
        </div>
        
        <v-fade-transition hide-on-leave>
            <v-btn v-if="!showCounter"
            color="blue"
            size="default"
            varient="text"
            flat
            rounded="lg"
            @click="addToCart"
            class="position-absolute right-0 bottom-0 mr-2 mb-2">
            Add to Cart
        </v-btn>

        <Counter v-else class="position-absolute right-0 bottom-0 mr-6 mb-2" :itemID="props.id" :itemStock="props.stock" :elevation="1"/>
    </v-fade-transition>
        

        <!-- <v-btn color="blue"
            varient="text"
            flat
            rounded="lg"
            class="position-absolute right-0 bottom-0 mr-2 mb-2">
            Buy Now
        </v-btn> -->
    </div>
        

    </v-card>
</template>

<script setup>
import { ref, computed } from 'vue';
import logo from '@/../public/logo.png';
import Counter from './Counter.vue';
import { useCartStore } from '@/stores/cart'; // Import the store

const props = defineProps({
    id: {
        type: Number,
        required: true
    },
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
    },
    old_price: {
        type: Number,
        required: false
    },
    stock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: false,
        default: 0
    }
});

const isImageLoaded = ref(true); 
const showCounter = ref(false);
const cartStore = useCartStore(); // Access the cart store

const computedImg = computed(() => {
    return isImageLoaded.value ? props.img : logo; 
});

const onImageLoadError = () => {
    isImageLoaded.value = false; 
};

const addToCart = () => {
    cartStore.addItemToCart({ id: props.id, name: props.name, price: props.price, img: props.img, stock:props.stock });
    showCounter.value = true;
};

</script>