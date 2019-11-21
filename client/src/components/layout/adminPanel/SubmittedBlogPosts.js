import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import {
  Paper,
  makeStyles,
  useTheme,
  useMediaQuery,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@material-ui/core";
import Progress from "../../customMaterial-ui/Progress";
import DeleteIcon from "@material-ui/icons/Delete";
import PreviewPost from "./PreviewPost";

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
  themeImg: {
    height: "200px",
    width: "100%",
    objectFit: "cover"
  },
  subjectWrapper: {
    display: "flex"
  },
  subject: {
    flexGrow: 1
  },
  name: {
    color: "grey"
  },
  buttonGroup: {
    float: "right"
  },
  buttonGroup__button: {
    margin: "0 10px"
  }
});

const SubmittedBlogPosts = ({ auth: { isAuthenticated } }) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [newPosts, setNewPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(false);
  const [previewPost, setPreviewPost] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get("api/blog/pending")
        .then(res => setNewPosts(res.data))
        .then(() => setLoading(false))
        .catch(error => {
          console.log(error);
        });
    }
  }, [isAuthenticated]);

  const handlePublish = (id, index) => {
    axios
      .put(`api/blog/publish/${id}`)
      .then(() => setNewPosts(newPosts.filter((post, i) => i !== index)))
      .catch(error => {
        console.log(error);
      });
  };

  const handleDelete = (id, index) => {
    axios
      .delete(`api/blog/${id}`)
      .then(() => setNewPosts(newPosts.filter((post, i) => i !== index)))
      .catch(error => {
        console.log(error);
      });
  };

  const handlePreview = index => {
    setPreviewPost({ ...newPosts[index] });
    setPreview(true);
  };

  const closePreview = () => {
    setPreview(false);
  };

  return (
    <div className={classes.body}>
      {loading ? (
        <Progress />
      ) : newPosts.length === 0 && !loading ? (
        <Paper className={classes.paper}>
          <Typography variant='h5' align='center'>
            Naujų straipsnių nėra
          </Typography>
        </Paper>
      ) : (
        newPosts.map((post, index) => (
          <Paper key={index} className={classes.paper}>
            <img
              src={post.img.filePath}
              alt='theme'
              className={classes.themeImg}
            />
            <Typography component='div'>
              <Box className={classes.subjectWrapper} mt={1}>
                <Box
                  className={classes.subject}
                  fontSize='h5.fontSize'
                  lineHeight={1}
                >
                  {post.subject}
                </Box>
                <Box
                  fontSize='h6.fontSize'
                  fontFamily='Monospace'
                  lineHeight={1}
                >
                  {post.date.slice(0, 10)}
                </Box>
              </Box>

              <Box
                className={classes.name}
                fontFamily='Monospace'
                fontSize='h6.fontSize'
              >
                {`${post.author.firstName} ${post.author.lastName}`}
              </Box>
              <Box fontSize='p.fontSize' mt={2}>
                {post.about}
              </Box>
            </Typography>
            <div className={classes.buttonGroup}>
              <Button
                color='primary'
                variant='contained'
                size='small'
                className={classes.buttonGroup__button}
                onClick={() => handlePreview(index)}
              >
                Peržiūrėti
              </Button>
              <Button
                color='primary'
                variant='contained'
                size='small'
                className={classes.buttonGroup__button}
                onClick={() => handlePublish(post._id, index)}
              >
                Publikuoti
              </Button>
              <Button
                variant='contained'
                size='small'
                startIcon={<DeleteIcon />}
                className={classes.buttonGroup__button}
                onClick={() => handleDelete(post._id, index)}
              >
                Ištrinti
              </Button>
            </div>
          </Paper>
        ))
      )}
      <Dialog
        fullScreen={fullScreen}
        maxWidth='md'
        open={preview}
        onClose={closePreview}
        aria-labelledby='blog-preview'
      >
        <DialogTitle id='blog-preview'>Peržiūra</DialogTitle>
        <DialogContent>
          <PreviewPost blogPost={previewPost} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closePreview} color='primary'>
            Uždaryti
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SubmittedBlogPosts.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToPops = state => ({
  auth: state.auth
});

export default connect(mapStateToPops)(SubmittedBlogPosts);
