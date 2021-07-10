import isEqual from "lodash/isEqual"
import { StoredSchedule, StoredTab } from "../types";
import { getLaterScheduleForExpression } from "./laterHelper";
 
export function scheduleIsOpenOperation(schedule: StoredSchedule) {
  return schedule.operation === "show" ||
         schedule.operation === "showAndReload" ||
         schedule.operation === "open";
}

function cronIsCloseOperation(schedule: StoredSchedule) {
  return schedule.operation === "close";
}

function openAndCloseOperationsDefineSingleHoursMinutesAndSeconds(storedTab: StoredTab): boolean {
  var openOperation = storedTab.crons?.find(scheduleIsOpenOperation);
  var closeOperation = storedTab.crons?.find(cronIsCloseOperation);

  if (!openOperation || !closeOperation) {
    return false;
  }

  return tabOperationDefinesSingleHoursMinutesAndSeconds(openOperation) &&
      tabOperationDefinesSingleHoursMinutesAndSeconds(closeOperation);
}

function openOperationDefineSingleHoursMinutesAndSeconds(schedules: StoredSchedule[]): boolean {
  var openSchedule = schedules.find(scheduleIsOpenOperation);

  if (!openSchedule) {
    return false;
  }

  return tabOperationDefinesSingleHoursMinutesAndSeconds(openSchedule);
}

function tabOperationDefinesSingleHoursMinutesAndSeconds(schedule: StoredSchedule): boolean {

  var laterSchedule = getLaterScheduleForExpression(schedule);

  return laterSchedule.schedules.length === 1 &&
    laterSchedule?.schedules[0]?.h.length === 1 &&
    laterSchedule?.schedules[0]?.m.length === 1 &&
    laterSchedule?.schedules[0]?.s.length === 1;
}

function tabOperationsAreOnSameDays(storedTab: StoredTab) {
  var open = storedTab.crons?.find(scheduleIsOpenOperation);
  var close = storedTab.crons?.find(cronIsCloseOperation);

  if (!open || !close) {
    return false;
  }

  var openDays = getLaterScheduleForExpression(open);
  var closeDays = getLaterScheduleForExpression(close);

  return openDays.schedules.length && closeDays.schedules.length && isEqual(openDays.schedules[0].d, closeDays.schedules[0].d);
}

function tabHasOpenAndCloseOperations(storedTab: StoredTab) {
  var hasOpen = false;
  var hasClose = false;

  storedTab.crons?.forEach(function(schedule) {
      if (scheduleIsOpenOperation(schedule)) {
          hasOpen = true;
      }

      if (cronIsCloseOperation(schedule)) {
          hasClose = true;
      }
  });

  return hasOpen && hasClose;
}

function isOpenAndCloseTab(storedTab: StoredTab) {
  return storedTab.crons?.length === 2 &&
      tabHasOpenAndCloseOperations(storedTab) &&
      tabOperationsAreOnSameDays(storedTab) &&
      openAndCloseOperationsDefineSingleHoursMinutesAndSeconds(storedTab)
}

function isOpenOnlyTab(storedTab: StoredTab) {
  return storedTab.crons?.length === 1 &&
      scheduleIsOpenOperation(storedTab.crons[0]) &&
      openOperationDefineSingleHoursMinutesAndSeconds(storedTab.crons);
}

export function isTimeManagementCompatibleTab(storedTab: StoredTab) {
  return isOpenAndCloseTab(storedTab) || isOpenOnlyTab(storedTab);
}

