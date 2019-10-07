import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Toolbar, AppBar, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 2
  },
  link: {
    padding: 10,
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      color: '#2C3B4E',
      borderBottom: '2px solid #2C3B4E'
    }
  },
  login: {
    textDecoration: 'none',
    color: 'black',
    padding: 10
  },
  navigation: {
    flexGrow: 1
  },
  button: {
    padding: 0,
    margin: 0
  }
}));

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5' className={classes.title}>
            MENO RESTAURATORIAI
          </Typography>
          <Box className={classes.navigation}>
            <Link to='/' className={classes.link}>
              Titulinis
            </Link>
            <Link to='/restauratoriai' className={classes.link}>
              Restauratoriai
            </Link>
            <Link to='/about' className={classes.link}>
              Apie projektą
            </Link>
            <Link to='/blog' className={classes.link}>
              Blog'as
            </Link>
          </Box>
          <Button color='inherit' className={classes.button}>
            <Link to='/login' className={classes.login}>
              Login
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
