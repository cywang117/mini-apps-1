import React, { useState, useEffect } from 'react';
import { Typography, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import NextButton from './NextButton';

// TODO: Ensure address is valid (Google Maps API, advanced content)

const useStyles = makeStyles((theme) => ({
  city: {
    width: '20ch'
  },
  state: {
    width: '14ch'
  },
  zip: {
    width: '12ch'
  },
  noWrapInput: {
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: 'blue'
    }
  }
}));

const states = [
  '-', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];

const ShippingForm = ({ account }) => {
  const classes = useStyles();
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
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: states[0],
    zip: ''
  });

  const [info, setInfo] = useState({
    phone: ' ',
    line1: ' ',
    line2: ' ',
    city: ' ',
    state: ' ',
    zip: ' '
  });

  const [isValid, setIsValid] = useState({
    phone: true,
    line1: true,
    city: true,
    state: true,
    zip: true
  });

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('Please ensure all required fields are correctly filled in');


  /******************************
   * INPUT VALIDATION - FUNCTIONS
   */
  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value });
  };

  // Validate input on leaving focus (onblur)
  // Phone: ensure valid type (xxx-xxx-xxxx)
  // Address line 1: may not be empty
  // City: may not be empty
  // Zip: 5 characters long
  const handleFocusOut = (event) => {
    let id = event.target.id, value = event.target.value;
    if (id === 'phone') {
      handlePhone(value);
    } else if (id === 'line1') {
      handleLine1(value);
    } else if (id === 'city') {
      handleCity(value);
    } else if (id === 'state') {
      handleState();
    } else if (id === 'zip') {
      handleZip(value);
    }
  };

  const handlePhone = (value) => {
    if (!value.match(/^[0-9]{10}$/)) {
      setInfo({ ...info, phone: 'Invalid phone number' });
      setIsValid({ ...isValid, phone: false });
    } else {
      setInfo({ ...info, phone: ' ' });
      setIsValid({ ...isValid, phone: true });
    }
  };

  const handleLine1 = (value) => {
    if (!value) {
      setInfo({ ...info, line1: 'Address line 1 may not be empty' });
      setIsValid({ ...isValid, line1: false });
    } else {
      setInfo({ ...info, line1: ' ' });
      setIsValid({ ...isValid, line1: true });
    }
  };

  const handleCity = (value) => {
    if (!value) {
      setInfo({ ...info, city: 'City may not be empty' });
      setIsValid({ ...isValid, city: false });
    } else {
      setInfo({ ...info, city: ' ' });
      setIsValid({ ...isValid, city: true });
    }
  };

  const handleState = () => {
    if (!values.state || values.state.length !== 2) {
      setInfo({ ...info, state: 'Invalid state' });
      setIsValid({ ...isValid, state: false });
    } else {
      setInfo({ ...info, state: ' ' });
      setIsValid({ ...isValid, state: true });
    }
  };

  const handleZip = (value) => {
    if (!value.match(/^[0-9]{5}$/)) {
      setInfo({ ...info, zip: 'Invalid zip code' });
      setIsValid({ ...isValid, zip: false });
    } else {
      setInfo({ ...info, zip: ' ' });
      setIsValid({ ...isValid, zip: true });
    }
  };

  const handleNextClick = () => {
    if (allReqFieldsFilledAndValid()) {
      let data = {
        email: account,
        address: {
          line1: values.line1,
          line2: values.line2,
          city: values.city,
          state: values.state,
          zip: values.zip
        },
        phone: values.phone
      };

      fetch('/api/checkout/shipping', {
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
            history.push('/checkout/payment');
          }
        })
        .catch(console.error);
    } else {
      setTooltipMessage('Please ensure all required fields are correctly filled in.');
      setTooltipOpen(true);
    }
  };

  const allReqFieldsFilledAndValid = () => {
    let allReqFilled = true;
    for (let key in values) {
      if (key !== 'line2') {
        allReqFilled = allReqFilled && Boolean(values[key]);
      }
    }
    return allReqFilled
        && Object.values(isValid).every(valid => valid === true);
  };


  /***************************
   * CONTENTS TO RENDER TO DOM
   */
  return (
    <div className="centeredFlexBox">
      <Typography variant="h6" align="center">Add Shipping Information</Typography>
      <form noValidate autoComplete="off" className="formFlex">
        <TextField
          required
          id="phone"
          label="Phone number"
          variant="standard"
          margin="dense"
          onChange={handleChange}
          onBlur={handleFocusOut}
          value={values.phone}
          error={!isValid.phone}
          helperText={info.phone}
        />
        <TextField
          required
          id="line1"
          label="Address line 1"
          variant="standard"
          margin="dense"
          onChange={handleChange}
          onBlur={handleFocusOut}
          value={values.line1}
          error={!isValid.line1}
          helperText={info.line1}
        />
        <TextField
          id="line2"
          label="Address line 2"
          variant="standard"
          margin="dense"
          onChange={handleChange}
          value={values.line2}
          helperText={info.line2}
        />
        <div className="spaceBetweenFlex">
          <TextField
            required
            id="city"
            className={classes.city}
            label="City"
            variant="standard"
            margin="dense"
            onChange={handleChange}
            onBlur={handleFocusOut}
            value={values.city}
            error={!isValid.city}
            helperText={info.city}
          />
          <Autocomplete
            options={states}
            autoHighlight
            id="state"
            value={values.state}
            onChange={(event, newValue) => {
              setValues({ ...values, state: newValue });
            }}
            onBlur={handleFocusOut}
            getOptionLabel={(option) => option}
            renderOption={(option) => (
              <Typography noWrap>
                {option}
              </Typography>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                className={classes.state}
                label="State"
                variant="standard"
                margin="dense"
                error={!isValid.state}
                helperText={info.state}
                inputProps={{
                  ...params.inputProps,
                  classes: { input: classes.noWrapInput },
                  autoComplete: 'new-password' // disable autocomplete and autofill
                }}
              />
            )}
          />
          <TextField
            required
            id="zip"
            className={classes.zip}
            label="Zip code"
            variant="standard"
            margin="dense"
            onChange={handleChange}
            onBlur={handleFocusOut}
            value={values.zip}
            error={!isValid.zip}
            helperText={info.zip}
          />
        </div>
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

export default ShippingForm;