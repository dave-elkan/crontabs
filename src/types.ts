export const OperationTypes = {
  "close": "Close",
  "open": "Open in background",
  "reload": "Reload",
  "show": "Show",
  "showAndReload": "Show and reload"
} as const;

export type ScheduleType = "cron" | "text"
export type OperationType = keyof typeof OperationTypes;
export type OperationTypeDisplayNames = typeof OperationTypes[OperationType]

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
  timeManagement: boolean,
}
