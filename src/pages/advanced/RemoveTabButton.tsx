import React from 'react';
import { Tab } from '../../types';
import Button from '@material-ui/core/Button';

type PropsType = {
  tab: Tab;
};

const RemoveTabButton = ({ tab }: PropsType) => {
  return (
    <Button variant="outlined" color="secondary">
      Remove tab
    </Button>
  );
};

export default RemoveTabButton;
