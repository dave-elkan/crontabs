import React from 'react';
import Box from '@material-ui/core/Box';
import { ScheduleType, Tab } from '../../types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { addSchedule } from '../../store/scheduleSlice';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();
  function addNewSchedule(type: ScheduleType) {
    return () =>
      dispatch(
        addSchedule({
          tabId: tab.id,
          type,
        }),
      );
  }

  return (
    <Box>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={addNewSchedule('cron')}
      >
        Add cron expression
      </Button>
      <Button
        className={classes.button}
        variant="outlined"
        onClick={addNewSchedule('text')}
      >
        Add text expression
      </Button>
    </Box>
  );
};

export default AddScheduleButtons;
