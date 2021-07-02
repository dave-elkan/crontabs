export type ScheduleType = "cron" | "text"
export type OperationType = "close" | "open" | "reload" | "show" | "showAndReload"

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
