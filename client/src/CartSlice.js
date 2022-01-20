import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: { value: [], open: false },
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
                if (e.id === action.payload && e.selectedQuantity > 0) {
                    e.selectedQuantity--;
                }
            });
        },
        setOpenCart: (state, action) => {
            state.open = action.payload; 
        }
    }
});

export const { updateCart, increaseQuantity, decreaseQuantity, setOpenCart } = cartSlice.actions;
export default cartSlice.reducer; 