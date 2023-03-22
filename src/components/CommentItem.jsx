import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { useEffect, useState } from "react";
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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { useSelector } from "react-redux";

import Sizes from "../Sizes";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
    padding: ".5rem 0rem",
    transitionDuration: ".2s",
    [Sizes.down("sm")]: {},
  },
  name_username: {
    display: "flex",
    flexDirection: "column",
    margin: ".5rem 1rem",
    [Sizes.down("sm")]: {
      margin: ".2rem .5rem",
    },
  },
  name: {
    fontWeight: "bold",
    textTransform: "capitalize",
    cursor: "pointer",
    textDecoration: "none",
    color: "black",
    [Sizes.down("sm")]: {
      fontSize: ".9rem",
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
    display: "inline-block",
    width: "fit-content",
    "&:hover": {
      color: "black",
    },
    [Sizes.down("sm")]: {
      fontSize: ".7rem",
    },
  },
  desc: {
    fontSize: "1.1rem",
    [Sizes.down("sm")]: {
      fontSize: ".8rem",
    },
  },
  btns: {
    width: "5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    fontSize: "1.5rem",
    marginRight: ".2rem",
    flexDirection: "column",
  },
  icons: {
    cursor: "pointer",
    transitionDuration: ".2s",
    "&:hover": {
      transform: "scale(.8)",
    },
  },
  descContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "1rem",
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
  edit_delete_container: {
    width: "5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [Sizes.down("sm")]: {
      width: "4rem",
      margin: ".2rem 0rem",
      fontSize: ".8rem",
    },
  },
  edit_delete: {
    color: "var(--purple-2)",
  },
  textfield: {
    width: "75%",
    height: "2.5rem",
    backgroundColor: "var(--purple-3)",
    borderRadius: ".5rem",
    outline: "none",
    border: ".2rem solid var(--purple-2)",
    padding: "1rem",
    margin: ".2rem",
    [Sizes.down("sm")]: {
      width: "70%",
    },
    [Sizes.down("xs")]: {
      width: "65%",
    },
  },
  btn: {
    padding: ".5rem",
    height: "2rem",
    cursor: "pointer",
    backgroundColor: "var(--purple-1)",
    color: "white",
    outline: "none",
    borderRadius: ".5rem",
    fontWeight: "bold",
    borderWidth: "0rem",
    "&:hover": {
      opacity: ".5",
    },
  },
  accountDeletedName:{
    color:'red',
    textDecoration:'none',
    fontWeight:'bold',
  }

});

