import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../../redux/actions/profileActions';
import { Grid, Button, CircularProgress, Typography } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  profile: {
    margin: '40px 5px 5px 0'
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
    width: '160px',
    height: '160px',
    borderRadius: '50%'
  },
  profile__info: {
    [theme.breakpoints.down('xs')]: {
      textAlign: 'center'
    }
  },
  profile__buttonGroup: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  loadingProfile: {
    display: 'flex',
    justifyContent: 'center'
  },
  createProfile: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  }
}));

const Profile = ({
  getCurrentProfile,
  auth: { isAuthenticated },
  profile: { profile, loading },
  history
}) => {
  const classes = useStyles();

  useEffect(() => {
    if (!profile && isAuthenticated) {
      getCurrentProfile();
    }
  }, [isAuthenticated, getCurrentProfile, profile]);

  const noProfile = (
    <div className={classes.createProfile}>
      <AccountCircleIcon color='primary' className={classes.profile__image} />
      <Button
        variant='outlined'
        onClick={() => history.push('/profile/create')}
      >
        Kurti Profilį
      </Button>
    </div>
  );

  return (
    <div className={classes.profile}>
      {loading ? (
        <div className={classes.loadingProfile}>
          <CircularProgress />
        </div>
      ) : !profile ? (
        noProfile
      ) : (
        <Fragment>
          <Typography align='center' variant='h4'>
            Mano Profilis
          </Typography>
          <Grid container direction='row' justify='center' p={1}>
            <Grid item xs={12} sm={3} md={3}>
              <div className={classes.profile__image__box}>
                <img
                  src={profile.profileImg.filePath}
                  alt='Profile'
                  height='160'
                  width='160'
                  className={classes.profile__image}
                ></img>
              </div>
            </Grid>
            <Grid item xs={12} sm={8} md={7}>
              <div className={classes.profile__info}>
                <h2>{`${profile.firstName} ${profile.lastName}`}</h2>
                <p>
                  <b>Specializacijos sritis: </b>
                  {profile.specialization}
                </p>
                <p>{profile.about}</p>
                <p>
                  <b>Išsilavinimas:</b> {profile.degree}
                </p>
                <p>
                  <b>Restauratoriaus kategorija: </b>
                  {profile.restorationCategory}
                </p>
                <p>
                  <b>Patirtis: </b> {profile.experience}
                </p>
                <p>
                  <b>Miestas:</b> {profile.city}
                </p>
                <h3>Kontaktiniai duomenys</h3>
                <p>
                  <b>Telefono numeris:</b> {profile.phoneNum}
                </p>
                <p>
                  <b>Elektroninis paštas:</b> {profile.email}
                </p>
              </div>
              <div className={classes.profile__buttonGroup}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={() => history.push('/profile/edit')}
                >
                  Redaguoti profilį
                </Button>
              </div>
            </Grid>
          </Grid>
        </Fragment>
      )}
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Profile);
