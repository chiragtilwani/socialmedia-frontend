import { makeStyles } from "@mui/styles";
import { BsFillHeartFill } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { IoIosShare } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useSelector } from "react-redux";

import Comment from "./Comment";
import Sizes from "../Sizes";
import Hdivider from "./Hdivider";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const useStyles = makeStyles({
  container: {
    width: "100%",
    borderRadius: ".5rem",
    backgroundColor: "var(--bg)",
    color: "var(--text1)",
    marginBottom: "2rem",
    padding: ".5rem 0rem",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    "&:hover": {
      "& $iconContainer": {
        transform: "scale(1)",
      },
    },
    [Sizes.down("sm")]: {
      borderRadius: 0,
      marginBottom: "1rem",
    },
    [Sizes.down("xs")]: {
      padding: "0.2rem",
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    margin: ".5rem 1rem",
    [Sizes.down("xs")]: {
      margin: "0.2rem",
    },
  },
  name_username: {
    display: "flex",
    flexDirection: "column",
  },
  name: {
    fontWeight: "bold",
    textTransform: "capitalize",
    cursor: "pointer",
    textDecoration: "none",
    color: "var(--text1)",
    [Sizes.down("xs")]: {
      fontSize: ".8rem",
    },
  },
  username: {
    marginLeft: ".3rem",
    fontSize: ".8rem",
    color: "var(--purple-2)",
    fontWeight: "bold",
    transitionDuration: ".2s",
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      color: "var(--text1)",
    },
    [Sizes.down("xs")]: {
      fontSize: ".7rem",
    },
  },
  postImg: {
    width: "95%",
    height: "25rem",
    margin: "1rem auto",
    borderRadius: ".6rem",
    [Sizes.down("sm")]: {
      margin: "0.5rem 0",
      borderRadius: "0rem",
      height: "20rem",
      width: "100%",
    },
    [Sizes.down("xs")]: {
      height: "15rem",
    },
  },
  desc: {
    margin: "0rem 1.3rem",
    fontSize: "1.1rem",
    [Sizes.down("xs")]: {
      fontSize: "1rem",
      margin: "0rem .2rem",
    },
  },
  btnContainer: {
    margin: ".8rem",
    display: "flex",
    alignItems: "center",
    [Sizes.down("xs")]: {
      margin: "0.5rem 0rem",
    },
  },
  btn: {
    marginRight: ".5rem",
  },
  icon: {
    margin: "0rem .4rem",
    fontSize: "2rem",
    cursor: "pointer",
    transitionDuration: ".2s",
    padding: ".2rem",
    "&:active": {
      transform: "scale(.5)",
    },
    [Sizes.down("md")]: {
      fontSize: "1.5rem",
    },
    [Sizes.down("xs")]: {
      margin: "0rem .2rem",
    },
  },
  like_comment_count: {
    fontSize: ".9rem",
    [Sizes.down("md")]: {
      fontSize: ".7rem",
    },
  },
  xMinAgo: {
    marginLeft: ".5rem",
    fontSize: ".8rem",
    color: "var(--purple-2)",
    fontWeight: "bold",
    [Sizes.down("sm")]: {
      fontSize: ".7rem",
    },
  },
  iconContainer: {
    width: "4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "1.5rem",
    transform: "scale(0)",
    transitionDuration: ".2s",
  },
  edit_delete_icon: {
    cursor: "pointer",
    transitionDuration: ".2s",
    "&:hover": {
      color: "var(--purple-1)",
      transform: "scale(.8)",
    },
  },
  link: {
    color: "var(--text1)",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImgContainer: {
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    border: ".2rem solid var(--purple-1)",
    boxShadow: "0rem 0rem .5rem .05rem var(--purple-2)",
    cursor: "pointer",
    overflow: "hidden",
    marginRight: "1rem",
    [Sizes.down("xs")]: {
      width: "2.5rem",
      height: "2.5rem",
      marginRight: ".5rem",
    },
  },
  profileImg: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
  },
  changedCaption: {
    outline: "none",
    borderColor: "var(--purple-2)",
    marginTop: ".7rem",
    width: "100%",
    height: "2rem",
    borderRadius: ".5rem",
    padding: ".5rem",
  },
});
const Post = (props) => {
  const classes = useStyles();

  const [showComments, setShowComments] = useState(false);
  const [creator, setCreator] = useState({});
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(props);
  const [sharePost, setSharePost] = useState(false);
  const [changedCaption, setChangedCaption] = useState(props.desc);
  const [error, setError] = useState();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [liked, setLiked] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    const fetchCreatorAndComment = async () => {
      let res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users?userId=${currentPost.creatorId}`
      );
      setCreator(res.data);

      res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments/${currentPost._id}`
      );
      setComments(res.data);
    };
    fetchCreatorAndComment();
  }, [currentPost.creatorId, currentPost._id]);

  async function handleLikeClick() {
    try {
      setLiked((prevState) => !prevState);
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/posts/${currentPost._id}/likedislike`,
        { userId: props.currentUser._id }
      );
      let res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/${currentPost._id}`
      );
      setCurrentPost(res.data);
    } catch (err) {
      setError(err.response.data.message);
      setOpenSnackbar(true);
    }
  }

  function handleCommentClick() {
    setShowComments((prevProp) => !prevProp);
  }

  async function handleDeleteClick() {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${props._id}`,
        {
          data: { userId: props.currentUser._id },

          headers: {
            authorization: "Bearer " + user.token,
          },
        }
      );
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/user/${user._id}`
      );
      props.setPostsArray(res.data);
      props.setNumCurrentUserPosts(res.data.length);
    } catch (err) {
      setError(err.response.data.message);
      setOpenSnackbar(true);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleShareClick() {
    setSharePost(true);
  }

  function handleSharePostClose() {
    setSharePost(false);
  }

  function handleChangeCaption(evt) {
    setChangedCaption(evt.target.value);
  }

  async function handlePost() {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/posts/`, {
        creatorId: props.currentUser._id,
        desc: changedCaption,
        post: props.post.url,
      });
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/timeline/${props.currentUser._id}`
      );
      props.setPostsArray(res.data.posts);
      setSharePost(false);
    } catch (err) {
      setError(err.response.data.message);
      setOpenSnackbar(true);
    }
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
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDeleteClick} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {/* dialog box for sharing same post */}
      <Dialog
        open={sharePost}
        onClose={handleSharePostClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Share Same Post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sharing same post, you can change the caption from here.
          </DialogContentText>
          <input
            type="text"
            className={classes.changedCaption}
            placeholder="Enter caption..."
            value={changedCaption ? changedCaption : ""}
            onChange={handleChangeCaption}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSharePostClose}>Cancel</Button>
          <Button onClick={handlePost} autoFocus>
            Post
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.profileImgContainer}>
            <Link to={`/profile/${creator.username}`} className={classes.name}>
              <img
                className={classes.profileImg}
                src={
                  creator.profilePicture && creator.profilePicture.url
                    ? `${creator.profilePicture.url}`
                    : `https://api.dicebear.com/5.x/avataaars/svg?seed=${creator.username}`
                }
                alt=""
              />
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
            <div className={classes.name_username}>
              <div>
                <Link
                  to={`/profile/${creator.username}`}
                  className={classes.name}
                >
                  {creator.name}
                </Link>
                <ReactTimeAgo
                  date={props.createdAt}
                  locale="en-US"
                  className={classes.xMinAgo}
                />
              </div>
              <Link
                to={`/profile/${creator.username}`}
                className={classes.username}
              >
                <i>@{creator.username}</i>
              </Link>
            </div>
            <div
              className={classes.iconContainer}
              style={{
                display:
                  creator._id === props.currentUser._id ? "flex" : "none",
              }}
            >
              <Link to={`/update/post/${props._id}`} className={classes.link}>
                <FaEdit className={classes.edit_delete_icon} title="Edit" />
              </Link>
              <MdDelete
                className={classes.edit_delete_icon}
                title="Delete"
                onClick={handleClickOpen}
              />
            </div>
          </div>
        </div>
        <div
          className={classes.postImg}
          style={{
            display: !props.post.url ? "none" : "block",
            background: props.post ? `url(${props.post.url})` : "null",
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
          }}
          onDoubleClick={handleLikeClick}
        ></div>
        <p
          className={classes.desc}
          style={{
            display: !props.desc ? "none" : "block",
          }}
        >
          {props.desc}
        </p>
        <div className={classes.btnContainer}>
          <div className={classes.btn}>
            <BsFillHeartFill
              className={classes.icon}
              title="LIKE"
              style={{
                color:
                  currentPost.likes.includes(props.currentUser._id) || liked
                    ? "tomato"
                    : "",
              }}
              onClick={handleLikeClick}
            />
            <FaCommentAlt
              className={classes.icon}
              title="COMMENT"
              style={{ color: showComments ? "#efce7b" : "" }}
              onClick={handleCommentClick}
            />
            <IoIosShare
              className={classes.icon}
              title="SHARE"
              onClick={handleShareClick}
            />
          </div>
          <div className={classes.like_comment_count}>
            <strong>
              {currentPost.likes.length ? currentPost.likes.length : null}
            </strong>
            {currentPost.likes.length ? " like(s)" : null}{" "}
            {currentPost.likes.length && (comments && comments.length) > 0
              ? "and "
              : null}
            <strong>
              {comments && comments.length > 0 ? comments.length : null}
            </strong>{" "}
            {comments && comments.length > 0 ? "comment(s)" : null}
          </div>
        </div>
        {showComments ? <Hdivider /> : null}
        <Comment
          showComments={showComments}
          comments={comments}
          currentUserId={props.currentUser._id}
          postId={currentPost._id}
          postComponentSetComments={setComments}
        />
      </div>
    </>
  );
};

export default Post;
