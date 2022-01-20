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
                    sessionStorage.setItem("cart", JSON.stringify(state.value));
                }
            });
        },
        decreaseQuantity: (state, action) => {
            state.value.forEach((e, i) => {
                if (e.id === action.payload && e.selectedQuantity > 0) {
                    e.selectedQuantity--;
                    if(e.selectedQuantity === 0){
                        state.value.splice(i, 1);
                    }
                    sessionStorage.setItem("cart", JSON.stringify(state.value));
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