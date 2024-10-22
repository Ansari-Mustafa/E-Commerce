<template>
  <div class="d-flex justify-center align-center mt-10 mb-2">
    <h1 class="text-h2 gill-sans-font font-weight-bold">Add Products</h1>
  </div>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row class="mx-auto my-2">
        <v-text-field
          :min-width="300"
          v-model="product.name"
          :rules="nameRules"
          label="Product Name"
          required
          variant="outlined"
          class="mr-4"
        ></v-text-field>

        <v-select
          :max-width="500"
          v-model="product.category"
          clearable
          chips
          :rules="categoryRules"
          label="Category"
          :items="['Utility', 'Gadgets', 'Kitchen', 'Mobile Accessories', 'Anime', 'Lamps', 'Custom']"
          multiple
          variant="outlined"
        ></v-select>

        <v-btn class="mt-1 ml-1" icon="mdi-plus" rounded="lg" color="primary"></v-btn>
      </v-row>

      <v-row class="mx-auto my-2">
        <v-text-field
          v-model="tagsInput"
          label="Tags (Separate with commas)"
          variant="outlined"
          class="mr-4"
          @blur="updateTags"
        ></v-text-field>

        <v-text-field
          v-model="specsInput"
          label="Specs (Separate with commas)"
          variant="outlined"
          @blur="updateSpecs"
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
        <v-file-input
          class="w-33 mr-4"
          v-model="coverImage"
          label="Cover Image"
          clearable 
          variant="outlined"
          required
          prepend-icon="mdi-image"
          show-size
          accept="image/*"
          :rules="coverImageRules"
        ></v-file-input>

        <v-file-input
          class="w-50"
          v-model="imageFiles"
          label="Additional Images"
          multiple
          chips
          prepend-icon="mdi-image-multiple"
          counter
          show-size
          clearable 
          variant="outlined"
          accept="image/*"
        ></v-file-input>
      </v-row>

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

      <v-row class="my-2 px-2">
        <v-number-input
          class="mr-4"
          required
          v-model="product.stock"
          :reverse="false"
          controlVariant="stacked"
          label="Stock"
          :hideInput="false"
          :inset="false"
          :max="100"
          :min="0"
          :step="5"
          variant="outlined"
        ></v-number-input>
        <v-number-input
          class="mr-4"
          required
          v-model="product.rating"
          :reverse="false"
          controlVariant="split"
          label="Rating (0-5)"
          :hideInput="false"
          :inset="false"
          :max="5"
          :min="1"
          :step="0.5"
          variant="outlined"
        ></v-number-input>

        <v-number-input
          v-model="product.sortOrder"
          :reverse="false"
          controlVariant="split"
          label="Sort Order"
          :hideInput="false"
          :inset="false"
          :max="25"
          :min="1"
          :step="1"
          variant="outlined"
        ></v-number-input>
      </v-row>

      <v-btn color="primary" @click="submit" :disabled="!valid">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const valid = ref(false);
const product = ref({
  name: '',
  description: '',
  category: [], // Array for categories
  tags: [],
  specs: [],
  stock: null,
  price: null,
  old_price: null,
  rating: null,
  sortOrder: 0,
});
const tagsInput = ref('');
const specsInput = ref('');
const coverImage = ref(null);
const imageFiles = ref([]);

const nameRules = [(v) => !!v || 'Name is required'];
const descriptionRules = [(v) => !!v || 'Description is required'];
const categoryRules = [(v) => (v.length > 0) || 'At least one category is required'];
const stockRules = [(v) => (v >= 0) || 'Stock must be at least 0'];
const priceRules = [(v) => (v >= 0) || 'Price must be at least 0'];
const coverImageRules = [
  (v) => !!v || 'Cover image is required', // Required
  (v) => {
    if (!v) return true; // Skip type check if no file is selected
    const validTypes = ['image/jpeg', 'image/png'];
    return validTypes.includes(v.type) || 'Cover Image is required';
  },
  (v) => {
    if (!v) return true; // Skip size check if no file is selected
    const maxSizeInMB = 5; // Set your max file size in MB
    return v.size <= maxSizeInMB * 1024 * 1024 || `File size must be less than ${maxSizeInMB} MB`;
  }
];


// Function to update tags array
const updateTags = () => {
  product.value.tags = tagsInput.value.split(',').map(tag => tag.trim()).filter(tag => tag);
};

// Function to update specs array
const updateSpecs = () => {
  product.value.specs = specsInput.value.split(',').map(spec => spec.trim()).filter(spec => spec);
};

const submit = async () => {
  const formData = new FormData();
  formData.append('coverImage', coverImage.value);
  imageFiles.value.forEach(file => {
    formData.append('images', file);
  });

  // Append arrays correctly
  product.value.category.forEach(cat => formData.append('category[]', cat));
  product.value.tags.forEach(tag => formData.append('tags[]', tag));
  product.value.specs.forEach(spec => formData.append('specs[]', spec));

  Object.keys(product.value).forEach(key => {
    if (!Array.isArray(product.value[key])) {
      formData.append(key, product.value[key]);
    }
  });

  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/products/create-product`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // Handle success
  } catch (error) {
    console.error("Error adding Product!", error);
    // Handle error
  }
};

const resetForm = () => {
  product.value = {
    name: '',
    description: '',
    category: [],
    tags: [],
    specs: [],
    stock: null,
    price: null,
    old_price: null,
    rating: null,
    sortOrder: 0,
  };
  coverImage.value = null;
  imageFiles.value = [];
  tagsInput.value = '';
  specsInput.value = '';
};
</script>

<style scoped>
</style>
