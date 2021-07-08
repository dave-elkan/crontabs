import * as uuid from "uuid"
import { OperationType, Schedule, ScheduleType, Tab } from "../types";
import { SchedulesStateType } from "./scheduleSlice";
import { TabsStateType } from "./tabsSlice";

export type StoredState = StoredTab[];

type StoredTab = {
  id?: string,
  url: string,
  crons?: StoredSchedule[],
  schedules?: StoredSchedule[],
  timeManagement?: boolean,
}

type StoredSchedule = {
  id?: string,
  tabId?: string,
  type: ScheduleType,
  operation: OperationType,
  expression: string,
}

type TabWithSchedules = Tab & {
  schedules: StoredSchedule[]
}

function storeTabIsTimeManagement(storedTab: StoredTab) {
  return storedTab.timeManagement === true || (
    // Old format support based on there being one show and one close schedule only for a tab.
    storedTab.timeManagement === undefined &&
    storedTab.crons?.length === 2 &&
    storedTab.crons?.filter(schedule => schedule.type === "cron" && scheduleIsOpenOperation(schedule)).length === 1 &&
    storedTab.crons?.filter(schedule => schedule.type === "cron" && schedule.operation === "close").length === 1
  );
}

function scheduleIsOpenOperation(schedule: StoredSchedule) {
  return schedule.operation === "show" ||
         schedule.operation === "showAndReload" ||
         schedule.operation === "open";
}

export default function initialState(storedState: StoredState) {
  // Add tab IDs if there isn't one (old style format).
  const storedTabs: TabWithSchedules[] = storedState.map(tab => ({
    id: tab.id || uuid.v4(),
    schedules: tab.crons || tab.schedules || [],
    url: tab.url,
    timeManagement: storeTabIsTimeManagement(tab)
  }));

  const tabsArray: Tab[] = storedTabs.map(tab => ({
    url: tab.url,
    id: tab.id,
    timeManagement: tab.timeManagement
  }));

  const tabs: TabsStateType = {};
  for (const tab of tabsArray) {
    tabs[tab.id] = tab;
  }
  
  const scheduleArray: Schedule[] = storedTabs.flatMap(tab => tab.schedules.map(schedule => ({
    ...schedule,
    tabId: tab.id,
    id: schedule.id || uuid.v4()
  })));

  const schedules: SchedulesStateType = {};

  for (const schedule of scheduleArray) {
    schedules[schedule.id] = schedule;
  }

  return {
    tabs,
    schedules
  }
}