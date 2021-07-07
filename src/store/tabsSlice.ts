import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as uuid from "uuid";
import { Tab } from '../types';
import type { RootState } from '../store/index'

export type TabSansId = Omit<Tab, "id">;

export type TabsStateType = { 
  [index: string]: Tab
};

const initialState: TabsStateType = {};

export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    addTab: (state, action: PayloadAction<TabSansId>) => {
      const { payload: tab } = action;
      const id = uuid.v4();
      return {
        ...state,
        [id]: {
          id,
          ...tab
        }
      }
    },
    removeTab: (state, action: PayloadAction<string>) => {
      const {[action.payload]: omittedKey, ...remainder} = state;
      return {
        ...remainder
      };
    }
  }
})

export const { addTab, removeTab } = tabsSlice.actions;
export const selectTabs = (state: RootState) => state.tabs;

export default tabsSlice.reducer;
