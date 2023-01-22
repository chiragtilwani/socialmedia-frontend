import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useEffect } from "react";

import CommentItem from "./CommentItem";

const useStyles = makeStyles({
  container: {
    width: "100%",
    overflowY: "scroll",
    transitionDuration: ".2s !important",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    maxHeight:'20rem',
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
  },
  btn: {
    padding: ".5rem",
    height:'3rem',
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

  const comments = props.comments
  return (
    <div
      className={classes.container}
      style={{ height: props.showComments ? "fit-content" : "0rem"}}
    >
      <form className={classes.form}>
        <input
          type="textfield"
          className={classes.textfield}
          placeholder="Drop a comment ..."
        />
        <button className={classes.btn}>Comment</button>
      </form>
      {comments.map((comment) => (
        <CommentItem key={comment._id} {...comment} />
      ))}
    </div> 
  );
};

export default Comment;
