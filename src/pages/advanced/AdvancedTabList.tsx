import React from 'react';
import Box from '@material-ui/core/Box';
import { Tab } from '../../types';
import AdvancedTabForm from './AdvancedTabForm';
import { TabsStateType } from '../../store/tabsSlice';

type PropsType = {
  tabs: TabsStateType;
};

const TabList = ({ tabs }: PropsType) => {
  const tabsArray = Object.values(tabs);

  return (
    <>
      {tabsArray.map((tab) => (
        <Box key={`tab-${tab.id}`}>
          <AdvancedTabForm tab={tab} />
        </Box>
      ))}
    </>
  );
};

export default TabList;
