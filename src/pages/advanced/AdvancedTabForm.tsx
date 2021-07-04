import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { useAppSelector } from '../../hooks/useLocalStorage';
import { selectSchedulesByTabId } from '../../store/scheduleSlice';
import { Tab } from '../../types';
import ScheduleList from './ScheduleList';
import CrontabsFormControl from '../../components/form/CrontabsFormControl';

type PropsType = {
  tab: Tab;
};

const TabForm = ({ tab }: PropsType) => {
  const schedules = useAppSelector(selectSchedulesByTabId(tab.id));
  return (
    <Grid container spacing={10}>
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
      </Grid>
    </Grid>
  );
};

export default TabForm;
