import Box from '@material-ui/core/Box';
import React from 'react';
import { Tab } from '../../types';
import AdvancedTabForm from './AdvancedTabForm';

type PropsType = {
  tabs: Tab[];
};

const TabList = ({ tabs }: PropsType) => (
  <>
    {tabs.map((tab) => (
      <Box key={`tab-${tab.id}`}>
        <AdvancedTabForm tab={tab} />
      </Box>
    ))}
  </>
);

export default TabList;
