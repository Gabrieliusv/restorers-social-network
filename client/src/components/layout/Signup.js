import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/authActions';
import { setAlert, removeAlert } from '../../redux/actions/alertActions';
import PropTypes from 'prop-types';
import { Paper, Typography, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  body: {
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: 'rgba(44, 59, 78, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    padding: 20,
    width: 400
  },
  alert: {
    marginBottom: theme.spacing(2)
  },
  textField: {
    marginBottom: 10
  },
  textRegister: {
    marginBottom: 20
  },
  button: {
    float: 'right'
  }
}));

const Signup = ({ register, setAlert, removeAlert, alerts }) => {
  const classes = useStyles();
  const [requiredField, setRequiredField] = useState(false);
  const [match, setMatch] = useState(true);
  const [emailValidation, setEmailValidation] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    aboutMe: ''
  });

  const { name, email, password, password2, aboutMe } = formData;

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = () => {
    const isEmpty = Object.values(formData).some(x => x === '');
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const reset = () => {
      setMatch(true);
      setEmailValidation(true);
      setRequiredField(false);
    };
    reset();
    removeAlert();
    if (isEmpty) {
      setRequiredField(formData);
    } else if (!regex.test(email)) {
      setEmailValidation(false);
    } else if (password !== password2) {
      setMatch(false);
    } else if (password.length < 6) {
      setAlert('Please enter a password with 6 or more characters', 'error');
    } else {
      reset();
      register({ name, email, password, aboutMe });
    }
  };

  return (
    <div className={classes.body}>
      <Paper className={classes.paper}>
        <Typography
          className={classes.textRegister}
          align='center'
          variant='h5'
        >
          Registracija
        </Typography>
        <form>
          <TextField
            error={requiredField.name === ''}
            className={classes.textField}
            label='Name'
            onChange={e => handleChange(e)}
            type='text'
            autoComplete='name'
            name='name'
            value={name}
            variant='outlined'
          />
          <TextField
            error={requiredField.email === '' || !emailValidation}
            className={classes.textField}
            label='Email'
            onChange={e => handleChange(e)}
            type='email'
            name='email'
            value={email}
            autoComplete='email'
            variant='outlined'
            fullWidth
          />
          {emailValidation || requiredField.email === '' ? null : (
            <Typography
              variant='subtitle2'
              color='error'
              className={classes.alert}
            >
              Invalid email address
            </Typography>
          )}
          <TextField
            error={requiredField.password === '' || !match}
            className={classes.textField}
            label='Password'
            onChange={e => handleChange(e)}
            type='password'
            name='password'
            value={password}
            autoComplete='password'
            variant='outlined'
            fullWidth
          />
          <TextField
            error={requiredField.password2 === '' || !match}
            className={classes.textField}
            label='Confirm Password'
            onChange={e => handleChange(e)}
            type='password'
            name='password2'
            autoComplete='password'
            value={password2}
            variant='outlined'
            fullWidth
          />
          {match ? null : (
            <Typography
              variant='subtitle2'
              color='error'
              className={classes.alert}
            >
              Passwords do not match
            </Typography>
          )}
          <TextField
            error={requiredField.aboutMe === ''}
            className={classes.textField}
            label='About me'
            onChange={e => handleChange(e)}
            type='text'
            name='aboutMe'
            value={aboutMe}
            variant='outlined'
            fullWidth
            multiline
            rows={6}
          />
          {alerts === ''
            ? null
            : alerts.map(alert => (
                <Typography
                  key={alert.id}
                  variant='subtitle2'
                  color={alert.alertType}
                  className={classes.alert}
                >
                  {alert.msg}
                </Typography>
              ))}
          <Typography variant='body1'>
            Kiekviena vartotojo registracija yra peržiūrima administracijos,
            vartotojas dažniausiai aktyvuojamas per 1-3 dienas nuo
            registracijos.
          </Typography>
          <Button
            className={classes.button}
            variant='contained'
            color='primary'
            onClick={handleRegister}
          >
            Registruotis
          </Button>
        </form>
      </Paper>
    </div>
  );
};
Signup.propTypes = {
  alerts: PropTypes.string,
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  removeAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert.alerts
});

export default connect(
  mapStateToProps,
  { register, setAlert, removeAlert }
)(Signup);
