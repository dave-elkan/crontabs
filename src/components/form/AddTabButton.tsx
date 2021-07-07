import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { addTab, TabSansId } from '../../store/tabsSlice';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const initialTab: TabSansId = {
  url: '',
};

const useStyles = makeStyles((theme) => ({
  addTabButton: {
    margin: theme.spacing(4),
  },
}));

const AddTabButton = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Grid className={classes.addTabButton} container justify="center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(addTab(initialTab))}
      >
        Add new tab
      </Button>
    </Grid>
  );
};

export default AddTabButton;
