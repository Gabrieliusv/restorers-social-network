import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Paper, makeStyles, Button, Typography } from "@material-ui/core";
import Progress from "../../customMaterial-ui/Progress";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px"
  },
  paper: {
    padding: "10px",
    maxWidth: "900px",
    width: "calc(100% - 40px)",
    margin: "10px"
  },
  paper__p: {
    margin: 0
  },
  paper__buttonGroup: {
    float: "right"
  },
  paper__buttonGroup__button: {
    margin: "0 10px"
  }
});

const NewMembers = ({ auth: { isAuthenticated } }) => {
  const classes = useStyles();
  const [newUsers, setNewUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("api/users/inactive")
        .then(res => setNewUsers(res.data))
        .then(() => setLoading(false))
        .catch(error => {
          console.log(error);
        });
    }
  }, [isAuthenticated]);

  const handleActivate = (id, index) => {
    axios
      .put(`api/users/activate/${id}`)
      .then(() => setNewUsers(newUsers.filter((user, i) => i !== index)))
      .catch(error => {
        console.log(error);
      });
  };

  const handleDelete = (id, index) => {
    axios
      .delete(`api/users/${id}`)
      .then(() => setNewUsers(newUsers.filter((user, i) => i !== index)))
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className={classes.body}>
      {loading ? (
        <Progress />
      ) : newUsers.length === 0 && !loading ? (
        <Paper className={classes.paper}>
          <Typography variant='h5' align='center'>
            Naujų narių nėra
          </Typography>
        </Paper>
      ) : (
        newUsers.map((user, index) => (
          <Paper key={index} className={classes.paper}>
            <p className={classes.paper__p}>
              <b>Vardas: </b>
              {user.name} <br />
              <b>Elektroninis paštas: </b>
              {user.email} <br />
              <b>Prisistatymas: </b>
              {user.aboutMe}
            </p>
            <div className={classes.paper__buttonGroup}>
              <Button
                color='primary'
                variant='contained'
                size='small'
                className={classes.paper__buttonGroup__button}
                onClick={() => handleActivate(user._id, index)}
              >
                Aktyvuoti
              </Button>
              <Button
                variant='contained'
                size='small'
                startIcon={<DeleteIcon />}
                className={classes.paper__buttonGroup__button}
                onClick={() => handleDelete(user._id, index)}
              >
                Ištrinti
              </Button>
            </div>
          </Paper>
        ))
      )}
    </div>
  );
};

NewMembers.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToPops = state => ({
  auth: state.auth
});

export default connect(mapStateToPops)(NewMembers);
