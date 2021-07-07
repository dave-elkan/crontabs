import initialState, { StoredState } from "./initialState";
import * as uuid from 'uuid';
jest.mock('uuid');

beforeEach(() => {
  jest.resetAllMocks();
})

test("extracting old-format tabs and cron", () => {
  const oldState: StoredState = [
    {
      url: "https://www.news.com.au",
      crons: [
        { type: "cron", operation: "open", expression: "0 0 0 * * SUN,FRI" },
      ],
    },
    {
      url: "https://www.smh.com.au",
      crons: [
        { type: "cron", expression: "0 0 0 * * SUN,THU", operation: "show" },
        { type: "cron", expression: "0 0 1 * * SUN,THU", operation: "close" },
      ],
    },
  ];

  const uuidSpy = jest.spyOn(uuid, 'v4')
    .mockReturnValueOnce("test-tab-id-1")
    .mockReturnValueOnce("test-tab-id-2")
    .mockReturnValueOnce("test-tab-1-schedule-id-1")
    .mockReturnValueOnce("test-tab-2-schedule-id-1")
    .mockReturnValueOnce("test-tab-2-schedule-id-2")
  
  expect(initialState(oldState)).toEqual({
    tabs: [
      {
        id: "test-tab-id-1",
        url: "https://www.news.com.au",
      }, 
      {
        id: "test-tab-id-2",
        url: "https://www.smh.com.au",
      }
    ],
    schedules: {
      "test-tab-1-schedule-id-1": { id: "test-tab-1-schedule-id-1", tabId: "test-tab-id-1", type: "cron", operation: "open", expression: "0 0 0 * * SUN,FRI" },
      "test-tab-2-schedule-id-1": { id: "test-tab-2-schedule-id-1", tabId: "test-tab-id-2", type: "cron", expression: "0 0 0 * * SUN,THU", operation: "show" },
      "test-tab-2-schedule-id-2": { id: "test-tab-2-schedule-id-2", tabId: "test-tab-id-2", type: "cron", expression: "0 0 1 * * SUN,THU", operation: "close" },
    }
  })

  expect(uuidSpy).toBeCalledTimes(5);
})

test("extracting new-format tabs and crons", () => {
  const newState: StoredState = [
    {
      id: "test-tab-id-1",
      url: "https://www.news.com.au",
      crons: [
        { id: "test-tab-1-schedule-id-1", type: "cron", operation: "open", expression: "0 0 0 * * SUN,FRI" },
      ],
    },
    {
      id: "test-tab-id-2",
      url: "https://www.smh.com.au",
      crons: [
        { id: "test-tab-2-schedule-id-1", type: "cron", expression: "0 0 0 * * SUN,THU", operation: "show" },
        { id: "test-tab-2-schedule-id-2", type: "cron", expression: "0 0 1 * * SUN,THU", operation: "close" },
      ],
    },
  ];

  const uuidSpy = jest.spyOn(uuid, 'v4');
  
  expect(initialState(newState)).toEqual({
    tabs: [
      {
        id: "test-tab-id-1",
        url: "https://www.news.com.au",
      }, 
      {
        id: "test-tab-id-2",
        url: "https://www.smh.com.au",
      }
    ],
    schedules: {
      "test-tab-1-schedule-id-1": { id: "test-tab-1-schedule-id-1", tabId: "test-tab-id-1", type: "cron", operation: "open", expression: "0 0 0 * * SUN,FRI" },
      "test-tab-2-schedule-id-1": { id: "test-tab-2-schedule-id-1", tabId: "test-tab-id-2", type: "cron", expression: "0 0 0 * * SUN,THU", operation: "show" },
      "test-tab-2-schedule-id-2": { id: "test-tab-2-schedule-id-2", tabId: "test-tab-id-2", type: "cron", expression: "0 0 1 * * SUN,THU", operation: "close" },
    }
  })

  expect(uuidSpy).toHaveBeenCalledTimes(0)

})