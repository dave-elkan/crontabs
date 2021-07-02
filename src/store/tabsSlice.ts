import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as uuid from "uuid";
import { Tab } from '../types';

type AddTabPayload = Omit<Tab, "id">;

const initialState: Tab[] = [];

export const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    addTab: (state, action: PayloadAction<AddTabPayload>) => {
      const { payload: tab } = action;
      const id = uuid.v4();
      return state.concat({
        ...tab,
        id,
      })
    },
    removeTab: (state, action: PayloadAction<string>) => state.filter(tab => tab.id !== action.payload),
  }
})

export const { addTab, removeTab } = tabsSlice.actions;

export default tabsSlice.reducer;
