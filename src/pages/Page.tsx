import { Box, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const Page = ({
  children,
  title,
  description,
}: {
  title: string;
  description: string;
  children: any;
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <h1>{title}</h1>
      <h4>{description}</h4>
      {children}
    </Box>
  );
};

export default Page;
