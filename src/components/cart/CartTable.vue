<!-- src/components/cart/CartTable.vue -->
<template>
  <div class="card mb-4 shadow-lg" style="background-color: #eaf0f7;">
    <div class="card-body">
      <h2 class="text-primary">Cart Items</h2>
      <table class="table table-hover table-bordered">
        <thead class="table-light">
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in cartItems" :key="item.name">
          <td>{{ item.name }}</td>
          <td>${{ item.price.toFixed(2) }}</td>
          <td>{{ item.quantity }}</td>
          <td>
            <button @click="removeProduct(item.name)" class="btn btn-danger btn-sm">
              <i class="fas fa-trash"></i> Remove
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { removeProduct } from "../../api/cart";

export default {
  props: ["cartItems"],
  methods: {
    async removeProduct(name) {
      await removeProduct(name);
      this.$emit("productRemoved");
    },
  },
};
</script>

<style scoped>
/* Add custom styles for the table here */
</style>
