import { Tab } from '../types';
import reducer, { addTab, removeTab } from './tabsSlice'
import * as uuid from 'uuid';
jest.mock('uuid');

test('should return the initial state', () => {
  expect(reducer(undefined, { type: "" })).toEqual([]);
})

test('should handle a tab being added to an empty list', () => {
  const anonymousId = 'testid';
  const uuidSpy = jest.spyOn(uuid, 'v4').mockReturnValue(anonymousId);
  const previousState: Tab[] = [];
  const tab = {
    url: "https://www.crontabs.org",
  }

  expect(reducer(previousState, addTab(tab))).toEqual([{
    url: "https://www.crontabs.org",
    id: 'testid'
  }]);

  expect(uuidSpy).toBeCalledTimes(1);
});

test("removing a tab", () => {
  const previousState: Tab[] = [{
    id: "id-1",
    url: "https://www.crontabs.org"
  }, {
    id: "id-2",
    url: "https://www.crontabs.org"
  }];

  expect(reducer(previousState, removeTab("id-2"))).toEqual([
    {
      id: "id-1",
      url: "https://www.crontabs.org"
    } 
  ])
});