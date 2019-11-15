import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  makeStyles,
  useTheme,
  Typography,
  useMediaQuery,
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from "@material-ui/core";
import ViewOnlyEditor from "../editor/ViewOnlyEditor";
import { borderTop } from "@material-ui/system";

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
    width: "100%"
  }
});

const BlogPostPreview = ({ editorState, formData, blogImg, images }) => {
  const classes = useStyles();
  const [imageIndex, setImageIndex] = useState(0);
  const [openPreview, setOpenPreview] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleImage = index => {
    setImageIndex(index);
    togglePreview();
  };

  const togglePreview = () => {
    setOpenPreview(!openPreview);
  };

  //Creates image preview
  const imgPreview = () => {
    const preview = images.map((image, index) => (
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

  return (
    <div className={classes.body}>
      <Paper className={classes.paper}>
        {blogImg && (
          <img src={blogImg} alt='theme' className={classes.themeImg} />
        )}
        <Typography variant='h5' align='center'>
          {formData.subject}
        </Typography>
        <ViewOnlyEditor editorState={editorState} />
        {images.length === 0 ? null : (
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
          {images.length === 0 ? null : (
            <img
              className={classes.dialogImg}
              src={images[imageIndex].filePath}
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

BlogPostPreview.propTypes = {
  editorState: PropTypes.object.isRequired,
  formData: PropTypes.object.isRequired,
  blogImg: PropTypes.string.isRequired
};

export default BlogPostPreview;
