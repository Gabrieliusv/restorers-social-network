import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../../../redux/actions/profileActions";
import {
  makeStyles,
  CircularProgress,
  Grid,
  Typography,
  TextField
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  search: {
    margin: "30px 0 0 60px",
    [theme.breakpoints.down(600)]: {
      display: "flex",
      justifyContent: "center",
      margin: "30px 0 0 0"
    }
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "50px"
  },
  grid: {
    padding: "30px"
  },
  profileWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer"
  },
  img: {
    borderRadius: "50% ",
    overflow: "hidden",
    width: "160px",
    height: "160px",
    margin: "10px"
  }
}));

function Restauratoriai({
  profile: { profiles, profilesLoading },
  getProfiles,
  history
}) {
  const classes = useStyles();
  const [searchResult, setSearchResult] = useState(false);

  useState(() => {
    if (profiles.length === 0 && profilesLoading) {
      getProfiles();
    }
  }, []);

  const handleSearch = e => {
    const result = profiles.filter(
      profile =>
        profile.firstName
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        profile.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        profile.specialization
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
    );
    setSearchResult(result);
  };

  return (
    <div>
      <div className={classes.search}>
        <TextField
          label='Filtruoti (arba paieška)'
          margin='normal'
          variant='outlined'
          onChange={handleSearch}
        />
      </div>
      {profilesLoading ? (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      ) : searchResult ? (
        <Grid className={classes.grid} container spacing={1}>
          {searchResult.map(profile => (
            <Grid key={profile._id} item xs={12} sm={4} md={3} lg={2} xl={1}>
              <div
                className={classes.profileWrapper}
                onClick={() => history.push(`/restauratoriai/${profile._id}`)}
              >
                <img
                  className={classes.img}
                  src={profile.profileImg.filePath}
                  alt='user'
                />
                <Typography align='center' variant='subtitle2'>
                  {`${profile.firstName.toUpperCase()} ${profile.lastName.toUpperCase()}`}
                </Typography>
                <Typography align='center' variant='caption'>
                  {profile.specialization}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid className={classes.grid} container spacing={1}>
          {profiles.map(profile => (
            <Grid key={profile._id} item xs={12} sm={4} md={3} lg={2} xl={1}>
              <div
                className={classes.profileWrapper}
                onClick={() => history.push(`/restauratoriai/${profile._id}`)}
              >
                <img
                  className={classes.img}
                  src={profile.profileImg.filePath}
                  alt='user'
                />
                <Typography align='center' variant='subtitle2'>
                  {`${profile.firstName.toUpperCase()} ${profile.lastName.toUpperCase()}`}
                </Typography>
                <Typography align='center' variant='caption'>
                  {profile.specialization}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

Restauratoriai.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Restauratoriai);
