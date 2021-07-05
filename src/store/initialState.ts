import * as uuid from "uuid"
import { OperationType, Schedule, ScheduleType, Tab } from "../types";

export type StoredState = StoredTab[];

type StoredTab = {
  id?: string,
  url: string;
  crons?: StoredSchedule[]
  schedules?: StoredSchedule[]
}

type StoredSchedule = {
  id?: string,
  tabId?: string,
  type: ScheduleType,
  operation: OperationType,
  expression: string
}

type TabWithSchedules = Tab & {
  schedules: StoredSchedule[]
}

export default function initialState(storedState: StoredState) {
  // Add tab IDs if there isn't one (old style format).
  const storedTabs: TabWithSchedules[] = storedState.map(tab => ({
    id: tab.id || uuid.v4(),
    schedules: tab.crons || tab.schedules || [],
    url: tab.url,
  }));

  const tabs: Tab[] = storedTabs.map(tab => ({
    url: tab.url,
    id: tab.id
  }));
  
  const schedules: Schedule[] = storedTabs.flatMap(tab => tab.schedules.map(schedule => ({
    ...schedule,
    tabId: tab.id,
    id: schedule.id || uuid.v4()
  })));

  return {
    tabs,
    schedules
  }
}