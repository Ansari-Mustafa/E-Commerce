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
      :max-width="240"
      :max-height="180"
      :min-width="240"
      :min-height="180"
      @error="onImageLoadError"
    ></v-img>

    <div class="d-flex justify-center align-end mt-6">
        <p class="font-weight-bold text-body-1 mr-2">{{ props.price }} Rs.</p>
        <p v-if="props.old_price" class="text-decoration-line-through text-red font-weight-bold text-caption">{{ props.old_price }} Rs.</p>
    </div>

    <div class="d-flex justify-center my-auto">
        <v-rating
            class="position-absolute left-0 bottom-0 ml-3 mb-2 py-2"
            half-increments
            density="compact"
            readonly
            :length="5"
            :size="20"
            :model-value="props.rating"
            color=""
            active-color="yellow-darken-3"
            />
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

        <Counter v-else class="position-absolute left-0 bottom-0 ml-8 mb-2" :itemID="props.id" :itemStock="props.stock" :elevation="3"/>
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