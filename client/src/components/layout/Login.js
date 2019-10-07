import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  body: {
    minHeight: 'calc(100vh - 64px)',
    backgroundColor: 'rgba(44, 59, 78, 0.2)'
  },
  textPaper: {
    position: 'absolute',
    top: '40%',
    marginLeft: '15vw',
    backgroundColor: 'rgba(44, 59, 78, 0.6)',
    padding: 20,
    width: 700
  }
}));

function Login(props) {
  const classes = useStyles();

  return <div className={classes.body}></div>;
}

Login.propTypes = {};

export default Login;
