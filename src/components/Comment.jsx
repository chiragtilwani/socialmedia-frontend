import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import * as React from "react";

import CommentItem from "./CommentItem";
import Sizes from '../Sizes'

const useStyles = makeStyles({
  container: {
    width: "100%",
    overflowY: "scroll",
    transitionDuration: ".2s !important",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    maxHeight: "20rem",
    "&::-webkit-scrollbar": {
      width: ".25rem",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "white",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--purple-2)",
      borderRadius: "20rem",
      "&:hover": {
        backgroundColor: "var(--purple-1)",
      },
    },
    [Sizes.down('sm')]:{
      
    }
  },
  form: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textfield: {
    width: "80%",
    height: "4rem",
    backgroundColor: "var(--purple-3)",
    borderRadius: ".8rem",
    outline: "none",
    border: ".2rem solid var(--purple-2)",
    padding: "1rem",
    margin: ".2rem",
    [Sizes.down('sm')]:{
      height:'3rem'
    }
  },
  btn: {
    padding: ".5rem",
    height: "3rem",
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
});

const Comment = (props) => {
  const classes = useStyles();

  const [comments, setComments] = useState();
  const [error, setError] = useState();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    async function fetchComments() {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments/${props.postId}`
      );
      setComments(res.data);
    }
    fetchComments();
  }, [props.postId]);
  const text = useRef("");
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/comments/`, {
        text: text.current.value,
        userId: props.currentUserId,
        postId: props.postId,
      });
    } catch (err) {
      setError(err.response.data.message);
      setOpen(true);
    }
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments/${props.postId}`
      );
      setComments(res.data);
      props.postComponentSetComments(res.data);
      text.current.value = "";
    } catch (err) {
      setError(err.response.data.message);
      setOpen(true);
    }
  }
  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Stack>
      {comments ? (
        <div
          className={classes.container}
          style={{ height: props.showComments ? "fit-content" : "0rem" }}
        >
          <form className={classes.form} onSubmit={handleSubmit}>
            <input
              type="textfield"
              className={classes.textfield}
              placeholder="Drop a comment ..."
              ref={text}
            />
            <button className={classes.btn} type="submit">
              Comment
            </button>
          </form>
          {comments
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((comment) => (
              <CommentItem
                key={comment._id}
                {...comment}
                currentUserId={props.currentUserId}
                setComments={setComments}
                postComponentSetComments={props.postComponentSetComments}
              />
            ))}
        </div>
      ) : (
        <div
          className={classes.container}
          style={{ height: props.showComments ? "fit-content" : "0rem" }}
        >
          <form className={classes.form} onSubmit={handleSubmit}>
            <input
              type="textfield"
              className={classes.textfield}
              placeholder="Drop a comment ..."
              ref={text}
            />
            <button className={classes.btn} type="submit">
              Comment
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Comment;
