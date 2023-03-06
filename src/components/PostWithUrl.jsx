import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Backdrop from "@mui/material/Backdrop";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ReactTimeAgo from "react-time-ago";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import * as React from "react";

import PostsWithUrlItem from "./PostsWithUrlItem";
import Sizes from '../Sizes'

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "white",
    boxShadow: "0rem 0rem .5rem .05rem var(--purple-2)",
    borderRadius: ".5rem",
    transitionDuration: ".2s",
    marginBottom: "2rem",
    [Sizes.down('sm')]:{
      borderRadius:'0'
    }
  },
  innerContainer: {
    display: "flex",
    flexWrap: "wrap",
    gridTemplateColumns: "4fr 4fr 4fr",
    columnGap: "1%",
    rowGap: ".5rem",
    padding: ".5rem",
    width: "100%",
    [Sizes.down("sm")]: {
      maxHeight:'20rem',
      overflowY:'scroll'
    },
  },
  overlayPost: {
    width: "40%",
    backgroundColor: "var(--purple-3)",
    color: "black",
    position: "relative",
    paddingBottom: ".5rem",
    "&:hover": {
      cursor: "pointer",
      "& $delete_edit": {
        padding: ".5rem",
        width: "6rem",
      },
    },
    [Sizes.down("sm")]: {
      width:'90%'
    },
  },
  overlayPostImg: {
    width: "100%",
    maxHeight: "90vh",
  },
  delete_edit: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    fontSize: "1.5rem",
    top: "0",
    right: "0",
    width: "0",
    transitionDuration: ".2s",
    color: "black",
    backgroundColor: "rgba(255,255,255,.2)",
  },
  xMinAgo: {
    margin: ".5rem",
    fontSize: ".8rem",
    color: "black",
  },
  desc: {
    margin: "0rem .5rem",
    fontSize: "1.1rem",
  },
});

const PostWithUrl = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [backdropPost, setBackdropPost] = useState(null);
  const [open, setOpen] = useState(false);
  const [postsWithUrl, setPostsWithUrl] = useState(props.posts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState();
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  // console.log(user)

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    async function fetchPostWithUrl() {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/timeline/${props.user._id}`
      );
      const currentUserPosts = res.data.filter(
        (post) => post.creatorId === props.user._id
      );
      setPostsWithUrl(currentUserPosts.filter((post) => post.post.url));
    }
    fetchPostWithUrl();
  }, [props.user._id]);

  function handleSetBackdropPost(post, openBackdrop) {
    setBackdropPost(post);
    setOpen(openBackdrop);
  }

  async function handlePostDelete(evt) {
    evt.stopPropagation();
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${backdropPost._id}`,
        {
          data: { userId: props.currentUser._id },

          headers: {
            authorization: "Bearer " + user.token,
          },
        }
      );
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/timeline/${props.currentUser._id}`
      );
      const currentUserPosts = res.data.filter(
        (post) => post.creatorId === props.currentUser._id
      );
      setPostsWithUrl(currentUserPosts.filter((post) => post.post.url));
      setOpen(false);
      setDialogOpen(false);
      // props.setPostsArray(res.data.filter((post) => post.post.url));
      props.setPostsArray(currentUserPosts);
    } catch (err) {
      setOpenSnackbar(true);
      setError(err.response.data.message);
    }
  }

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  function handlePostUpdate() {
    navigate(`/update/post/${backdropPost._id}`);
  }

  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Stack>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are going to delete this post permanently.
            <br />
            Are you sure ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>No</Button>
          <Button onClick={handlePostDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div className={classes.overlayPost}>
          <div
            className={classes.delete_edit}
            style={{
              display:
                backdropPost && backdropPost.creatorId !== props.currentUser._id
                  ? "none"
                  : "",
            }}
          >
            <FaEdit onClick={handlePostUpdate} />
            <MdDelete onClick={handleDialogOpen} />
          </div>
          {backdropPost ? (
            <>
              <img
                src={backdropPost.post.url}
                className={classes.overlayPostImg}
                alt=""
              />
              {backdropPost.desc ? (
                <p className={classes.desc}>{backdropPost.desc}</p>
              ) : null}
              <ReactTimeAgo
                date={backdropPost.createdAt}
                locale="en-US"
                className={classes.xMinAgo}
              />
            </>
          ) : null}
        </div>
      </Backdrop>

      <div
        className={classes.container}
        style={{
          transform: props.show ? "scale(1)" : "scale(0)",
          height: props.show ? "fit-content" : "0",
          position: props.show ? "" : "absolute",
          display: props.posts.length ? "flex" : "none",
        }}
      >
        <div className={classes.innerContainer}>
          {postsWithUrl
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((post) => (
              <PostsWithUrlItem
                key={post._id}
                {...post}
                handleSetBackdropPost={handleSetBackdropPost}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default PostWithUrl;
