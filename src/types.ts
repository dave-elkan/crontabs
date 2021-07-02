export enum ActionType {
  "Close",
  "Open in background",
  "Reload",
  "Show",
  "Show and reload"
}

export type Cron = {
  expression: string
}

export type Tab = {
  id: string,
  url: string,
  crons: Cron[]
}