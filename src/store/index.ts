import { configureStore } from '@reduxjs/toolkit'
import tabsReducer from "./tabsSlice";

export default configureStore({
  reducer: {
    tabs: tabsReducer,
  },
})