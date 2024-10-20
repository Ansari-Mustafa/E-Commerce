<template>
  <div class="d-flex justify-center align-center mt-10 mb-2">
    <h1 class="text-h2 gill-sans-font font-weight-bold">Add Products</h1>
  </div>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row class="mx-auto my-2">
        <v-text-field
        v-model="product.name"
        :rules="nameRules"
        label="Product Name"
        required
        variant="outlined"
        class="mr-4"
      ></v-text-field>

      <v-text-field
        v-model="product.category"
        :rules="categoryRules"
        label="Category"
        required
        variant="outlined"
      ></v-text-field>
      </v-row>

      <v-textarea
      class="my-2"
        v-model="product.description"
        :rules="descriptionRules"
        label="Description"
        required
        variant="outlined"
      ></v-textarea>

      <v-row class="mx-auto my-2">
        <v-text-field
        v-model="product.coverImage"
        :rules="coverImageRules"
        label="Cover Image URL"
        required
        variant="outlined"
        class="mr-4"
      ></v-text-field>

      <v-text-field
        v-model="product.images"
        label="Images"
        @input="updateImages"
        required
        variant="outlined"
      ></v-text-field>
      </v-row>

      <v-text-field
      class="my-2"
        v-model.number="product.stock"
        :rules="stockRules"
        label="Stock"
        type="number"
        required
        variant="outlined"
      ></v-text-field>

      <v-row class="mx-auto my-2">
        <v-text-field
        v-model.number="product.price"
        :rules="priceRules"
        label="New Price"
        type="number"
        required
        variant="outlined"
        class="mr-4"
      ></v-text-field>

      <v-text-field
        v-model.number="product.old_price"
        label="Old Price"
        type="number"
        variant="outlined"
      ></v-text-field>
      </v-row>

      <v-text-field
      class="my-2"
        v-model.number="product.rating"
        label="Rating (0-5)"
        type="number"
        min="0"
        max="5"
        variant="outlined"
      ></v-text-field>

      <v-text-field
      class="my-2"
        v-model.number="product.sortOrder"
        label="Sort Order"
        type="number"
        min="0"
        variant="outlined"
      ></v-text-field>

      <v-btn color="primary"@click="submit" :disabled="!valid">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      valid: false,
      product: {
        name: '',
        description: '',
        category: '',
        coverImage: '',
        stock: null,
        price: null,
        old_price: null,
        images: [],
        rating: null,
        sortOrder: 0,
      },
      nameRules: [(v) => !!v || 'Name is required'],
      descriptionRules: [(v) => !!v || 'Description is required'],
      categoryRules: [(v) => !!v || 'Category is required'],
      coverImageRules: [(v) => !!v || 'Cover image URL is required'],
      stockRules: [(v) => (v >= 0) || 'Stock must be at least 0'],
      priceRules: [(v) => (v >= 0) || 'Price must be at least 0'],
    };
  },
  methods: {
    updateImages() {
      this.product.images = this.product.images.split(',').map(img => img.trim());
    },
    async submit() {
      try {
        const response = await axios.post(`https://backend-or8k.onrender.com/api/products/create-product`, this.product);
        this.$toast.success(response.data.message);
        this.resetForm();
      } catch (error) {
        console.error("Error adding Product!", error);
        this.$toast.error('Error adding product!');
      }
    },
    resetForm() {
      this.product = {
        name: '',
        description: '',
        category: '',
        coverImage: '',
        stock: null,
        price: null,
        old_price: null,
        images: [],
        rating: null,
        sortOrder: 0,
      };
      this.$refs.form.reset();
    }
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
