import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import Switch from '@material-ui/core/Switch';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Status = () => {
  const [enabled, setEnabled] = useLocalStorage(
    'crontabsEnabled',
    false,
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEnabled(event.target.checked);
  };

  return (
    <Box>
      <FormControlLabel
        control={
          <Switch
            checked={enabled}
            onChange={handleChange}
            name="crontabsEnabled"
          />
        }
        label={enabled ? 'Enabled' : 'Disabled'}
      />
    </Box>
  );
};

export default Status;
