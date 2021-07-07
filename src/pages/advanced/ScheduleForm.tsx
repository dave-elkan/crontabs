import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import React from 'react';
import CrontabsFormControl from '../../components/form/CrontabsFormControl';
import { Schedule } from '../../types';
import RemoveScheduleButton from './RemoveScheduleButton';
import ScheduleOperationSelect from './ScheduleOperationSelect';
import { useDispatch } from 'react-redux';
import { updateSchedule } from '../../store/scheduleSlice';

type PropsType = {
  schedule: Schedule;
};

const useStyles = makeStyles((theme: Theme) => ({
  removeButton: {
    display: 'flex',
    justifyContent: 'center',
  },
  schedule: {
    paddingRight: theme.spacing(1),
  },
}));

const ScheduleForm = ({ schedule }: PropsType) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  function updateScheduleExpression(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) {
    dispatch(
      updateSchedule({
        scheduleId: schedule.id,
        schedule: {
          expression: event.target?.value?.trim(),
        },
      }),
    );
  }

  return (
    <Grid container>
      <Grid item xs={8} className={classes.schedule}>
        <CrontabsFormControl>
          <TextField
            fullWidth
            required
            label="Schedule"
            onChange={updateScheduleExpression}
            value={schedule.expression}
          />
        </CrontabsFormControl>
      </Grid>
      <Grid item xs={3}>
        <ScheduleOperationSelect schedule={schedule} />
      </Grid>
      <Grid item xs={1} className={classes.removeButton}>
        <RemoveScheduleButton schedule={schedule} />
      </Grid>
    </Grid>
  );
};

export default ScheduleForm;
