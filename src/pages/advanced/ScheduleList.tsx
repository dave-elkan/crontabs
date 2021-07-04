import Box from '@material-ui/core/Box';
import React from 'react';
import { Schedule } from '../../types';
import ScheduleForm from './ScheduleForm';

type PropsType = {
  schedules: Schedule[];
};

const ScheduleList = ({ schedules }: PropsType) => (
  <>
    {schedules.map((schedule) => (
      <Box key={`schedule-${schedule.id}`}>
        <ScheduleForm schedule={schedule} />
      </Box>
    ))}
  </>
);

export default ScheduleList;
