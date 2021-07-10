import later from "@breejs/later"
import { Schedule, StoredSchedule } from "../types";

export function getLaterScheduleForExpression(schedule: Schedule | StoredSchedule) {
  if (schedule.type === "cron") {
      return later.parse.cron(schedule.expression, true);
  } else {
      return later.parse.text(schedule.expression, true);
  }
}