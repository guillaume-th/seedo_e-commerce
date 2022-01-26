import { createSlice } from "@reduxjs/toolkit";

export const fidelSlice = createSlice({
    name: "fidel",
    initialState: { value: null },
    reducers: {
        updateFidel: (state, action) => {
            //console.log("state");
            //console.log(state);
            state.value = action.payload;
        },
    }
});

export const { updateFidel } = fidelSlice.actions;
export default fidelSlice.reducer; 