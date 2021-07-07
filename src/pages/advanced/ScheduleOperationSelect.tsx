import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { OperationType, OperationTypes, Schedule } from '../../types';
import CrontabsFormControl from '../../components/form/CrontabsFormControl';
import { useDispatch } from 'react-redux';
import { updateSchedule } from '../../store/scheduleSlice';

type PropsType = {
  schedule: Schedule;
};

function OperationTypeMenuItems(schedule: Schedule) {
  return Object.keys(OperationTypes).map((ot) => (
    <MenuItem
      value={ot}
      key={`schedule-operation-${schedule.id}-action-${ot}`}
    >
      {OperationTypes[ot as OperationType]}
    </MenuItem>
  ));
}

const ScheduleOperationSelect = ({ schedule }: PropsType) => {
  const dispatch = useDispatch();
  return (
    <CrontabsFormControl>
      <InputLabel id={`schedule-operation-${schedule.id}`}>
        Operation
      </InputLabel>
      <Select
        labelId={`schedule-operation-${schedule.id}`}
        key={`schedule-operation-${schedule.id}`}
        value={schedule.operation}
        onChange={(event) =>
          dispatch(
            updateSchedule({
              scheduleId: schedule.id,
              schedule: {
                operation: event.target.value as OperationType,
              },
            }),
          )
        }
      >
        {OperationTypeMenuItems(schedule)}
      </Select>
    </CrontabsFormControl>
  );
};

export default ScheduleOperationSelect;
