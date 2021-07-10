import { StoredTab } from '../types';
import { isTimeManagementCompatibleTab } from './timeManagementTabCompatibilityHelper';

test('should find a tab with a show and close operation on the same days to be valid', () => {
  const tab: StoredTab = {
    url: 'http://www.example.org',
    crons: [
      {
        operation: 'show',
        type: 'cron',
        expression: '0 30 12 * * MON-FRI *',
      },
      {
        operation: 'close',
        type: 'cron',
        expression: '0 40 12 * * MON-FRI *',
      },
    ],
  };

  expect(isTimeManagementCompatibleTab(tab)).toBeTruthy();
});

test('should find a tab with a show and close operation on the different days to be invalid', () => {
  const tab: StoredTab = {
    url: 'http://www.example.org',
    crons: [
      {
        operation: 'show',
        type: 'cron',
        expression: '0 30 12 * * MON-TUE *',
      },
      {
        operation: 'close',
        type: 'cron',
        expression: '0 40 12 * * MON-THU *',
      },
    ],
  };

  expect(isTimeManagementCompatibleTab(tab)).toBeFalsy();
});

test('should find a tab with only a close operation to be invalid', () => {
  const tab: StoredTab = {
    url: 'http://www.example.org',
    crons: [
      {
        operation: 'close',
        type: 'cron',
        expression: '0 40 12 * * MON-THU *',
      },
    ],
  };

  expect(isTimeManagementCompatibleTab(tab)).toBeFalsy();
});

test('should find a tab with only a show operation to be valid', () => {
  const tab: StoredTab = {
    url: 'http://www.example.org',
    crons: [
      {
        operation: 'show',
        type: 'cron',
        expression: '0 40 12 * * MON-THU *',
      },
    ],
  };

  expect(isTimeManagementCompatibleTab(tab)).toBeTruthy();
});
