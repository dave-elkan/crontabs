import React from 'react';
import { Tab } from '../../types';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { removeTab } from '../../store/tabsSlice';

type PropsType = {
  tab: Tab;
};

const RemoveTabButton = ({ tab }: PropsType) => {
  const dispatch = useDispatch();
  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={() => dispatch(removeTab(tab.id))}
    >
      Remove tab
    </Button>
  );
};

export default RemoveTabButton;
