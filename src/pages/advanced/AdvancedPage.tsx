import React from 'react';
import AdvancedTabList from './AdvancedTabList';
import { useAppSelector } from '../../hooks/useLocalStorage';
import { selectAdvancedTabs } from '../../store/tabsSlice';
import Page from '../Page';

const description =
  'Create and edit cron- or text expression-based tab schedules at the lowest possible level to satisfy your inner geek. All cron expressions require a value for seconds.';

const AdvancedPage = () => {
  const tabs = useAppSelector(selectAdvancedTabs);
  return (
    <Page title="Advanced" description={description}>
      <AdvancedTabList tabs={tabs} />
    </Page>
  );
};

export default AdvancedPage;
