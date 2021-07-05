import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import CrontabsFormControl from '../../components/form/CrontabsFormControl';
import { Schedule } from '../../types';
import ScheduleOperationSelect from './ScheduleOperationSelect';

type PropsType = {
  schedule: Schedule;
};

const ScheduleForm = ({ schedule }: PropsType) => {
  return (
    <Grid container>
      <Grid item xs={8}>
        <CrontabsFormControl>
          <TextField
            fullWidth
            required
            label="Schedule"
            defaultValue={schedule.expression}
          />
        </CrontabsFormControl>
      </Grid>
      <Grid item xs={4}>
        <ScheduleOperationSelect schedule={schedule} />
      </Grid>
    </Grid>
  );
};

export default ScheduleForm;
