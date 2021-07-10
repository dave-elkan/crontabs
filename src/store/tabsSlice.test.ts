import { Tab } from '../types';
import reducer, { addTab, removeTab, TabsStateType } from './tabsSlice'
import * as uuid from 'uuid';
jest.mock('uuid');

test('should return the initial state', () => {
  expect(reducer(undefined, { type: "" })).toEqual({});
})

test('should handle a tab being added to an empty list', () => {
  const anonymousId = 'testid';
  const uuidSpy = jest.spyOn(uuid, 'v4').mockReturnValue(anonymousId);
  const previousState: TabsStateType = {};
  const tab = {
    url: "https://www.crontabs.org",
    timeManagement: false,
  }

  expect(reducer(previousState, addTab(tab))).toEqual({
    "testid": {
      url: "https://www.crontabs.org",
      id: 'testid'
    }
  });

  expect(uuidSpy).toBeCalledTimes(1);
});

test("removing a tab", () => {
  const previousState: TabsStateType = {
    "id-1": {
      id: "id-1",
      url: "https://www.crontabs.org",
      timeManagement: false,
    }, 
    "id-2": {
      id: "id-2",
      url: "https://www.crontabs.org",
      timeManagement: false,
    }
  };

  expect(reducer(previousState, removeTab("id-2"))).toEqual({
    "id-1": {
      id: "id-1",
      url: "https://www.crontabs.org"
    } 
  })
});