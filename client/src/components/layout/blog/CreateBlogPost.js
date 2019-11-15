import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { EditorState, convertToRaw } from "draft-js";
import { connect } from "react-redux";
import { removeAlert } from "../../../redux/actions/alertActions";
import {
  uploadBlogImg,
  deleteBlogImg,
  clearBlog,
  createPost
} from "../../../redux/actions/blogActions";
import Alert from "../Alert";

import {
  makeStyles,
  useMediaQuery,
  useTheme,
  Paper,
  Grid,
  TextField,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import DeleteIcon from "@material-ui/icons/Delete";
import CustomEditor from "../editor/CustomEditor";
import ImgButton from "../../customMaterial-ui/ImgButton";
import ImageIcon from "@material-ui/icons/Image";
import BlogPostPreview from "./BlogPostPreview";

const useStyles = makeStyles({
  body: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column"
  },
  paper: {
    margin: "40px 10px",
    maxWidth: "1000px",
    padding: "10px"
  },
  upload: {
    display: "inline-block"
  },
  upload__text: {
    display: "inline-block",
    marginLeft: "10px"
  },
  img__container: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "10px"
  },
  img__addButton: {
    margin: "10px"
  },
  img__addButton__icon: {
    width: "60px",
    height: "60px",
    color: "#BEBEBE"
  },
  img__placeholder: {
    width: "110px",
    height: "110px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "3px",
    boxShadow: "0px 0px 3px 1px rgba(15, 15, 15, 0.17)",
    margin: "10px ",
    backgroundColor: "#FBFBFB"
  },
  img__placeholder__icon: {
    width: "60px",
    height: "60px",
    color: "#DCDCDC"
  },
  img__wrapper: {
    boxShadow: "0px 0px 3px 1px rgba(15, 15, 15, 0.17)",
    margin: "10px",
    padding: 0,
    position: "relative"
  },
  img: {
    width: "110px",
    height: "110px",
    borderRadius: "3px",
    objectFit: "cover"
  },
  img__deleteButton: {
    position: "absolute",
    top: "2px",
    right: "2px",
    background: "rgba(99, 99, 99, 0.4)"
  },
  button__wrapper: {
    float: "right"
  },
  button: {
    margin: "5px"
  }
});

