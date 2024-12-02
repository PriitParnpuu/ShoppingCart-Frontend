<!-- src/pages/WorkingShoppingCart.vue -->
<template>
  <div class="container py-5">
    <h1 class="text-center text-primary mb-4">Shopping Cart</h1>

    <!-- Add Product Form -->
    <AddProductForm @productAdded="fetchCart" />

    <!-- Cart Items Table -->
    <CartTable :cartItems="cartItems" @productRemoved="fetchCart" />

    <!-- Cart Totals -->
    <CartSummary :cartTotal="cartTotal" :cartTax="cartTax" :taxedTotal="taxedTotal" />
  </div>
</template>

<script>
import { fetchCart } from "../api/cart";
import AddProductForm from "../components/cart/AddProductForm.vue";
import CartTable from "../components/cart/CartTable.vue";
import CartSummary from "../components/cart/CartSummary.vue";

export default {
  components: {
    AddProductForm,
    CartTable,
    CartSummary,
  },
  data() {
    return {
      cartItems: [],
      cartTotal: 0,
      cartTax: 0,
      taxedTotal: 0,
    };
  },
  methods: {
    async fetchCart() {
      const data = await fetchCart();
      if (data) {
        this.cartItems = data.cartItems;
        this.cartTotal = data.cartTotal;
        this.cartTax = data.cartTax;
        this.taxedTotal = data.taxedTotal;
      }
    },
  },
  mounted() {
    this.fetchCart();
  },
};
</script>

<style scoped>
/* Custom styles for the page */
</style>
