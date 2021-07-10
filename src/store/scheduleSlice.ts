import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as uuid from "uuid";
import { RootState } from '.';
import { Schedule, ScheduleType } from '../types';

export type AddSchedulePayload = {
  tabId: string,
  type: ScheduleType
};

export type SchedulesStateType = { 
  [index: string]: Schedule
};

export type UpdateSchedulePayloadType = {
  scheduleId: string,
  schedule: Partial<Schedule>
}

const initialState: SchedulesStateType = {};

export const scheduleSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    addSchedule: (state, action: PayloadAction<AddSchedulePayload>) => {
      const id = uuid.v4();
      return {
        ...state,
        [id]: {
          id,
          type: action.payload.type,
          operation: "open",
          tabId: action.payload.tabId,
          expression: "",
        }
      }
    },
    removeSchedule: (state, action: PayloadAction<string>) => {
      const {[action.payload]: omittedKey, ...remainder} = state;
      return {
        ...remainder
      };
    },
    updateSchedule: (state, action: PayloadAction<UpdateSchedulePayloadType>) => ({
      ...state,
      [action.payload.scheduleId]: {
        ...state[action.payload.scheduleId],
        ...action.payload.schedule
      }
    })
  }
})

export const { addSchedule, removeSchedule, updateSchedule } = scheduleSlice.actions;
export const selectSchedulesByTabId = (tabId: string) => (state: RootState) => Object.values(state.schedules).filter(schedule => schedule.tabId === tabId);

export default scheduleSlice.reducer;
