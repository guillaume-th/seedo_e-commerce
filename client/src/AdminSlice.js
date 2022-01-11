import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name: "admin",
    initialState: { value: false },
    reducers: {
        updateAdmin: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const { updateAdmin } = adminSlice.actions;
export default adminSlice.reducer; 