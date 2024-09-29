<template>
    <v-card
    color=""
    rounded="xl"
    class="mx-auto my-12"
    :width="260"
    :height="325">

    <v-card-title>Product Name</v-card-title>

    <v-img src="@/assets/logo.png"
    class="ma-auto"
    :max-width="240"
    :max-height="180"
    ></v-img>

    <v-card-text>Price</v-card-text>

    <div class="text-center mx-auto my-auto">
        <v-btn color="blue"
            varient="text"
            flat
            rounded="pill"
            class="mr-2">
            Add to Cart
        </v-btn>

        <v-btn color="blue"
            varient="text"
            flat
            rounded="pill">
            Buy Now
        </v-btn>
    </div>
        

    </v-card>
</template>
  
<script>
</script>