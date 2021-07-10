import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useAppSelector } from '../../hooks/useLocalStorage';
import { selectSchedulesByTabId } from '../../store/scheduleSlice';
import { Tab } from '../../types';
import ScheduleList from './ScheduleList';
import CrontabsFormControl from '../../components/form/CrontabsFormControl';
import AddScheduleButtons from './AddScheduleButtons';
import RemoveTabButton from '../../components/form/RemoveTabButton';
import { makeStyles } from '@material-ui/core/styles';

type PropsType = {
  tab: Tab;
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
  },
}));

const TabForm = ({ tab }: PropsType) => {
  const schedules = useAppSelector(selectSchedulesByTabId(tab.id));
  const classes = useStyles();
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
        <ScheduleList schedules={schedules} />
        <Grid container justify="space-between">
          <Grid item>
            <AddScheduleButtons tab={tab} />
          </Grid>
          <Grid item>
            <RemoveTabButton tab={tab} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TabForm;
