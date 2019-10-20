import React, { useState } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/authActions';
import { Link, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Toolbar,
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

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

function Navbar({ logout }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
          <IconButton
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem>
              <Link to='/profile' className={classes.button__link}>
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default connect(
  null,
  { logout }
)(Navbar);
