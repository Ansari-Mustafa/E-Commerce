<template>
    <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="item.name"
          :rules="[rules.required]"
          label="Item Name"
          required
        ></v-text-field>
  
        <v-text-field
          v-model="item.price"
          :rules="[rules.required, rules.number]"
          label="Price"
          required
          type="number"
        ></v-text-field>
  
        <v-text-field
          v-model="item.stock"
          :rules="[rules.required, rules.number]"
          label="Quantity in Stock"
          required
          type="number"
        ></v-text-field>
  
        <v-file-input
          v-model="item.img"
          :rules="[rules.required]"
          label="Upload Image"
          accept="image/*"
          required
          @change="handleFileUpload"
        ></v-file-input>
  
        <v-btn :disabled="!valid" color="primary" @click="submitForm">
          Submit
        </v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ItemUpload',
    data() {
      return {
        valid: false,
        item: {
          name: '',
          img: null,
          price: null,
          stock: null,
        },
        rules: {
          required: value => !!value || 'Required.',
          number: value => !isNaN(value) || 'Must be a number.',
        },
      };
    },
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          this.item.img = file; // Store the entire file object for upload
        }
      },
      submitForm() {
        if (this.$refs.form.validate()) {
          // Prepare form data
          const formData = new FormData();
          formData.append('img', this.item.img); // Append file
          formData.append('name', this.item.name);
          formData.append('price', parseFloat(this.item.price));
          formData.append('stock', parseInt(this.item.stock));
  
          // Send data to the backend
          axios.post(`${import.meta.env.VITE_API_URL}/api/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(response => {
            console.log('Item saved:', response.data);
            // Reset form
            this.resetForm();
          })
          .catch(error => {
            console.error('Error saving item:', error);
          });
        }
      },
      resetForm() {
        this.item = {
          name: '',
          img: null,
          price: null,
          stock: null,
        };
        this.$refs.form.reset();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  