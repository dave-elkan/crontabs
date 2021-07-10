import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useAppSelector } from '../../hooks/useLocalStorage';
import { selectAdvancedSchedulesByTabId } from '../../store/scheduleSlice';
import { Tab } from '../../types';
import CrontabsFormControl from '../../components/form/CrontabsFormControl';
import RemoveTabButton from '../../components/form/RemoveTabButton';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import { DaysOfWeek } from '../../helpers/daysOfWeek';

type PropsType = {
  tab: Tab;
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
  timeEntry: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const TimeManagementTabForm = ({ tab }: PropsType) => {
  const schedules = useAppSelector(
    selectAdvancedSchedulesByTabId(tab.id),
  );
  const classes = useStyles();
  const showSchedule = schedules.find((s) => s.isOpen);
  const closeSchedule = schedules.find((s) => !s.isOpen);
  if (!showSchedule) {
    // TODO handle invalid time Management value here
    return null;
  }

  return (
    <Grid container className={classes.root}>
      <Grid item sm={12}>
        <CrontabsFormControl>
          <TextField
            fullWidth
            required
            label="Tab URL"
            defaultValue={tab.url}
          />
        </CrontabsFormControl>
        <Grid
          container
          justify="space-between"
          spacing={2}
          className={classes.timeEntry}
        >
          <Grid item xs={6}>
            <CrontabsFormControl>
              <TextField
                fullWidth
                required
                label="Open at"
                type="time"
                defaultValue={showSchedule.time}
              />
            </CrontabsFormControl>
          </Grid>
          <Grid item xs={6}>
            <CrontabsFormControl>
              <TextField
                fullWidth
                label="Close at"
                type="time"
                defaultValue={closeSchedule?.time || ''}
              />
            </CrontabsFormControl>
          </Grid>
        </Grid>
        <Grid container justify="space-between">
          <FormGroup row>
            {DaysOfWeek.map((day) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showSchedule.days.indexOf(day.num) > -1}
                    name={day.id}
                  />
                }
                label={day.name}
              />
            ))}
          </FormGroup>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
            <RemoveTabButton tab={tab} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TimeManagementTabForm;
