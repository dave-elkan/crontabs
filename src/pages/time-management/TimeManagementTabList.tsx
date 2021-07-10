import React from 'react';
import Box from '@material-ui/core/Box';
import { Tab } from '../../types';
import TimeManagementTabForm from './TimeManagementTabForm';

type PropsType = {
  tabs: Tab[];
};

const TimeManagementTabList = ({ tabs }: PropsType) => {
  if (!tabs.length) {
    return (
      <h2 style={{ textAlign: 'center' }}>
        Click the Add new tab button below to get started.
      </h2>
    );
  }

  return (
    <>
      {tabs.map((tab) => (
        <Box key={`time-management-tab-${tab.id}`}>
          <TimeManagementTabForm tab={tab} />
        </Box>
      ))}
    </>
  );
};

export default TimeManagementTabList;
