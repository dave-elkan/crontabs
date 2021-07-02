import { configureStore } from '@reduxjs/toolkit'
import tabsReducer from "./tabsSlice";
import schedulesReducer from "./scheduleSlice";
import initialState from './initialState';
import { restoreTabs } from "./localStorage"

const { tabs, schedules } = initialState(restoreTabs());

const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    schedules: schedulesReducer
  },
  preloadedState: {
    tabs,
    schedules
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store;