<template>
<h1 class="text-center">Shopping Cart</h1>
  <h2>Add Product</h2>
  <form @submit.prevent="addProduct" class="row mb-3">
    <input v-model="newProduct.name" placeholder="Product" class="form-control col" required />
    <input v-model.number="newProduct.price" type="number" placeholder="Price" class="form-control col" required />
    <input v-model.number="newProduct.quantity" type="number" placeholder="Qty" class="form-control col" required />
    <button class="btn btn-primary col">Add</button>
  </form>

  <h2>Cart Items</h2>
  <table class="table">
    <thead>
    <tr>
      <th>Product</th>
      <th>Price</th>
      <th>Quantity</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="item in cartItems" :key="item">
      <td>{{ item.name }}</td>
      <td>${{ item.price }}</td>
      <td>{{ item.quantity }}</td>
      <td><button @click="removeProduct(item.name)" class="btn btn-danger btn-sm">Remove</button></td>
    </tr>
    </tbody>

  </table>

  <h3>Total:</h3><h3>${{ cartTotal.toFixed(2)}}</h3>
</template>

<script>
import axios from "axios";
export default {
  data:() => ({
    apibase: "http://localhost:8080/api/cart",
    newProduct: {name: "", price: 0, quantity: 1},
    cartItems:[],
    cartTotal:0
  }),
  methods:{
    fetchCart(){
      axios.all([
        axios.get(`${this.apibase}/cart-items`).then(res => (this.cartItems = res.data)),
        axios.get(`${this.apibase}/cart-total`).then(res => (this.cartTotal = res.data)),
      ]);
    },
    addProduct() {
      axios.post(`${this.apibase}/add-product`, this.newProduct).then(this.fetchCart);
      this.newProduct = {name: "", price: 0, quantity: 1};
    },
    removeProduct(name){
      axios.delete(`${this.apibase}/delete-product/${name}`).then(this.fetchCart);
    },
  },
  mounted(){
    this.fetchCart();

  }
}

</script>

<style>

</style>


