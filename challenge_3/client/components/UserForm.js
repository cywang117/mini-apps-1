import React, { useState } from 'react';
import { Typography, TextField, FormControl, InputLabel, Input, FormHelperText, Button, Tooltip, ClickAwayListener } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  halfWidthInput: {
    width: '24ch'
  },
  inlineFlex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  centerFlex: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const UserForm = () => {
  const classes = useStyles();
  const history = useHistory();

  /**************************
   * INPUT VALIDATION - STATE
   */
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [info, setInfo] = useState({
    firstName: ' ',
    lastName: ' ',
    email: ' ',
    confirmPassword: ' '
  });

  // 3 is skipped, because match groups 2 & 3 in password validation below both correspond to error 2 here
  const passInfo = {
    1: 'Must not contain spaces',
    2: 'Must be between 8-20 characters',
    4: 'Must contain 1+ uppercase letter',
    5: 'Must contain 1+ number',
    6: 'Must contain 1+ special character'
  };

  const [passErrors, setPassErrors] = useState([]);

  const [isValid, setIsValid] = useState({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
    confirmPassword: true
  });

  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('Please ensure all required fields are correctly filled in.')


  /******************************
   * INPUT VALIDATION - FUNCTIONS
   */
  const handleChange = (event) => {
    setValues({ ...values, [event.target.id]: event.target.value});
  };

  // Validate input on leaving focus (onblur)
  // First/last names: capitalize first letter, lowercase others
  // Email: must have correct shape
  // Password: must have lowercase, uppercase, number, special char, correct length
  // Passwords: must match each other
  const handleFocusOut = (event) => {
    let id = event.target.id, value = event.target.value;
    if (id === 'firstName' || id === 'lastName' ) {
      handleName(value, id);
    } else if (id === 'email') {
      handleEmail(value);
    } else if (id === 'password') {
      handlePassword(value);
      if (values.confirmPassword) {
        handleConfirmPassword();
      }
    } else if (id === 'confirmPassword') {
      handleConfirmPassword();
    }
  };

  const handleName = (value, id) => {
    if (!value) {
      setInfo({ ...info, [id]: `Invalid ${id === 'firstName' ? 'first' : 'last'} name` });
      setIsValid({ ...isValid, [id]: false });
    } else {
      value = value.trim();
      setValues({ ...values, [id]: value[0].toUpperCase() + value.slice(1).toLowerCase() })
      setInfo({ ...info, [id]: ' ' });
      setIsValid({ ...isValid, [id]: true });
    }
  };

  const handleEmail = (value) => {
    if (!/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {
      setInfo({ ...info, email: 'Please enter a valid email address.' });
      setIsValid({ ...isValid, email: false });
    } else {
      setInfo({ ...info, email: ' ' });
      setIsValid({ ...isValid, email: true });
    }
  };

  const handlePassword = (value) => {
    let match = value.match(/(.*\s+.*)|^(?:(.{0,7})|(.{21,})|([a-z\d]*)|([A-Za-z]*)|([a-zA-Z0-9]*))$/);
    // Group 1: contains spaces
    // Group 2: too short
    // Group (3): too long // same message index as group 2
    // Group 4: No uppercase
    // Group 5: No digit
    // Group 6: No symbol
    let errors = [];
    if (match) {
      for (let i = 1; i < 7; i++) {
        if (i === 3) {
          match[i] !== undefined && errors.push(2);
        } else {
          match[i] !== undefined && errors.push(i);
        }
      }
    }
    setPassErrors([...errors]);
    errors.length ? setIsValid({ ...isValid, password: false }) : setIsValid({ ...isValid, password: true });
  };

  const handleConfirmPassword = () => {
    if (values.password !== values.confirmPassword) {
      setInfo({ ...info, confirmPassword: 'Passwords must match' });
      setIsValid({ ...isValid, confirmPassword: false });
    } else {
      setInfo({ ...info, confirmPassword: ' ' });
      setIsValid({ ...isValid, confirmPassword: true });
    }
  };

  const handleNextClick = () => {
    if (allFieldsFilledAndValid()) {
      let data = {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        password: values.password
      };

      fetch('/api/checkout/account', {
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
            history.push('/checkout/shipping');
          }
        });
    } else {
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
      <Typography variant="h6" align="center">Create an Account</Typography>
      <form noValidate autoComplete="off" className="formFlex">
        <div className={classes.inlineFlex}>
          <TextField
            required
            id="firstName"
            className={classes.halfWidthInput}
            label="First name"
            variant="standard"
            margin="dense"
            onChange={handleChange}
            onBlur={handleFocusOut}
            value={values.firstName}
            error={!isValid.firstName}
            helperText={info.firstName}
          />
          <TextField
            required
            id="lastName"
            className={classes.halfWidthInput}
            label="Last name"
            variant="standard"
            margin="dense"
            onChange={handleChange}
            onBlur={handleFocusOut}
            value={values.lastName}
            error={!isValid.lastName}
            helperText={info.lastName}
          />
        </div>
        <TextField
          required
          id="email"
          label="Email"
          variant="standard"
          margin="dense"
          onChange={handleChange}
          onBlur={handleFocusOut}
          value={values.email}
          error={!isValid.email}
          helperText={info.email}
        />
        <FormControl
          required
          margin="dense"
          error={!isValid.password}
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            aria-describedby="passwordHelper"
            type="password"
            onChange={handleChange}
            onBlur={handleFocusOut}
            value={values.password}
            error={!isValid.password}
           />
          {
            passErrors.length ?
            passErrors.map((err, idx) =>
                <FormHelperText id={idx === 0 ? "passwordHelper" : `passwordHelper${idx}`} key={idx}>{passInfo[err]}</FormHelperText>
              ) :
              <FormHelperText id="passwordHelper"> </FormHelperText>
          }
        </FormControl>
        <TextField
          required
          id="confirmPassword"
          label="Confirm password"
          variant="standard"
          margin="dense"
          type="password"
          onChange={handleChange}
          onBlur={handleFocusOut}
          value={values.confirmPassword}
          error={!isValid.confirmPassword}
          helperText={info.confirmPassword}
        />
      </form>

      <div className={classes.centerFlex}>
        <ClickAwayListener onClickAway={() => { setTooltipOpen(false); }}>
          <Tooltip
            arrow
            title={tooltipMessage}
            open={tooltipOpen}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextClick}
            >
              Next
            </Button>
          </Tooltip>
        </ClickAwayListener>
      </div>
    </div>
  )
};

export default UserForm;