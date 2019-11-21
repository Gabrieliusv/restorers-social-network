import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  loadingProfile: {
    display: "flex",
    justifyContent: "center",
    margin: "50px"
  }
}));

const Progress = () => {
  const classes = useStyles();

  return (
    <div className={classes.loadingProfile}>
      <CircularProgress />
    </div>
  );
};

export default Progress;
