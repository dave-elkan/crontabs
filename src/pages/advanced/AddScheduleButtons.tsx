import React from 'react';
import Box from '@material-ui/core/Box';
import { Tab } from '../../types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

type PropsType = {
  tab: Tab;
};

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

const AddScheduleButtons = ({ tab }: PropsType) => {
  const classes = useStyles();

  return (
    <Box>
      <Button className={classes.button} variant="outlined">
        Add cron expression
      </Button>
      <Button className={classes.button} variant="outlined">
        Add text expression
      </Button>
    </Box>
  );
};

export default AddScheduleButtons;
