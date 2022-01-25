import { createSlice } from "@reduxjs/toolkit";

export const profilSlice = createSlice({
    name: "profil",
    initialState: { open : false },
    reducers: {
        setOpenProfil: (state, action) => {
            state.open = action.payload;
        }
    }
});

export const { setOpenProfil } = profilSlice.actions;
export default profilSlice.reducer; 