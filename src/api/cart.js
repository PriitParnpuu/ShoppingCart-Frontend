// src/api/cart.js
import axios from 'axios';

const apibase = "http://localhost:9001/api/cart";

export const fetchCart = async () => {
    try {
        const cartData = await axios.all([
            axios.get(`${apibase}/cart-items`),
            axios.get(`${apibase}/cart-total`),
            axios.get(`${apibase}/cart-tax`),
            axios.get(`${apibase}/cart-taxedtotal`),
        ]);
        return {
            cartItems: cartData[0].data,
            cartTotal: cartData[1].data,
            cartTax: cartData[2].data,
            taxedTotal: cartData[3].data,
        };
    } catch (err) {
        console.error("Error fetching cart data:", err);
    }
};

export const addProduct = async (newProduct) => {
    try {
        await axios.post(`${apibase}/add-product`, newProduct);
    } catch (err) {
        console.error("Error adding product:", err);
    }
};

export const removeProduct = async (name) => {
    try {
        await axios.delete(`${apibase}/delete-product/${name}`);
    } catch (err) {
        console.error("Error removing product:", err);
    }
};
