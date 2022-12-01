import { Box } from '@material-ui/core';
import React from 'react';
import ButtonCircularProgress from './ButtonCircularProgress';

export default function DataLoading() {
  return (
    <Box
      mt={3}
      mb={3}
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      {' '}
      <ButtonCircularProgress />{' '}
    </Box>
  );
}
