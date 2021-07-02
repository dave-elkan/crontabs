import { configureStore } from '@reduxjs/toolkit'
import tabsReducer from "./tabsSlice";
import cronsReducer from "./scheduleSlice";

export default configureStore({
  reducer: {
    tabs: tabsReducer,
    crons: cronsReducer
  },
})