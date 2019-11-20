import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  getProfile,
  clearProfile
} from "../../../redux/actions/profileActions";
import {
  makeStyles,
  CircularProgress,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  body: {
    padding: "10px"
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "50px"
  },
  profile__image__box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: "30px",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 5px 0 0"
    },
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      padding: "5px"
    }
  },
  profile__image: {
    width: "160px",
    height: "160px",
    borderRadius: "50%"
  },
  profile__info: {
    [theme.breakpoints.down("xs")]: {
      textAlign: "center"
    }
  }
}));

const Restauratorius = ({
  getProfile,
  clearProfile,
  match,
  profile: { profile, profileLoading }
}) => {
  const classes = useStyles();
  const [contact, setContact] = useState(false);

  useEffect(() => {
    getProfile(match.params.id);

    return () => {
      clearProfile();
    };
  }, [getProfile, match.params.id, clearProfile]);

  const toggleContact = () => {
    setContact(!contact);
  };

  return (
    <div className={classes.body}>
      {profileLoading ? (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      ) : (
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
              <Button
                variant='outlined'
                color='primary'
                onClick={toggleContact}
              >
                Kontaktiniai duomenys
              </Button>
            </div>
          </Grid>
          <Dialog
            open={contact}
            onClose={toggleContact}
            aria-labelledby='contact-title'
            aria-describedby='contacts'
          >
            <DialogTitle id='contact-title'>
              {"Kontaktiniai duomenys"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='contacts'>
                {`${profile.firstName} ${profile.lastName}`}
                <br />
                <b>Telefono numeris:</b> {profile.phoneNum}
                <br />
                <b>Elektroninis paštas:</b> {profile.email}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={toggleContact} color='primary'>
                Uždaryti
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      )}
    </div>
  );
};

Restauratorius.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfile, clearProfile })(
  Restauratorius
);
