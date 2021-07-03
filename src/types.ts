export const OperationTypes = ["close", "open", "reload", "show", "showAndReload"] as const;

export type ScheduleType = "cron" | "text"
export type OperationType = typeof OperationTypes[number];

export type Schedule = {
  id: string,
  tabId: string,
  type: ScheduleType,
  operation: OperationType,
  expression: string
}

export type Tab = {
  id: string,
  url: string
}
