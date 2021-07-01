import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const Page = ({ children }: { children: any }) => {
  const classes = useStyles();
  return <Box className={classes.root}>{children}</Box>;
};

export default Page;
