import React from 'react';
import { useAppSelector } from '../../hooks/useLocalStorage';
import { selectTimeManagementTabs } from '../../store/tabsSlice';
import Page from '../Page';
import TimeManagementTabList from './TimeManagementTabList';
const description =
  'Increase your productivity by automating tabs to open and close throughout the week to streamline daily tasks.';

const TimeManagementPage = () => {
  const tabs = useAppSelector(selectTimeManagementTabs);
  return (
    <Page title="Time Management" description={description}>
      <TimeManagementTabList tabs={tabs} />
    </Page>
  );
};

export default TimeManagementPage;
