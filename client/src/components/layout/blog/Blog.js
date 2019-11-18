import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBlogPosts } from "../../../redux/actions/blogActions";
import {
  CircularProgress,
  Paper,
  Typography,
  Box,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles({
  body: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px"
  },
  progress: {
    margin: "50px"
  },
  paper: {
    padding: "10px",
    maxWidth: "900px",
    width: "calc(100% - 40px)",
    margin: "10px",
    cursor: "pointer"
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
  }
});

const Blog = ({ blog: { blogPosts, loading }, getBlogPosts, history }) => {
  const classes = useStyles();

  useEffect(() => {
    if (blogPosts.length === 0 && loading) {
      getBlogPosts();
    }
  }, [blogPosts.length, loading, getBlogPosts]);

  return (
    <div className={classes.body}>
      {loading ? (
        <div className={classes.progress}>
          <CircularProgress />
        </div>
      ) : blogPosts.length === 0 && !loading ? (
        <Paper className={classes.paper}>
          <Typography variant='h5' align='center'>
            Naujų straipsnių nėra
          </Typography>
        </Paper>
      ) : (
        blogPosts.map((post, index) => (
          <Paper
            key={index}
            className={classes.paper}
            onClick={() => history.push(`/blog/${post._id}`)}
          >
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
          </Paper>
        ))
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  getBlogPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  blog: state.blog
});

export default connect(mapStateToProps, { getBlogPosts })(Blog);
