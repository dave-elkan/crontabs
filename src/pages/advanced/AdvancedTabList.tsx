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
  if (!tabsArray.length) {
    return (
      <h2 style={{ textAlign: 'center' }}>
        Click the Add new tab button below to get started.
      </h2>
    );
  }

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
