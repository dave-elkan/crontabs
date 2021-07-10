import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as uuid from "uuid";
import { RootState } from '.';
import { getLaterScheduleForExpression } from '../helpers/laterHelper';
import { scheduleIsOpenOperation } from '../helpers/timeManagementTabCompatibilityHelper';
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

function scheduleTime(schedule: Schedule): string {
  var laterSchedule = getLaterScheduleForExpression(schedule);
  var hour = laterSchedule?.schedules[0].h;
  var minute = laterSchedule?.schedules[0].m;

  if (minute < 10) {
    minute = '0' + minute;
  }

  if (hour < 10) {
    hour = '0' + hour;
  }

  return [hour, minute].join(':');
}

function scheduleDays(schedule: Schedule): number[] {
  let result: number[] = [];
  if (!schedule) {
    return result;
  }

  const laterSchedule = getLaterScheduleForExpression(schedule);

  return laterSchedule?.schedules[0]?.d as number[];
}

interface AdvancedSchedule {
  isOpen: boolean;
  time: string;
  days: number[]
}

export const { addSchedule, removeSchedule, updateSchedule } = scheduleSlice.actions;
export const selectSchedulesByTabId = (tabId: string) => (state: RootState): Schedule[] => Object.values(state.schedules).filter(schedule => schedule.tabId === tabId);
export const selectAdvancedSchedulesByTabId = (tabId: string) => (state: RootState): AdvancedSchedule[] => selectSchedulesByTabId(tabId)(state).map((schedule) => ({
  isOpen: scheduleIsOpenOperation(schedule),
  time: scheduleTime(schedule),
  days: scheduleDays(schedule)
}))

export default scheduleSlice.reducer;
