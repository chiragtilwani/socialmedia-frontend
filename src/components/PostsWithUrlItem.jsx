import { makeStyles } from "@mui/styles";
import Backdrop from "@mui/material/Backdrop";
import { useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

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

function PostsWithUrlItem(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  console.log(props);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

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
          <img src={props.post.url} className={classes.overlayPostImg} alt="" />
          {props.desc ? <p className={classes.desc}>{props.desc}</p> : null}
          <ReactTimeAgo
            date={props.updatedAt}
            locale="en-US"
            className={classes.xMinAgo}
          />
        </div>
      </Backdrop>
      <div className={classes.container} onClick={handleToggle}>
        <img src={props.post.url} className={classes.postImg} alt="" />
      </div>
    </>
  );
}

export default PostsWithUrlItem;
