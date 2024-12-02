<!-- src/components/cart/AddProductForm.vue -->
<template>
  <div class="card mb-4 shadow-lg" style="background-color: #f1f8ff;">
    <div class="card-body">
      <h2 class="text-success">Add Product</h2>
      <form @submit.prevent="addProduct" class="row g-3">
        <div class="col-md-3">
          <input v-model="newProduct.name" placeholder="Product" class="form-control" required />
        </div>
        <div class="col-md-3">
          <div class="input-group">
            <span class="input-group-text bg-info text-white">$</span>
            <input v-model.number="newProduct.price" type="number" placeholder="Price" class="form-control" required />
          </div>
        </div>
        <div class="col-md-3">
          <input v-model.number="newProduct.quantity" type="number" placeholder="Qty" class="form-control" required />
        </div>
        <div class="col-md-3 d-grid">
          <button class="btn btn-warning shadow" type="submit">
            <i class="fas fa-cart-plus"></i> Add Product
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { addProduct } from "../../api/cart";

export default {
  data() {
    return {
      newProduct: { name: "", price: 0, quantity: 1 },
    };
  },
  methods: {
    async addProduct() {
      await addProduct(this.newProduct);
      this.$emit("productAdded");
      this.newProduct = { name: "", price: 0, quantity: 1 };
    },
  },
};
</script>

<style scoped>
/* Add custom styles for the form here */
</style>
