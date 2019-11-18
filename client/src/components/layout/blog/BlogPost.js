import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EditorState, convertFromRaw } from "draft-js";
import {
  CircularProgress,
  useMediaQuery,
  useTheme,
  makeStyles,
  Paper,
  Typography,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import ViewOnlyEditor from "../editor/ViewOnlyEditor";
import { getBlogPosts } from "../../../redux/actions/blogActions";

const useStyles = makeStyles({
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "1040px"
  },
  progress: {
    margin: "50px"
  },
  paper: {
    padding: "10px",
    width: "calc(100% - 40px)",
    margin: "10px 10px 40px 10px"
  },
  themeImg: {
    height: "200px",
    width: "100%",
    objectFit: "cover",
    marginBottom: "10px"
  },
  author: {
    color: "grey"
  },
  imageWrapper: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    borderTop: "2px solid grey"
  },
  previewImg: {
    width: "200px",
    height: "200px",
    margin: "10px 5px",
    objectFit: "cover",
    cursor: "pointer"
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center"
  },
  dialogImg: {
    maxWidth: "100%",
    height: "500px"
  }
});

const BlogPost = ({ getBlogPosts, blog, match, history }) => {
  const classes = useStyles();
  const [imageIndex, setImageIndex] = useState(0);
  const [openPreview, setOpenPreview] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [post, setPost] = useState();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (blog.blogPosts.length === 0 && blog.loading) {
      getBlogPosts();
    }
    if (!blog.loading) {
      const currentPost = blog.blogPosts.find(
        post => post._id === match.params.id
      );
      setPost(currentPost);
      setloading(false);
    }
  }, [blog.blogPosts, blog.loading, getBlogPosts, match.params.id]);

  const handleImage = index => {
    setImageIndex(index);
    setOpenPreview(true);
  };

  const togglePreview = () => {
    setOpenPreview(!openPreview);
  };

  //Creates image preview
  const imgPreview = () => {
    const preview = post.blogImages.map((image, index) => (
      <img
        key={index}
        className={classes.previewImg}
        src={image.filePath}
        alt='Blog'
        onClick={() => handleImage(index)}
      ></img>
    ));
    return preview;
  };

  const convertState = () => {
    const editorState = EditorState.createWithContent(
      convertFromRaw(JSON.parse(post.blogText))
    );
    return editorState;
  };

  return (
    <div className={classes.body}>
      {loading ? (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      ) : (
        <Fragment>
          <Paper className={classes.paper}>
            <img
              src={post.img.filePath}
              alt='theme'
              className={classes.themeImg}
            />
            <Typography component='div'>
              <Box fontSize='h5.fontSize' textAlign='center'>
                {post.subject}
              </Box>
              <Box
                className={classes.author}
                fontSize='h5.fontSize'
                fontFamily='Monospace'
                textAlign='right'
              >
                {`${post.author.firstName} ${post.author.lastName}`}
              </Box>
              <Box
                fontSize='h6.fontSize'
                fontFamily='Monospace'
                textAlign='right'
              >
                {post.date.slice(0, 10)}
              </Box>
            </Typography>
            <ViewOnlyEditor editorState={convertState()} />
            {post.blogImages.length === 0 ? null : (
              <div className={classes.imageWrapper}>{imgPreview()}</div>
            )}
            <div className={classes.buttonWrapper}>
              <Button onClick={() => history.push("/blog")} color='primary'>
                Gryžti
              </Button>
            </div>
          </Paper>
          <Dialog
            fullScreen={fullScreen}
            maxWidth='md'
            open={openPreview}
            onClose={togglePreview}
            aria-labelledby='image-preview'
          >
            <DialogContent>
              {post.blogImages.length === 0 ? null : (
                <img
                  className={classes.dialogImg}
                  src={post.blogImages[imageIndex].filePath}
                  alt='preview'
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={togglePreview} color='primary'>
                Uždaryti
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      )}
    </div>
  );
};

BlogPost.propTypes = {
  blog: PropTypes.object.isRequired,
  getBlogPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  blog: state.blog
});

export default connect(mapStateToProps, { getBlogPosts })(BlogPost);
