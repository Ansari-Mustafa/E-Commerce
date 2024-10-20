<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="product.name"
        label="Product Name"
        variant="outlined"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <v-textarea
        v-model="product.description"
        label="Product Description"
        variant="outlined"
        :rules="[rules.required]"
        required
      ></v-textarea>

      <v-text-field
        v-model="product.category"
        label="Category"
        variant="outlined"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <v-text-field
        v-model="product.coverImage"
        label="Cover Image URL"
        variant="outlined"
        :rules="[rules.required]"
        required
      ></v-text-field>

      <v-text-field
        v-model="product.stock"
        label="Stock"
        variant="outlined"
        :rules="[rules.required, rules.numeric]"
        required
      ></v-text-field>

      <v-text-field
        v-model="product.price"
        label="Price"
        variant="outlined"
        :rules="[rules.required, rules.numeric]"
        required
      ></v-text-field>

      <v-text-field
        v-model="product.old_price"
        label="Old Price"
        variant="outlined"
        :rules="[rules.numeric]"
      ></v-text-field>

      <v-textarea
        v-model="product.images"
        label="Image URLs (comma-separated)"
        variant="outlined"
        :rules="[rules.required]"
        required
        hint="Enter multiple image URLs separated by commas."
      ></v-textarea>

      <v-text-field
        v-model="product.rating"
        label="Rating (0-5)"
        variant="outlined"
        :rules="[rules.required, rules.numeric]"
        required
      ></v-text-field>

      <v-btn @click="submit" color="primary">Add Product</v-btn>

      <v-alert
        v-if="successMessage"
        type="success"
        dismissible
        @close="successMessage = ''"
      >
        {{ successMessage }}
      </v-alert>

      <v-alert
        v-if="errorMessage"
        type="error"
        dismissible
        @close="errorMessage = ''"
      >
        {{ errorMessage }}
      </v-alert>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      successMessage: '',
      errorMessage: '',
      product: {
        name: '',
        description: '',
        category: '',
        coverImage: '',
        stock: '',
        price: '',
        old_price: '',
        images: '',
        rating: '',
      },
      rules: {
        required: value => !!value || 'Required.',
        numeric: value => !isNaN(value) || 'Must be a number.',
      },
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        // Split the images string into an array
        this.product.images = this.product.images.split(',').map(url => url.trim());

        try {
          const response = await fetch('http://localhost:5000/api/products/create-product', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.product),
          });

          const data = await response.json();
          if (response.ok) {
            this.successMessage = data.message;
            this.resetForm();
          } else {
            this.errorMessage = 'Error: ' + data.message;
          }
        } catch (error) {
          this.errorMessage = 'Network error: ' + error.message;
        }
      }
    },
    resetForm() {
      this.product = {
        name: '',
        description: '',
        category: '',
        coverImage: '',
        stock: '',
        price: '',
        old_price: '',
        images: '',
        rating: '',
      };
      this.$refs.form.reset();
    },
  },
};
</script>

<style scoped>
.v-alert {
  margin-top: 20px;
}
</style>
