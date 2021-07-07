import React from 'react';
import Box from '@material-ui/core/Box';
import { Schedule } from '../../types';
import ScheduleForm from './ScheduleForm';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';

type PropsType = {
  schedules: Schedule[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scheduleListItem: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    container: {
      marginTop: theme.spacing(1),
    },
  }),
);

const ScheduleList = ({ schedules }: PropsType) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {schedules.map((schedule) => (
        <Box
          className={classes.scheduleListItem}
          key={`schedule-${schedule.id}`}
        >
          <ScheduleForm schedule={schedule} />
        </Box>
      ))}
    </div>
  );
};

export default ScheduleList;
