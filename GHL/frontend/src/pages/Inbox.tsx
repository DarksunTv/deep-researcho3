import React from 'react';
import { Box, Typography } from '@mui/material';

const Inbox = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Inbox
      </Typography>
      <Typography variant="body1">
        Welcome to your GHL Workflow Inbox. Messages and notifications will appear here.
      </Typography>
    </Box>
  );
};

export default Inbox; 