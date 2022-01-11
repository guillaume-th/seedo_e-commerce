import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./CartSlice"; 
import adminReducer from "./AdminSlice"; 

export default configureStore({
  reducer: {
      cart : cartReducer, 
      admin : adminReducer
  },
})