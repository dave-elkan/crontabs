import React from 'react';
import { Schedule } from '../../types';
import IconButton from '@material-ui/core/IconButton';
import { removeSchedule } from '../../store/scheduleSlice';
import { useDispatch } from 'react-redux';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

type PropsType = {
  schedule: Schedule;
};

const RemoveScheduleButon = ({ schedule }: PropsType) => {
  const dispatch = useDispatch();
  const handleRemove = () => {
    dispatch(removeSchedule(schedule.id));
  };

  return (
    <IconButton aria-label="Remove Schedule" onClick={handleRemove}>
      <RemoveCircleOutlineIcon />
    </IconButton>
  );
};

export default RemoveScheduleButon;
