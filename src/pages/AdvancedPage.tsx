import React from 'react';
import Page from './Page';

const description =
  'Create and edit cron- or text expression-based tab schedules at the lowest possible level to satisfy your inner geek. All cron expressions require a value for seconds.';

const AdvancedPage = () => (
  <Page title="Advanced" description={description}>
    Advanced Page
  </Page>
);

export default AdvancedPage;