const CreateBlogPost = ({
  uploadBlogImg,
  deleteBlogImg,
  blog,
  removeAlert,
  clearBlog,
  createPost,
  history
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState({
    subject: "",
    about: "",
    img: ""
  });
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [requiredField, setRequiredField] = useState(false);
  const [blogImg, setBlogImg] = useState("");
  const [openNotification, setNotification] = useState(false);
  const [blogPreview, setBlogPreview] = useState(false);

  useEffect(() => {
    if (blog.blogSaved === true) {
      setNotification(true);
      const timer = setTimeout(() => history.push("/"), 1500);
      return () => {
        clearTimeout(timer);
        removeAlert();
      };
    }
  }, [removeAlert, blog.blogSaved, history]);

  useEffect(() => {
    return () => {
      clearBlog();
    };
  }, [clearBlog]);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePreview = () => {
    setBlogPreview(!blogPreview);
  };

  //Saves theme image
  const handleUploadThemeImg = e => {
    if (e.target.files[0] === undefined) {
      return;
    }
    const themeImg = URL.createObjectURL(e.target.files[0]);
    setBlogImg(themeImg);
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0]
    });
  };

  //Uploads image
  const handleUploadImg = e => {
    if (e.target.files[0] === undefined) {
      return;
    }
    const form = new FormData();
    form.append("img", e.target.files[0]);

    uploadBlogImg(form);
  };

  //Save blog post
  const handlePostBlog = () => {
    const isEmpty = Object.values(formData).some(x => x === "");
    if (isEmpty) {
      setRequiredField(formData);
    } else {
      const form = new FormData();
      for (let item in formData) {
        form.append(item, formData[item]);
      }
      const pictures = JSON.stringify(blog.blogImages);
      const text = JSON.stringify(
        convertToRaw(editorState.getCurrentContent())
      );
      form.append("blogText", text);
      form.append("blogImages", pictures);
      createPost(form);
    }
  };

  //Creates image placeholders
  const makeImgPlaceholders = () => {
    const images = blog.blogImages.length;
    const placeholders = [];
    for (let i = images; i < 4; i++) {
      placeholders.push(
        <div key={i} className={classes.img__placeholder}>
          <ImageIcon className={classes.img__placeholder__icon} />
        </div>
      );
    }
    return placeholders;
  };

  //Creates image preview
  const imgPreview = () => {
    const images = blog.blogImages.map((image, index) => (
      <div key={index} className={classes.img__wrapper}>
        <img className={classes.img} src={image.filePath} alt='Blog'></img>
        <IconButton
          color='secondary'
          size='small'
          className={classes.img__deleteButton}
          onClick={() => deleteBlogImg(image.fileName, index)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    ));
    return images;
  };

  return (
    <div className={classes.body}>
      <Paper className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              error={requiredField.subject === ""}
              label='Tema'
              name='subject'
              value={formData.subject}
              onChange={e => handleChange(e)}
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={requiredField.about === ""}
              label='Trumpas aprašymas'
              name='about'
              value={formData.about}
              onChange={e => handleChange(e)}
              variant='outlined'
              fullWidth
              multiline
              rows='3'
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className={classes.upload}
              variant='contained'
              color='secondary'
              component='label'
              startIcon={<CloudUploadIcon />}
            >
              Pridėti temos nuotrauka
              <input
                hidden
                type='file'
                name='img'
                onChange={handleUploadThemeImg}
              />
            </Button>
            {formData.img === "" && requiredField.img === "" ? (
              <Typography
                color='error'
                variant='body1'
                className={classes.upload__text}
              >
                Pasirinkite temos nuotrauką
              </Typography>
            ) : formData.img === "" ? (
              <p className={classes.upload__text}>
                nuotrauka neturėtų užimti daugiau kaip 400kb, 1000x200px bei
                būti jpeg/jpg/png formato.
              </p>
            ) : (
              <p className={classes.upload__text}>{formData.img.name}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <CustomEditor
              editorState={editorState}
              setEditorState={setEditorState}
            />
          </Grid>
          <Grid item xs={12} className={classes.img__container}>
            {imgPreview()}
            {blog.blogImages.length < 5 && (
              <ImgButton
                className={classes.img__addButton}
                component='label'
                variant='contained'
                color='secondary'
              >
                <AddAPhotoIcon className={classes.img__addButton__icon} />
                <input
                  hidden
                  type='file'
                  name='blogImg'
                  onChange={handleUploadImg}
                />
              </ImgButton>
            )}
            {makeImgPlaceholders()}
          </Grid>
          <Grid item xs={12}>
            <Alert />
            <div className={classes.button__wrapper}>
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                onClick={handlePreview}
              >
                Peržiurėti
              </Button>
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                onClick={handlePostBlog}
              >
                Skurti Įrašą
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        fullScreen={fullScreen}
        open={openNotification}
        aria-labelledby='blog-post-success'
      >
        <DialogTitle id='blog-post-success'>
          Tema sukurta, ji bus paskelbta patvirtinus administratoriui
        </DialogTitle>
      </Dialog>
      <Dialog
        fullScreen={fullScreen}
        maxWidth='md'
        open={blogPreview}
        onClose={handlePreview}
        aria-labelledby='blog-preview'
      >
        <DialogTitle id='blog-preview'>Peržiūra</DialogTitle>
        <DialogContent>
          <BlogPostPreview
            editorState={editorState}
            formData={formData}
            blogImg={blogImg}
            images={blog.blogImages}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handlePreview} color='primary'>
            Uždaryti
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

CreateBlogPost.propTypes = {
  blog: PropTypes.object.isRequired,
  uploadBlogImg: PropTypes.func.isRequired,
  deleteBlogImg: PropTypes.func.isRequired,
  removeAlert: PropTypes.func.isRequired,
  clearBlog: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  blog: state.blog
});

export default connect(mapStateToProps, {
  uploadBlogImg,
  deleteBlogImg,
  removeAlert,
  clearBlog,
  createPost
})(CreateBlogPost);
