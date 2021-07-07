import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AddTabButton from '../components/form/AddTabButton';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  addTabButton: {
    margin: theme.spacing(4),
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
      <AddTabButton />
    </Container>
  );
};

export default Page;
