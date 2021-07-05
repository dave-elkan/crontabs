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
  }),
);

const ScheduleList = ({ schedules }: PropsType) => {
  const classes = useStyles();
  return (
    <>
      {schedules.map((schedule) => (
        <Box
          className={classes.scheduleListItem}
          key={`schedule-${schedule.id}`}
        >
          <ScheduleForm schedule={schedule} />
        </Box>
      ))}
    </>
  );
};

export default ScheduleList;
