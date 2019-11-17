import React, { useState } from "react";
import PropTypes from "prop-types";
import { EditorState, convertFromRaw } from "draft-js";
import {
  Paper,
  makeStyles,
  useTheme,
  Typography,
  Box,
  useMediaQuery,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import ViewOnlyEditor from "../editor/ViewOnlyEditor";

const useStyles = makeStyles({
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "1040px"
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
  dialogImg: {
    maxWidth: "100%",
    height: "500px"
  }
});

const PreviewPost = ({ blogPost }) => {
  const classes = useStyles();
  const [imageIndex, setImageIndex] = useState(0);
  const [openPreview, setOpenPreview] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleImage = index => {
    setImageIndex(index);
    setOpenPreview(true);
  };

  const togglePreview = () => {
    setOpenPreview(!openPreview);
  };

  //Creates image preview
  const imgPreview = () => {
    const preview = blogPost.blogImages.map((image, index) => (
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
      convertFromRaw(JSON.parse(blogPost.blogText))
    );
    return editorState;
  };

  return (
    <div className={classes.body}>
      <Paper className={classes.paper}>
        <img
          src={blogPost.img.filePath}
          alt='theme'
          className={classes.themeImg}
        />
        <Typography component='div'>
          <Box fontSize='h5.fontSize' textAlign='center'>
            {blogPost.subject}
          </Box>
          <Box
            className={classes.author}
            fontSize='h5.fontSize'
            fontFamily='Monospace'
            textAlign='right'
          >
            {`${blogPost.author.firstName} ${blogPost.author.lastName}`}
          </Box>
          <Box fontSize='h6.fontSize' fontFamily='Monospace' textAlign='right'>
            {blogPost.date.slice(0, 10)}
          </Box>
        </Typography>
        <ViewOnlyEditor editorState={convertState()} />
        {blogPost.blogImages.length === 0 ? null : (
          <div className={classes.imageWrapper}>{imgPreview()}</div>
        )}
      </Paper>
      <Dialog
        fullScreen={fullScreen}
        maxWidth='md'
        open={openPreview}
        onClose={togglePreview}
        aria-labelledby='image-preview'
      >
        <DialogContent>
          {blogPost.blogImages.length === 0 ? null : (
            <img
              className={classes.dialogImg}
              src={blogPost.blogImages[imageIndex].filePath}
              alt='preview'
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={togglePreview} color='primary'>
            Uždaryti
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

PreviewPost.propTypes = {
  blogPost: PropTypes.object.isRequired
};

export default PreviewPost;
