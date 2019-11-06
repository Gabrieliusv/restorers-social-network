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
  MenuItem,
  Hidden
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitIcon from '@material-ui/icons/ExitToApp';

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
  menuItem__link: {
    textDecoration: 'none',
    color: 'black',
    padding: 16,
    width: '100%'
  },
  menuItem: {
    padding: 0
  },
  menuItemHidden: {
    padding: 0,
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  logout: {
    padding: 16
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
      <AppBar position='static' color='secondary'>
        <Toolbar>
          <Typography variant='h5' className={classes.title}>
            MENO RESTAURATORIAI
          </Typography>
          <Hidden smDown>
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
          </Hidden>
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
            open={open}
            onClose={handleClose}
            onClick={handleClose}
          >
            <MenuItem className={classes.menuItemHidden}>
              <Link to='/' className={classes.menuItem__link}>
                Titulinis
              </Link>
            </MenuItem>
            <MenuItem className={classes.menuItemHidden}>
              <Link to='/restauratoriai' className={classes.menuItem__link}>
                Restauratoriai
              </Link>
            </MenuItem>
            <MenuItem className={classes.menuItemHidden}>
              <Link to='/blog' className={classes.menuItem__link}>
                Blog'as
              </Link>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
              <Link to='/profile' className={classes.menuItem__link}>
                Profilis
              </Link>
            </MenuItem>
            <MenuItem className={classes.menuItem}>
              <Link to='/newBlogPost' className={classes.menuItem__link}>
                Rašyti bloga
              </Link>
            </MenuItem>
            <MenuItem className={classes.logout} onClick={logout}>
              Logout
              <ExitIcon />
            </MenuItem>
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
