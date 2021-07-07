import { OperationType, Schedule, Tab, ScheduleType } from '../types';
import reducer, { addSchedule, AddSchedulePayload, removeSchedule, SchedulesStateType, updateSchedule } from './scheduleSlice'
import * as uuid from 'uuid';
jest.mock('uuid');

test('should return the initial state', () => {
  expect(reducer(undefined, { type: "" })).toEqual({});
})

test('should handle a cron schedule being added to an empty list', () => {
  const anonymousId = 'testid';
  const uuidSpy = jest.spyOn(uuid, 'v4').mockReturnValue(anonymousId);
  const previousState: SchedulesStateType = {};
  const schedule: AddSchedulePayload = {
    type: 'cron',
    tabId: "tab-1-id"
  }

  expect(reducer(previousState, addSchedule(schedule))).toEqual({
    "testid": {
      expression: "",
      operation: "open",
      type: 'cron',
      tabId: "tab-1-id",
      id: "testid"
    }
  });

  expect(uuidSpy).toBeCalledTimes(1);
});

test('should handle a text schedule being added to an empty list', () => {
  const anonymousId = 'testid';
  const uuidSpy = jest.spyOn(uuid, 'v4').mockReturnValue(anonymousId);
  const previousState: SchedulesStateType = {};
  const schedule: AddSchedulePayload = {
    type: 'text',
    tabId: "tab-1-id"
  }

  expect(reducer(previousState, addSchedule(schedule))).toEqual({
    "testid": {
      expression: "",
      operation: "open",
      type: 'text',
      tabId: "tab-1-id",
      id: "testid"
    }
  });

  expect(uuidSpy).toBeCalledTimes(1);
});

test("removing a schedule from a tab", () => {
  const previousState = {
    "id-1": {expression: "schedule 1 expression" } as Schedule,
    "id-2": {expression: "schedule 2 expression" } as Schedule
  };

  expect(reducer(previousState as SchedulesStateType, removeSchedule("id-2"))).toEqual({
    "id-1": {expression: "schedule 1 expression" } as Schedule,
  })
});

test("Updating a schedule", () => {
  const previousState = {
    "id-1": {
      id: "id-1",
      expression: "Expression 1",
      operation: "open",
      tabId: "Tab-id",
      type: "cron"
    },
    "id-2": {
      id: "id-2",
      expression: "Expression 2",
      operation: "show",
      tabId: "Tab-id",
      type: "text"
    }
  };

  const scheduleToUpdate: Partial<Schedule> = {
    id: "id-1",
    expression: "Updated Expression",
  }

  expect(reducer(previousState as SchedulesStateType, updateSchedule({ scheduleId: "id-1", schedule: scheduleToUpdate }))).toEqual({
    "id-1": {
      id: "id-1",
      expression: "Updated Expression",
      operation: "open",
      tabId: "Tab-id",
      type: "cron"
    },
    "id-2": {
      id: "id-2",
      expression: "Expression 2",
      operation: "show",
      tabId: "Tab-id",
      type: "text"
    }
  })
})