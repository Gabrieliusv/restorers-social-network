import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Button,
  Toolbar,
  AppBar,
  Box,
  Hidden,
  IconButton,
  Drawer,
  List,
  ListItem,
  Divider
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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
  },
  listItem__link: {
    textDecoration: 'none',
    color: 'black',
    width: '100%',
    textAlign: 'center',
    padding: 7
  }
}));

function Navbar() {
  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer(!drawer);
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
            <Button color='inherit' className={classes.button}>
              <Link to='/login' className={classes.button__link}>
                Prisijungti
              </Link>
            </Button>
          </Hidden>
          <Hidden mdUp>
            <IconButton
              onClick={toggleDrawer}
              color='inherit'
              aria-label='menu'
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Drawer anchor='top' open={drawer} onClose={toggleDrawer}>
            <div
              role='presentation'
              onClick={toggleDrawer}
              onKeyDown={toggleDrawer}
            >
              <List>
                <ListItem button className={classes.button}>
                  <Link to='/' className={classes.listItem__link}>
                    Titulinis
                  </Link>
                </ListItem>
                <ListItem button className={classes.button}>
                  <Link to='/restauratoriai' className={classes.listItem__link}>
                    Restauratoriai
                  </Link>
                </ListItem>
                <ListItem button className={classes.button}>
                  <Link to='/about' className={classes.listItem__link}>
                    Apie projektą
                  </Link>
                </ListItem>
                <ListItem button className={classes.button}>
                  <Link to='/blog' className={classes.listItem__link}>
                    Blog'as
                  </Link>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button className={classes.button}>
                  <Link to='/login' className={classes.listItem__link}>
                    Prisijungti
                  </Link>
                </ListItem>
              </List>
            </div>
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
