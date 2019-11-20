import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Img from "./Images/landingImg.jpeg";
import { Typography, Box, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  body: {
    minHeight: "calc(100vh - 64px)",
    backgroundImage: `url(${Img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    [theme.breakpoints.down(600)]: {
      minHeight: "calc(100vh - 56px)"
    }
  },
  title: {
    wordWrap: "break-word"
  },
  textPaper: {
    position: "absolute",
    bottom: "4vh",
    left: "3vw",
    backgroundColor: "rgba(44, 59, 78, 0.6)",
    padding: 20,
    margin: "10px",
    maxWidth: 700,
    [theme.breakpoints.down(600)]: {
      position: "static",
      margin: 0
    }
  },
  aboutText: {
    maxWidth: "500px",
    padding: 10
  },
  link: {
    padding: 10,
    textTransform: "uppercase",
    textDecoration: "none",
    color: "white",
    "&:hover": {
      borderBottom: "2px solid white"
    }
  }
}));

function Landing(props) {
  const classes = useStyles();
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = Img;
    img.onload = () => {
      setImgLoaded(true);
    };
  }, []);

  return (
    <div className={classes.body}>
      {!imgLoaded ? null : (
        <Paper className={classes.textPaper}>
          <Typography className={classes.title} variant='h4' color='secondary'>
            MENO RESTAURATORIAI
          </Typography>
          <Typography
            variant='body1'
            color='secondary'
            className={classes.aboutText}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            tortor sapien, porta ac tortor quis, scelerisque vulputate mi. Ut at
            venenatis nibh, vitae viverra arcu. Quisque iaculis felis sem, non
            luctus mi commodo ut. Pellentesque nec sem feugiat, mattis quam
            porta, rhoncus erat. Mauris nec arcu sapien. Nam placerat hendrerit
            est in vestibulum. Curabitur tincidunt est quis volutpat vestibulum.
            Quisque sit amet mollis mi. Nunc a lacinia tortor.
          </Typography>
          <Box p={2}>
            <Link to='/restauratoriai' className={classes.link}>
              Restauratoriai
            </Link>
            <Link to='/about' className={classes.link}>
              Apie projektą
            </Link>
            <Link to='/blog' className={classes.link}>
              Blog'as
            </Link>
          </Box>
        </Paper>
      )}
    </div>
  );
}

export default Landing;
