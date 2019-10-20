import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  body: {
    padding: '15px 10px 10px 10px'
  },
  profile__image__box: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: '30px',
    [theme.breakpoints.down('sm')]: {
      padding: '30px 5px 0 0'
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
      padding: '5px'
    }
  },
  profile__image: {
    width: '150px',
    height: '150px',
    color: '#2C3B4E'
  },
  profile__info: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  }
}));

function Profile(props) {
  const classes = useStyles();

  return (
    <Grid container direction='row' justify='center' className={classes.body}>
      <Grid item xs={12} sm={3} md={3}>
        <div className={classes.profile__image__box}>
          <AccountCircleIcon className={classes.profile__image} />
        </div>
      </Grid>
      <Grid item xs={12} sm={9} md={7}>
        <div className={classes.profile__info}>
          <h3>Vardas Pavardė</h3>
          <h4>Specializacijos sritis</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
            condimentum urna lacus, vitae mollis justo sodales aliquet. Proin at
            arcu laoreet, accumsan mi et, ultricies justo. Vivamus laoreet,
            tortor id mollis lobortis, elit lectus rutrum turpis, sit amet
            congue tortor ex quis ligula. Morbi eget neque arcu. Pellentesque
            nisl metus, tempus ac condimentum quis, vestibulum et arcu. Nam
            massa felis, sagittis in arcu eu, ullamcorper luctus risus. Aenean
            malesuada nunc eget mi ultrices gravida. Nullam nec urna purus.
            Aliquam enim purus, aliquam sed odio sit amet, dignissim sagittis
            sapien. Etiam condimentum lacus orci, a vehicula velit semper eget.
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Sed sed dignissim diam, ut finibus nisl.
            Mauris non iaculis odio. Pellentesque ultricies turpis eget sagittis
            hendrerit. Sed in iaculis arcu. Duis ut elit non est cursus egestas
            at sed libero.
          </p>
          <h4>Išsilavinimas: </h4>
          <h4>Restauratoriaus kategorija: </h4>
          <h4>Patirtis: </h4>
          <h4>Miestas: </h4>
          <Button variant='outlined'>Kontaktai</Button>
        </div>
      </Grid>
    </Grid>
  );
}

Profile.propTypes = {};

export default Profile;
