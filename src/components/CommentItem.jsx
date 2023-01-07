import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { useState } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ReactTimeAgo from "react-time-ago";

import Sizes from "../Sizes";

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
  },
  name_username: {
    display: "flex",
    flexDirection: "column",
    margin: ".5rem 1rem",
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
    display:'inline-block',
    width:'fit-content',
    "&:hover": {
      color: "black",
    },
    [Sizes.down("sm")]: {
      fontSize: ".7rem",
    },
  },
  desc: {
    margin: "0rem 1.3rem",
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
    [Sizes.down("sm")]: {
      flexDirection: "column",
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
  edit_delete_container:{
    width:'5rem',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [Sizes.down('sm')]:{
      margin: ".2rem 1.3rem",
      fontSize:'.8rem'
    }
  },
  edit_delete: {
    color: "var(--purple-2)",
  },
});

const CommentItem = (props) => {
  const classes = useStyles();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  function handleLikeClick() {
    setLiked((prevState) => !prevState);
    setDisliked(false);
  }
  function handleDislikeClick() {
    setDisliked((prevState) => !prevState);
    setLiked(false);
  }
  return (
    <div className={classes.container}>
      <div className={classes.name_text}>
        <div className={classes.name_username}>
          <div>
            <Link to={`/profile/${props.username}`} className={classes.name}>{props.name}</Link>
            <ReactTimeAgo
              date="31 jan 2004"
              locale="en-US"
              className={classes.xMinAgo}
            />
          </div>
          <Link to={`/profile/${props.username}`} className={classes.username}>
            <i>@{props.username}</i>
          </Link>
        </div>
        <div className={classes.descContainer}>
          <p className={classes.desc}>{props.text}</p>
          <div className={classes.edit_delete_container}>
            <Link className={classes.edit_delete}>Edit</Link>
            <Link className={classes.edit_delete}>Delete</Link>
          </div>
        </div>
      </div>
      <div className={classes.btns}>
        <div>
          <AiFillLike
            className={classes.icons}
            style={{ color: liked ? "var(--purple-1)" : "" }}
            onClick={handleLikeClick}
          />
          <AiFillDislike
            className={classes.icons}
            style={{ color: disliked ? "var(--purple-1)" : "" }}
            onClick={handleDislikeClick}
          />
        </div>
        <span style={{ fontSize: ".9rem" }}>
          <strong>{props.likes}</strong> likes
        </span>
      </div>
    </div>
  );
};

export default CommentItem;
