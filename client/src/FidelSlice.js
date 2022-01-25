import { createSlice } from "@reduxjs/toolkit";

export const fidelSlice = createSlice({
    name: "fidel",
    initialState: { value: false },
    reducers: {
        updateFidel: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const { updateFidel } = fidelSlice.actions;
export default fidelSlice.reducer; 