const CommentItem = (props) => {
  const classes = useStyles();
  const [creator, setCreator] = useState({});
  const [currentComment, setCurrentComment] = useState(props);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.text);

  const { user } = useSelector((state) => state.auth);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    const fetchCreator = async () => {
      let res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users?userId=${props.creatorId}`
      );
      setCreator(res.data);
    };
    fetchCreator();
  }, [props.creatorId]);

  async function handleLikeClick() {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/comments/${props._id}/likedislike`,
        {
          userId: props.currentUserId,
        }
      );
    } catch (err) {
      setError(err.response.data.message);
      setSnackbarOpen(true);
    }
    try {
      let res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments/${props.postId}`
      );
      props.setComments(res.data);
    } catch (err) {
      setError(err.response.data.message);
      setSnackbarOpen(true);
    }
  }

  async function deleteComment() {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/comments/${props._id}`,
        {
          data: { userId: props.currentUserId },
          headers: {
            authorization: "Bearer " + user.token,
          },
        }
      );
    } catch (e) {
      setError(e.response.data.message);
      setSnackbarOpen(true);
    }
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments/${props.postId}`
      );
      props.setComments(res.data);
      props.postComponentSetComments(res.data);
    } catch (e) {
      props.setComments(null);
      props.postComponentSetComments(null);
    }
    setOpen(false);
  }

  async function updateComment(evt) {
    evt.preventDefault();
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/comments/${props._id}`,
        { userId: user._id, text: editedText },
        {
          headers: {
            authorization: "Bearer " + user.token,
          },
        }
      );
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments/${props.postId}`
      );
      props.postComponentSetComments(res.data);
      setCurrentComment({ ...props, text: editedText });
      setEditing(false);
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleEditClick() {
    setEditing(true);
  }

  function handleCancelClick(evt) {
    evt.preventDefault();
    setEditing(false);
  }

  function handleCommentTextChange(evt) {
    setEditedText(evt.target.value);
  }

  if (creator.username) {
    return (
      <>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
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
          <DialogTitle id="alert-dialog-title">{"Delete Comment?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are going to delete this comment.
              <br />
              Are you sure ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={deleteComment} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <div
          className={classes.container}
          style={{
            display: editing ? "flex" : "none",
            justifyContent: "space-evenly",
          }}
        >
          <input
            type="textfield"
            className={classes.textfield}
            placeholder="Drop a comment ..."
            value={editedText}
            onChange={handleCommentTextChange}
          />
          <button onClick={handleCancelClick} className={classes.btn}>
            Cancel
          </button>
          <button className={classes.btn} onClick={updateComment}>
            Edit
          </button>
        </div>
        <div
          className={classes.container}
          style={{ display: !editing ? "flex" : "none" }}
        >
          <div className={classes.name_text}>
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
            <div className={classes.descContainer}>
              <p className={classes.desc}>{currentComment.text}</p>
              <div
                className={classes.edit_delete_container}
                style={{
                  display:
                    props.creatorId === props.currentUserId ? "flex" : "none",
                }}
              >
                <Link className={classes.edit_delete} onClick={handleEditClick}>
                  Edit
                </Link>
                <Link className={classes.edit_delete} onClick={handleClickOpen}>
                  Delete
                </Link>
              </div>
            </div>
          </div>
          <div className={classes.btns}>
            <div>
              <AiFillLike
                className={classes.icons}
                style={{
                  color: props.likes.includes(props.currentUserId)
                    ? "var(--purple-1)"
                    : "",
                }}
                onClick={handleLikeClick}
              />
            </div>
            <span style={{ fontSize: ".9rem" }}>
              <strong>
                {props.likes.length === 0 ? null : props.likes.length}
              </strong>{" "}
              {props.likes.length === 0 ? null : "likes"}
            </span>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <Alert
              onClose={handleSnackbarClose}
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
          <DialogTitle id="alert-dialog-title">{"Delete Comment?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You are going to delete this comment.
              <br />
              Are you sure ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={deleteComment} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <div
          className={classes.container}
          style={{
            display: editing ? "flex" : "none",
            justifyContent: "space-evenly",
          }}
        >
          <input
            type="textfield"
            className={classes.textfield}
            placeholder="Drop a comment ..."
            value={editedText}
            onChange={handleCommentTextChange}
          />
          <button onClick={handleCancelClick} className={classes.btn}>
            Cancel
          </button>
          <button className={classes.btn} onClick={updateComment}>
            Edit
          </button>
        </div>
        <div
          className={classes.container}
          style={{ display: !editing ? "flex" : "none" }}
        >
          <div className={classes.name_text}>
            <div className={classes.name_username}>
              <div>
                <Link
                  to={`/profile/${creator.username}`}
                  className={classes.accountDeletedName}
                >
                  Account Deleted
                </Link>
                <ReactTimeAgo
                  date={props.createdAt}
                  locale="en-US"
                  className={classes.xMinAgo}
                />
              </div>
            </div>
            <div className={classes.descContainer}>
              <p className={classes.desc}>{currentComment.text}</p>
              <div
                className={classes.edit_delete_container}
                style={{
                  display:
                    props.creatorId === props.currentUserId ? "flex" : "none",
                }}
              >
                <Link className={classes.edit_delete} onClick={handleEditClick}>
                  Edit
                </Link>
                <Link className={classes.edit_delete} onClick={handleClickOpen}>
                  Delete
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default CommentItem;
