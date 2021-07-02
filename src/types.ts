export type OperationType = "Close" | "Open in background" | "Reload" | "Show" | "Show and reload";
export type StoredTab = {
  id?: string,
  url: string,
  crons: Partial<Schedule>[]
}

export type StoredState = StoredTab[]

export type ScheduleType = "cron" | "text";

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