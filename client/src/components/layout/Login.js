import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../redux/actions/authActions';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, TextField, Button, Typography } from '@material-ui/core';

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
    width: 350
  },
  textLogin: {
    marginBottom: 15
  },
  textField: {
    marginBottom: 10
  },
  buttonLogin: {
    float: 'right'
  },
  signupBox: {
    marginTop: 50,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textSignup: {
    marginBottom: 5
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    width: 170,
    padding: 10
  },
  buttonSignup: {
    padding: 0,
    margin: 0
  }
}));

function Login({ login, alert }) {
  const classes = useStyles();
  const [requiredField, setRequiredField] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { email, password } = formData;

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    const isEmpty = Object.values(formData).some(x => x === '');
    if (isEmpty) {
      setRequiredField(formData);
    } else {
      login(email, password);
    }
  };

  //Redirect if logged
  if (localStorage.token) {
    return <Redirect to='/profile' />;
  }

  return (
    <div className={classes.body}>
      <Paper className={classes.paper}>
        <Typography className={classes.textLogin} align='center' variant='h5'>
          Log into Restauratoriai
        </Typography>
        <form className={classes.form}>
          <TextField
            error={requiredField && requiredField.email === ''}
            id='login-email'
            label='Email'
            type='email'
            name='email'
            value={email}
            onChange={e => handleChange(e)}
            autoComplete='email'
            variant='outlined'
            className={classes.textField}
            fullWidth
          />
          <TextField
            error={requiredField && requiredField.password === ''}
            id='login-password'
            label='Password'
            type='password'
            name='password'
            value={password}
            onChange={e => handleChange(e)}
            autoComplete='current-password'
            variant='outlined'
            className={classes.textField}
            fullWidth
          />
          {alert &&
            alert.map((msg, index) => (
              <Typography key={index} variant='body1' color='error'>
                {msg}
              </Typography>
            ))}
        </form>
        <Button
          className={classes.buttonLogin}
          variant='contained'
          color='secondary'
          onClick={handleLogin}
        >
          Log In
        </Button>
        <div className={classes.signupBox}>
          <Typography
            className={classes.textSignup}
            align='center'
            variant='subtitle1'
          >
            Norėtumėte prisijungti prie restauratorių?
          </Typography>
          <Button
            className={classes.buttonSignup}
            variant='contained'
            color='primary'
          >
            <Link to='/signup' className={classes.link}>
              Registruotis
            </Link>
          </Button>
        </div>
      </Paper>
    </div>
  );
}

Login.propTypes = {
  alert: PropTypes.array,
  login: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert.loginAlert
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
