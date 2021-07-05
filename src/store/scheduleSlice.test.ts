import { OperationType, Schedule, Tab, ScheduleType } from '../types';
import reducer, { addSchedule, AddSchedulePayload, removeSchedule } from './scheduleSlice'
import * as uuid from 'uuid';
jest.mock('uuid');

test('should return the initial state', () => {
  expect(reducer(undefined, { type: "" })).toEqual([]);
})

test('should handle a cron schedule being added to an empty list', () => {
  const anonymousId = 'testid';
  const uuidSpy = jest.spyOn(uuid, 'v4').mockReturnValue(anonymousId);
  const previousState: Schedule[] = [];
  const schedule: AddSchedulePayload = {
    type: 'cron',
    tabId: "tab-1-id"
  }

  expect(reducer(previousState, addSchedule(schedule))).toEqual([{
    expression: "",
    operation: "open",
    type: 'cron',
    tabId: "tab-1-id",
    id: 'testid'
  }]);

  expect(uuidSpy).toBeCalledTimes(1);
});

test('should handle a text schedule being added to an empty list', () => {
  const anonymousId = 'testid';
  const uuidSpy = jest.spyOn(uuid, 'v4').mockReturnValue(anonymousId);
  const previousState: Schedule[] = [];
  const schedule: AddSchedulePayload = {
    type: 'text',
    tabId: "tab-1-id"
  }

  expect(reducer(previousState, addSchedule(schedule))).toEqual([{
    expression: "",
    operation: "open",
    type: 'text',
    tabId: "tab-1-id",
    id: 'testid'
  }]);

  expect(uuidSpy).toBeCalledTimes(1);
});

test("removing a schedule from a tab", () => {
  const previousState = [{
    id: "id-1",
  }, {
    id: "id-2",
  }];

  expect(reducer(previousState as Schedule[], removeSchedule("id-2"))).toEqual([
    {
      id: "id-1",
    } 
  ])
});