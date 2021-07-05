import React from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const CrontabsFormControl = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const classes = useStyles();
  return (
    <FormControl fullWidth className={classes.formControl}>
      {children}
    </FormControl>
  );
};

export default CrontabsFormControl;
