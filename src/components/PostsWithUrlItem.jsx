import { makeStyles } from "@mui/styles";
import { useState } from "react";
import axios from "axios";


const useStyles = makeStyles({
  container: {
    width: "32.666%",
    boxShadow: "0rem 0rem .5rem .05rem var(--purple-2)",
    cursor: "pointer",
    overflow: "hidden",
    borderRadius: ".5rem",
  },
  postImg: {
    objectFit: "fill",
    width: "100%",
    height: "100%",
    transitionDuration: ".5s",
    "&:hover": {
      filter: "grayscale(100%)",
      transform: "scale(1.1)",
    },
  },
});

function PostsWithUrlItem(props) {
  const classes = useStyles();
  const handleToggle = () => {
    props.handleSetBackdropPost(props,true)
  };

  return (
    <>
      <div className={classes.container} onClick={handleToggle}>
        <img src={props.post.url} className={classes.postImg} alt="" />
      </div>
    </>
  );
}

export default PostsWithUrlItem;
