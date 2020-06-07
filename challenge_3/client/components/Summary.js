import React, { useState, useEffect } from 'react';
import { Typography, Button, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  centered: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
    width: '50ch',
    border: '1px solid gray',
    padding: theme.spacing(2),
    borderRadius: '5px',
    marginTop: theme.spacing(2)
  }
}));

const Summary = ({ account }) => {
  const classes = useStyles();
  const history = useHistory();

  const [summary, setSummary] = useState({
    name: '',
    email: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: '',
    cardNo: '',
    billingZip: ''
  });

  useEffect(() => {
    if (!account) {
      console.log('No account registered, redirecting to account creation...');
      setTimeout(() => {
        history.replace('/checkout/account');
      }, 1000);
    } else {
      fetch(`/api/checkout/summary/${account}`)
        .then(res => res.json())
        .then(res => {
          let data = { ...res };
          data.cardNo =  '*'.repeat(data.cardNoLength - 4) + data.cardNoLast4;
          delete data.cardNoLength;
          delete data.cardNoLast4;
          setSummary(data);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <div className="centeredFlexBox">
      <Typography variant="h6" align="center">Summary</Typography>
      <div className={classes.centered}>
        <Typography>Name: {summary.name} ({summary.email})</Typography>
        <Typography gutterBottom={true}>Phone number: {summary.phone}</Typography>


        <Typography>Address</Typography>
        <Typography>{summary.line1}</Typography>
        <Typography>{summary.line2}</Typography>
        <Typography gutterBottom={true}>{summary.city}, {summary.state} {summary.zip}</Typography>

        <Typography>Credit card: {summary.cardNo}</Typography>
        <Typography>Billing zip code: {summary.billingZip}</Typography>
      </div>
      <Box mx="auto" pt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push('/')}
        >
          Purchase
        </Button>
      </Box>

    </div>
  );
};

export default Summary;