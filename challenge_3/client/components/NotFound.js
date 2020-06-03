import React from 'react';
import { Typography } from '@material-ui/core';

const NotFound = () => (
  <div className='centeredFlexBox'>
    <Typography variant="h3" gutterBottom={true} align="center">Oops!</Typography>
    <Typography align="center">The page you're looking for doesn't exist.</Typography>
  </div>
);

export default NotFound;