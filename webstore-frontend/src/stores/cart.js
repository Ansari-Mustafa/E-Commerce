import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // State: Cart items
  const cartItems = ref([])

  // Add an item to the cart
  const addItemToCart = (item) => {
    const existingItem = cartItems.value.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
        if (existingItem.stock > existingItem.quantity)
            existingItem.quantity++
    } else {
      cartItems.value.push({ ...item, quantity: 1 })
    }
  }

  // Increment the quantity of an item
  const incrementQuantity = (itemID) => {
    const item = cartItems.value.find(cartItem => cartItem.id === itemID);
    if (item) {
      item.quantity++;
    }
  };
  
  // Decrement the quantity of an item
  const decrementQuantity = (itemID) => {
    const item = cartItems.value.find(cartItem => cartItem.id === itemID);
    if (item && item.quantity > 1) {
      item.quantity--;
    } else {
      // Optionally, remove the item when quantity is zero
      cartItems.value = cartItems.value.filter(cartItem => cartItem.id !== itemID);
    }
  };

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  return {
    cartItems,
    totalItems,
    addItemToCart,
    incrementQuantity,
    decrementQuantity
  }
})
