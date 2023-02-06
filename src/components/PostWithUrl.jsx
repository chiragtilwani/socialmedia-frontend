import { useState } from "react";
import { makeStyles } from "@mui/styles";
import Backdrop from "@mui/material/Backdrop";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ReactTimeAgo from "react-time-ago";

import PostsWithUrlItem from "./PostsWithUrlItem";

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
    // minHeight:'25rem'
  },
  innerContainer: {
    display: "flex",
    flexWrap: "wrap",
    gridTemplateColumns: "4fr 4fr 4fr",
    columnGap: "1%",
    rowGap: ".5rem",
    padding: ".5rem",
    width: "100%",
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
  },
  overlayPostImg: {
    width: "100%",
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
  const [backdropPost, setBackdropPost] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  function handleSetBackdropPost(post,openBackdrop) {
    setBackdropPost(post);
    setOpen(openBackdrop)
  }

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div className={classes.overlayPost}>
          <div className={classes.delete_edit}>
            <FaEdit />
            <MdDelete />
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
          {props.posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => (
            <PostsWithUrlItem
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
