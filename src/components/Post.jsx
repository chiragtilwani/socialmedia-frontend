import { makeStyles } from "@mui/styles";
import { BsFillHeartFill } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { IoIosShare } from "react-icons/io";
import { Link } from "react-router-dom";
import { useState } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ReactTimeAgo from "react-time-ago";

import Comment from "./Comment";
import video from "../video.mp4";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const useStyles = makeStyles({
  container: {
    width: "100%",
    borderRadius: ".5rem",
    backgroundColor: "white",
    margin: "2rem 0rem",
    padding: ".5rem 0rem",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
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
  postImg: {
    width: "95%",
    height: "15rem",
    margin: "1rem auto",
    borderRadius: ".6rem",
  },
  desc: {
    margin: "0rem 1.3rem",
    fontSize: "1.1rem",
  },
  btnContainer: {
    margin: ".8rem",
    display: "flex",
    alignItems: "center",
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
    "&:hover": {
      transform: "scale(.8)",
    },
  },
  like_comment_count: {
    fontSize: ".9rem",
  },
  Hdivider: {
    width: "100%",
    height: ".2rem",
    backgroundColor: "var(--purple-3)",
  },
  xMinAgo: {
    marginLeft: ".5rem",
    fontSize: ".8rem",
    color: "var(--purple-2)",
    fontWeight: "bold",
  },
});
const Post = (props) => {
  const classes = useStyles();

  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  function handleLikeClick() {
    setLiked((prevProp) => !prevProp);
  }
  function handleCommentClick() {
    setShowComments((prevProp) => !prevProp);
  }

  function handleDoubleClick(){
    setLiked((prevProp) => !prevProp);
  }

  let content;
  if (typeof(props.postImg)==='object') {
    content = <div className={classes.postImg}><video src={props.postImg.video} controls width='100%' height='100%' /></div>;
  } else {
    content = (
      <div
        className={classes.postImg}
        style={{
          background: `url(${props.postImg})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          display: !props.postImg ? "none" : "block",
        }}
      ></div>
    );
  }
  console.log(typeof(props.postImg))
  return (
    <div className={classes.container} onDoubleClick={handleDoubleClick}>
      <div className={classes.name_username}>
        <div>
          <Link className={classes.name}>{props.name}</Link>
          <ReactTimeAgo
            date="31 jan 2004"
            locale="en-US"
            className={classes.xMinAgo}
          />
        </div>
        <Link className={classes.username}>
          <i>@{props.username}</i>
        </Link>
      </div>
      {content}
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
            style={{ color: liked ? "tomato" : "" }}
            onClick={handleLikeClick}
          />
          {/*will make tile dynamic like/unlike*/}
          <FaCommentAlt
            className={classes.icon}
            title="COMMENT"
            style={{ color: showComments ? "#efce7b" : "" }}
            onClick={handleCommentClick}
          />
          <IoIosShare className={classes.icon} title="SHARE" />
        </div>
        <div className={classes.like_comment_count}>
          <strong>{props.likes}</strong> likes and <strong>455</strong> comments
        </div>
      </div>
      <div
        className={classes.Hdivider}
        style={{ display: showComments ? "block" : "none" }}
      ></div>
      <Comment showComments={showComments} />
    </div>
  );
};

export default Post;
