import React from 'react';
import { Typography, Box, Button, Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const Home = () => (
  <div className='centeredFlexBox'>
    <Typography variant="h3" gutterBottom={true} align="center">Checkout Process</Typography>
    <Typography variant="h6" gutterBottom={true} align="center">MERN Stack Demo</Typography>
    <Box mx="auto" mt={5}>
      <Button variant="contained" color="primary">
        <Link component={RouterLink} to="/checkout/account" className="white">
          Checkout &gt;
        </Link>
      </Button>
    </Box>
  </div>
);

export default Home;