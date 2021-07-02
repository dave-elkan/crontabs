import { configureStore } from '@reduxjs/toolkit'
import tabsReducer from "./tabsSlice";
import schedulesReducer from "./scheduleSlice";
import initialState from './initialState';
import { restoreTabs } from "./localStorage"

const { tabs, schedules } = initialState(restoreTabs());

export default configureStore({
  reducer: {
    tabs: tabsReducer,
    schedules: schedulesReducer
  },
  preloadedState: {
    tabs,
    schedules
  }
})