import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { addTab, TabSansId } from '../../store/tabsSlice';
import { useDispatch } from 'react-redux';

const initialTab: TabSansId = {
  url: '',
};

const AddInitialTabButton = () => {
  const dispatch = useDispatch();
  return (
    <Grid container justify="center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(addTab(initialTab))}
      >
        Add Tab
      </Button>
    </Grid>
  );
};

export default AddInitialTabButton;
