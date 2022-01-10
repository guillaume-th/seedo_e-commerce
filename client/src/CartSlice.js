import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: { value: [] },
    reducers: {
        updateCart: (state, action) => {
            state.value = action.payload;
        },
        increaseQuantity: (state, action) => {
            state.value.forEach((e) => {
                if (e.id === action.payload) {
                    e.selectedQuantity++;
                }
            });
        }, 
        decreaseQuantity: (state, action) => {
            state.value.forEach((e) => {
                if (e.id === action.payload) {
                    e.selectedQuantity--;
                }
            });
        }
    }
});

export const { updateCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer; 