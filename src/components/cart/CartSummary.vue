<!-- src/components/cart/CartSummary.vue -->
<template>
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
</template>

<script>
export default {
  props: ["cartTotal", "cartTax", "taxedTotal"],
};
</script>

<style scoped>
/* Add custom styles for the summary here */
</style>
