export enum OperationType {
  "Close",
  "Open in background",
  "Reload",
  "Show",
  "Show and reload"
}

export enum ScheduleType {
  "cron",
  "text"
}

export type Schedule = {
  id: string,
  tabId: string,
  type: ScheduleType,
  operation: OperationType,
  expression: string
}

export type Tab = {
  id: string,
  url: string,
  crons: Schedule[]
}