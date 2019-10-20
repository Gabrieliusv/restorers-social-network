import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Toolbar, AppBar, Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  navigation: {
    flexGrow: 1
  },
  title: {
    flexGrow: 2
  },
  link: {
    padding: 10,
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: 'black'
  },
  active: {
    color: '#2C3B4E',
    borderBottom: '2px solid #2C3B4E'
  },
  button: {
    padding: 0,
    margin: 0
  },
  button__link: {
    textDecoration: 'none',
    color: 'black',
    padding: 7
  }
}));

function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h5' className={classes.title}>
            MENO RESTAURATORIAI
          </Typography>
          <Box className={classes.navigation}>
            <NavLink
              to='/'
              exact
              activeClassName={classes.active}
              className={classes.link}
            >
              Titulinis
            </NavLink>
            <NavLink
              to='/restauratoriai'
              activeClassName={classes.active}
              className={classes.link}
            >
              Restauratoriai
            </NavLink>
            <NavLink
              to='/about'
              className={classes.link}
              activeClassName={classes.active}
            >
              Apie projektą
            </NavLink>
            <NavLink
              to='/blog'
              className={classes.link}
              activeClassName={classes.active}
            >
              Blog'as
            </NavLink>
          </Box>
          <Button color='inherit' className={classes.button}>
            <Link to='/login' className={classes.button__link}>
              Login
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
