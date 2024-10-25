import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  // Load initial cart items from localStorage
  const cartItems = ref(JSON.parse(localStorage.getItem('cartItems')) || [])

  // Function to update localStorage
  const updateLocalStorage = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  }

  // Save cart items to localStorage whenever they change
  watch(cartItems, updateLocalStorage)

  // Add an item to the cart
  const addItemToCart = (item) => {
    const existingItem = cartItems.value.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
      if (existingItem.stock > existingItem.quantity) {
        existingItem.quantity++
      }
    } else {
      cartItems.value.push({ ...item, quantity: 1 })
    }
    updateLocalStorage() // Update localStorage here
  }

  // Increment the quantity of an item
  const incrementQuantity = (itemID) => {
    const item = cartItems.value.find(cartItem => cartItem.id === itemID)
    if (item) {
      item.quantity++
      updateLocalStorage() // Update localStorage here
    }
  }

  // Decrement the quantity of an item
  const decrementQuantity = (itemID) => {
    const item = cartItems.value.find(cartItem => cartItem.id === itemID)
    if (item && item.quantity > 1) {
      item.quantity--
    } else {
      // Remove the item when quantity is zero
      cartItems.value = cartItems.value.filter(cartItem => cartItem.id !== itemID)
    }
    updateLocalStorage() // Update localStorage here
  }

  // Remove an item from the cart
  const removeItemFromCart = (itemID) => {
    cartItems.value = cartItems.value.filter(cartItem => cartItem.id !== itemID)
    updateLocalStorage() // Update localStorage here
  }

  const totalItems = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  return {
    cartItems,
    totalItems,
    addItemToCart,
    incrementQuantity,
    decrementQuantity,
    removeItemFromCart
  }
})
