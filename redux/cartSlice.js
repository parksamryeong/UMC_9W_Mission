import { createSlice } from '@reduxjs/toolkit';
import initialCartItems from '../constants/cartItems';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: initialCartItems,
        totalCost: initialCartItems.reduce((total, item) => total + item.price * item.amount, 0),
    },
    reducers: {
        addItem: (state, action) => {
            const { id, price, amount } = action.payload;
            const existingItem = state.cartItems.find(item => item.id === id);

            if (existingItem) {
                existingItem.amount += amount;
            } else {
                state.cartItems.push({ id, price, amount });
            }

            state.totalCost = state.cartItems.reduce((total, item) => total + item.price * item.amount, 0);
        },
        removeItem: (state, action) => {
            const { id } = action.payload;
            const itemIndex = state.cartItems.findIndex(item => item.id === id);

            if (itemIndex !== -1) {
                state.cartItems.splice(itemIndex, 1);
                state.totalCost = state.cartItems.reduce((total, item) => total + item.price * item.amount, 0);
            }
        },
        increaseQuantity: (state, action) => {
            const { id } = action.payload;
            const item = state.cartItems.find(item => item.id === id);

            if (item) {
                item.amount += 1;
                state.totalCost = state.cartItems.reduce((total, item) => total + item.price * item.amount, 0);
            }
        },
        decreaseQuantity: (state, action) => {
            const { id } = action.payload;
            const item = state.cartItems.find(item => item.id === id);

            if (item) {
                item.amount -= 1;
                if (item.amount === 0) {
                    state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== id);
                }
                state.totalCost = state.cartItems.reduce((total, item) => total + item.price * item.amount, 0);
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
            state.totalCost = 0;
        },
    },
});

export const { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;

// Extra reducer case for updating total cost
export const updateTotalCost = () => ({
    type: 'cart/UPDATE_TOTAL_COST',
});

export const selectCartItems = state => state.cart.cartItems;
export const selectTotalCost = state => state.cart.totalCost;
export const selectTotalQuantity = state => state.cart.cartItems.reduce((total, item) => total + item.amount, 0);

export default cartSlice.reducer;
