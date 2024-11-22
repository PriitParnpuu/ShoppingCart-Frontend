<template>
<h1 class="text-center">Cart Total</h1>
  <h3>Total:</h3><h3>${{ cartTotal.toFixed(2)}}</h3>
</template>

<script>
import axios from "axios";
export default {
  data:() => ({
    apibase: "http://localhost:8080/api/cart",
    cartTotal:0
  }),
  mounted(){
    axios
        .get(`${this.apibase}/cart-total`)
        .then((res) => (this.cartTotal = res.data))
        .catch(console.error)
  }
}

</script>







<style>

</style>


