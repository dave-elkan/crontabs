import React from 'react';
import Box from '@material-ui/core/Box';
import { Tab } from '../../types';
import AdvancedTabForm from './AdvancedTabForm';
import { TabsStateType } from '../../store/tabsSlice';
import AddInitialTabButton from '../../components/form/AddInitialTabButton';

type PropsType = {
  tabs: TabsStateType;
};

const TabList = ({ tabs }: PropsType) => {
  const tabsArray = Object.values(tabs);
  if (!tabsArray.length) {
    return <AddInitialTabButton />;
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
