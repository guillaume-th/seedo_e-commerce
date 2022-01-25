import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./CartSlice"; 
import adminReducer from "./AdminSlice"; 
import profilReducer from "./ProfilSlice";

export default configureStore({
  reducer: {
      cart : cartReducer, 
      admin : adminReducer,
      profil : profilReducer
  },
})