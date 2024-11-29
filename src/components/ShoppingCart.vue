<template>
  <div class="container py-5">
    <h1 class="text-center text-primary mb-4">Shopping Cart</h1>

    <!-- Add Product Form -->
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

    <!-- Cart Items Table -->
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

    <!-- Cart Totals -->
    <div class="card mb-4 shadow-lg" style="background-color: #f3f7ff;">
      <div class="card-body">
        <h2 class="text-warning">Cart Totals</h2>
        <table class="table table-striped">
          <thead class="table-light">
          <tr>
            <th>Total</th>
            <th>Tax</th>
            <th>Total incl. Tax</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>${{ cartTotal.toFixed(2) }}</td>
            <td>${{ cartTax.toFixed(2) }}</td>
            <td>${{ taxedTotal.toFixed(2) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    apibase: "http://localhost:9001/api/cart",
    newProduct: { name: "", price: 0, quantity: 1 },
    cartItems: [],
    cartTotal: 0,
    cartTax: 0,
    taxedTotal: 0,
  }),
  methods: {
    fetchCart() {
      axios
          .all([
            axios.get(`${this.apibase}/cart-items`).then((res) => (this.cartItems = res.data)),
            axios.get(`${this.apibase}/cart-total`).then((res) => (this.cartTotal = res.data)),
            axios.get(`${this.apibase}/cart-tax`).then((res) => (this.cartTax = res.data)),
            axios.get(`${this.apibase}/cart-taxedtotal`).then((res) => (this.taxedTotal = res.data)),
          ])
          .catch((err) => console.error("Error fetching cart data:", err));
    },
    addProduct() {
      axios.post(`${this.apibase}/add-product`, this.newProduct).then(this.fetchCart);
      this.newProduct = { name: "", price: 0, quantity: 1 };
    },
    removeProduct(name) {
      axios.delete(`${this.apibase}/delete-product/${name}`).then(this.fetchCart);
    },
  },
  mounted() {
    this.fetchCart();
  },
};
</script>

<style scoped>
/* Enhanced Card Styles */
.card {
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
}

.card-body {
  padding: 20px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

/* Inputs */
input.form-control {
  border-radius: 8px;
  border: 1px solid #ced4da;
}

button.btn {
  border-radius: 8px;
  transition: background-color 0.3s ease;
  font-size: 1.1rem;
}

button.btn:hover {
  background-color: #f39c12;
}

/* Hover Effects on Table Rows */
.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

/* Table Styling */
.table th, .table td {
  vertical-align: middle;
  text-align: center;
  font-size: 1rem;
}

/* Icons Styling */
button i {
  margin-right: 5px;
}

/* Custom Colors */
.text-primary {
  color: #3498db !important;
}

.text-success {
  color: #2ecc71 !important;
}

.text-warning {
  color: #f39c12 !important;
}

.text-info {
  color: #17a2b8 !important;
}

.table-light {
  background-color: #f8f9fa;
}

input.form-control:focus {
  border-color: #3498db;
}

button.btn-warning {
  background-color: #f39c12;
  border-color: #f39c12;
}

button.btn-warning:hover {
  background-color: #e67e22;
}

button.btn-danger {
  background-color: #e74c3c;
  border-color: #e74c3c;
}

button.btn-danger:hover {
  background-color: #c0392b;
}
</style>
