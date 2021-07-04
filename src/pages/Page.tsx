import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

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
    <Container fixed className={classes.root}>
      <h1>{title}</h1>
      <h4>{description}</h4>
      {children}
    </Container>
  );
};

export default Page;
