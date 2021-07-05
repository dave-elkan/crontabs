import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as uuid from "uuid";
import { RootState } from '.';
import { Schedule, ScheduleType } from '../types';

export type AddSchedulePayload = {
  tabId: string,
  type: ScheduleType
};

const initialState: Schedule[] = [];

export const scheduleSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    addSchedule: (state, action: PayloadAction<AddSchedulePayload>) => state.concat({
      type: action.payload.type,
      operation: "open",
      tabId: action.payload.tabId,
      expression: "",
      id: uuid.v4()
    }),
    removeSchedule: (state, action: PayloadAction<string>) => state.filter(schedule => schedule.id !== action.payload),
  }
})

export const { addSchedule, removeSchedule } = scheduleSlice.actions;
export const selectSchedulesByTabId = (tabId: string) => (state: RootState) => state.schedules.filter(schedule => schedule.tabId === tabId);

export default scheduleSlice.reducer;
