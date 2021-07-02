import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as uuid from "uuid";
import { Schedule } from '../types';

type AddSchedulePayload = Omit<Schedule, "id">;

const initialState: Schedule[] = [];

export const scheduleSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    addSchedule: (state, action: PayloadAction<AddSchedulePayload>) => state.concat({
      ...action.payload,
      id: uuid.v4()
    }),
    removeSchedule: (state, action: PayloadAction<string>) => state.filter(schedule => schedule.id !== action.payload),
  }
})

export const { addSchedule, removeSchedule } = scheduleSlice.actions;

export default scheduleSlice.reducer;
