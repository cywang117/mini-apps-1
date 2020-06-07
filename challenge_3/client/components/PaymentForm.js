import React, { useState, useEffect } from 'react';
import { Typography, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import NextButton from './NextButton';

const PaymentForm = ({ account }) => {
  const history = useHistory();

  useEffect(() => {
    if (!account) {
      console.log('No account registered, redirecting to account creation...');
      setTimeout(() => {
        history.replace('/checkout/account');
      }, 1000);
    }
  }, []);

  /**************************
   * INPUT VALIDATION - STATE
   */
  const [values, setValues] = useState({
    cardNo: '',
    expiry: '',
    cvv: '',
    billingZip: ''
  });

  const [info, setInfo] = useState({
    cardNo: ' ',
    expiry: ' ',
    cvv: ' ',
    billingZip: ' '
  });

  const [isValid, setIsValid] = useState({
    cardNo: true,
    expiry: true,
    cvv: true,
    billingZip: true
  });

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('Please ensure all required fields are correctly filled in.');


  /******************************
   * INPUT VALIDATION - FUNCTIONS
   */
  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  // Validate input on leaving focus (onblur)
  // cardNo:
  // expiry: may not be empty
  // cvv: 3 characters long
  // billingZip: 5 characters long
  const handleFocusOut = (event) => {
    let id = event.target.id, value = event.target.value;
    if (id === 'cardNo') {
      handleCardNo(value);
    } else if (id === 'expiry') {
      handleExpiry(value);
    } else if (id === 'cvv') {
      handleCvv(value);
    } else if (id === 'billingZip') {
      handleBillingZip(value);
    }
  };

  const handleCardNo = (value) => {
    // Basic credit card number validation -- not needed in an actual
    // checkout system, since we should probably be using a service anyway
    if (!value.match(/^[0-9]{13,}$/)) {
      setInfo({ ...info, cardNo: 'Invalid credit card number' });
      setIsValid({ ...isValid, cardNo: false });
    } else {
      setInfo({ ...info, cardNo: ' ' });
      setIsValid({ ...isValid, cardNo: true });
    }
  };

  const handleExpiry = (value) => {
    if (!value) {
      setInfo({ ...info, expiry: 'Invalid expiry date' });
      setIsValid({ ...isValid, expiry: false });
    } else {
      setInfo({ ...info, expiry: ' ' });
      setIsValid({ ...isValid, expiry: true });
    }
  };

  const handleCvv = (value) => {
    if (!value.match(/^[0-9]{3}$/)) {
      setInfo({ ...info, cvv: 'Invalid CVV' });
      setIsValid({ ...isValid, cvv: false });
    } else {
      setInfo({ ...info, cvv: ' ' });
      setIsValid({ ...isValid, cvv: true });
    }
  };

  const handleBillingZip = (value) => {
    if (!value.match(/^[0-9]{5}$/)) {
      setInfo({ ...info, billingZip: 'Invalid zip code' });
      setIsValid({ ...isValid, billingZip: false });
    } else {
      setInfo({ ...info, billingZip: ' ' });
      setIsValid({ ...isValid, billingZip: true });
    }
  };

  const handleNextClick = () => {
    if (allFieldsFilledAndValid()) {
      let data = {
        email: account,
        cc: {
          cardNo: values.cardNo,
          expiry: values.expiry,
          cvv: values.cvv,
          billingZip: values.billingZip
        }
      };

      fetch('/api/checkout/cc', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(res => {
          if (res.error) {
            setTooltipOpen(true);
            setTooltipMessage(res.error);
          } else {
            history.push('/checkout/summary');
          }
        })
        .catch(console.error);
    } else {
      setTooltipMessage('Please ensure all required fields are correctly filled in.');
      setTooltipOpen(true);
    }
  };

  const allFieldsFilledAndValid = () => {
    return Object.values(isValid).every(valid => valid === true)
        && Object.values(values).every(input => input !== '');
  };


  /***************************
   * CONTENTS TO RENDER TO DOM
   */
  return (
    <div className="centeredFlexBox">
      <Typography variant="h6" align="center">Add Payment Information</Typography>
      <form noValidate autoComplete="off" className="formFlex">
        <TextField
          required
          id="cardNo"
          label="Card number"
          variant="standard"
          margin="dense"
          onChange={handleChange}
          onBlur={handleFocusOut}
          value={values.cardNo}
          error={!isValid.cardNo}
          helperText={info.cardNo}
        />
        <TextField
          required
          id="expiry"
          label="Expiration date"
          variant="standard"
          margin="dense"
          type="date"
          onChange={handleChange}
          onBlur={handleFocusOut}
          value={values.expiry}
          error={!isValid.expiry}
          helperText={info.expiry}
          InputLabelProps={{
            shrink: true
          }}
        />
        <TextField
          required
          id="cvv"
          label="CVV"
          variant="standard"
          margin="dense"
          onChange={handleChange}
          onBlur={handleFocusOut}
          value={values.cvv}
          error={!isValid.cvv}
          helperText={info.cvv}
        />
        <TextField
          required
          id="billingZip"
          label="Billing zip code"
          variant="standard"
          margin="dense"
          onChange={handleChange}
          onBlur={handleFocusOut}
          value={values.billingZip}
          error={!isValid.billingZip}
          helperText={info.billingZip}
        />
      </form>

      <NextButton
        tooltipMessage={tooltipMessage}
        tooltipOpen={tooltipOpen}
        setTooltipOpen={setTooltipOpen}
        handleNextClick={handleNextClick}
      />
    </div>
  )
};

export default PaymentForm;