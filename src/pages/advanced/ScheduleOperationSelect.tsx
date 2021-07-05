import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';
import { OperationType, OperationTypes, Schedule } from '../../types';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import CrontabsFormControl from '../../components/form/CrontabsFormControl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

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
  const classes = useStyles();
  return (
    <CrontabsFormControl>
      <InputLabel id={`schedule-operation-${schedule.id}`}>
        Operation
      </InputLabel>
      <Select
        labelId={`schedule-operation-${schedule.id}`}
        key={`schedule-operation-${schedule.id}`}
        value={schedule.operation}
      >
        {OperationTypeMenuItems(schedule)}
      </Select>
    </CrontabsFormControl>
  );
};

export default ScheduleOperationSelect;
