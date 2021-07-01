import { Box } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  nav: {
    flexGrow: 1,
    marginLeft: theme.spacing(3),
  },
}));

const Page = ({ children }: { children: any }) => (
  <Box>{children}</Box>
);

export default Page;
