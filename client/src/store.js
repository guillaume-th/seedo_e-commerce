import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./CartSlice"; 
import adminReducer from "./AdminSlice"; 
import profilReducer from "./ProfilSlice";
import fidelReducer from "./FidelSlice"

export default configureStore({
  reducer: {
      cart : cartReducer,
      admin : adminReducer,
      profil : profilReducer,
      fidel : fidelReducer,
  },
})