import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { useAppSelector } from '../../hooks/useLocalStorage';
import { selectSchedulesByTabId } from '../../store/scheduleSlice';
import { Schedule, Tab } from '../../types';
import CrontabsFormControl from '../../components/form/CrontabsFormControl';
import RemoveTabButton from '../../components/form/RemoveTabButton';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import { DaysOfWeek } from '../../helpers/daysOfWeek';
import { getLaterScheduleForExpression } from '../../helpers/laterHelper';

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

function tabDays(schedule: Schedule): number[] {
  let result: number[] = [];
  if (!schedule) {
    return result;
  }

  const laterSchedule = getLaterScheduleForExpression(schedule);

  return laterSchedule?.schedules[0]?.d as number[];
}

function populateTimes(schedules: Schedule[]): string[] {
  return schedules.map((schedule) => {
    var laterSchedule = getLaterScheduleForExpression(schedule);
    var hour = laterSchedule?.schedules[0].h;
    var minute = laterSchedule?.schedules[0].m;

    if (minute < 10) {
      minute = '0' + minute;
    }

    if (hour < 10) {
      hour = '0' + hour;
    }

    return [hour, minute].join(':');
  });
}

const TimeManagementTabForm = ({ tab }: PropsType) => {
  const schedules = useAppSelector(selectSchedulesByTabId(tab.id));
  const classes = useStyles();

  const showSchedule = schedules.find(
    (s) => s.type === 'cron' && s.operation === 'show',
  );
  const closeSchedule = schedules.find(
    (s) => s.type === 'cron' && s.operation === 'close',
  );

  if (!showSchedule) {
    // TODO handle invalid time Management value here
    return null;
  }

  const selectedTabDays = tabDays(showSchedule);
  const scheduleTimes = populateTimes(schedules);
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
                defaultValue={scheduleTimes[0]}
              />
            </CrontabsFormControl>
          </Grid>
          <Grid item xs={6}>
            <CrontabsFormControl>
              <TextField
                fullWidth
                required
                label="Close at"
                type="time"
                defaultValue={scheduleTimes[1] || ''}
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
                    checked={selectedTabDays.indexOf(day.num) > -1}
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
