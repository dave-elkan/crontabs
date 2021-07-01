import React from 'react';
import Box from '@material-ui/core/Box';
import Page from './Page';
const description =
  'Increase your productivity by automating tabs to open and close throughout the week to streamline daily tasks.';

const TimeManagementPage = () => (
  <Page title="Time management" description={description}>
    This is time management
  </Page>
);

export default TimeManagementPage;
