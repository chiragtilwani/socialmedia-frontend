import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { useState } from "react";
const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
    padding: ".5rem 0rem",
    transitionDuration: ".2s",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "var(--purple-2)",
      "& $username": {
        color: "black",
      },
    },
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
      color: "black",
    },
  },
  desc: {
    margin: "0rem 1.3rem",
    fontSize: "1.1rem",
  },
  btns: {
    width: "5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    fontSize: "1.5rem",
    marginRight: ".2rem",
    flexDirection:'column'
  },
  icons: {
    cursor: "pointer",
    transitionDuration:'.2s',
    "&:hover": {
      transform: "scale(.8)",
    },
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
          <Link className={classes.name}>{props.name}</Link>
          <Link className={classes.username}>
            <i>@{props.username}</i>
          </Link>
        </div>
        <p className={classes.desc}>{props.text}</p>
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
        <span style={{fontSize:'.9rem'}}><strong>{props.likes}</strong> likes</span>
      </div>
    </div>
  );
};

export default CommentItem;
