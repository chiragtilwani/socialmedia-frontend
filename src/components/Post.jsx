import { makeStyles } from "@mui/styles";
import { BsFillHeartFill } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { IoIosShare } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState, useEffect  } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";

import Comment from "./Comment";
import noAvatar from '../assests/noAvatar.png'
import Sizes from "../Sizes";
import Hdivider from "./Hdivider";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const useStyles = makeStyles({
  container: {
    width: "100%",
    borderRadius: ".5rem",
    backgroundColor: "white",
    marginBottom: "2rem",
    padding: ".5rem 0rem",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    "&:hover": {
      "& $iconContainer": {
        transform: "scale(1)",
      },
    },
  },
  header: {
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",
    margin: ".5rem 1rem",
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
    [Sizes.down("md")]: {
      fontSize: "1.5rem",
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
  },
  iconContainer: {
    width: "4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: "1.5rem",
    transform: "scale(0)",
    transitionDuration:'.2s'
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
    color: "black",
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
    marginRight:'1rem'
  },
  profileImg: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
  },
});
const Post = (props) => {
  const classes = useStyles();
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [creator, setCreator] = useState({});
  const [comments, setComments] = useState([]);
  const [nLikes,setNlikes]=useState(props.likes.length)
  useEffect(() => {
    const fetchCreatorAndComment = async () => {
      let res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users?userId=${props.creatorId}`
      );
      setCreator(res.data);

      res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments/${props._id}`
      );
      setComments(res.data);
    };
    fetchCreatorAndComment();
  }, [props.creatorId,props._id]);
  
  async function handleLikeClick() {
    setLiked((prevProp) => !prevProp);
    await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${props._id}/likedislike`,{userId:props.currentUser._id})
    setNlikes(props.likes.lengthnLikes)
  }
  function handleCommentClick() {
    setShowComments((prevProp) => !prevProp);
  }

  async function handleDoubleClick() {
    setLiked((prevProp) => !prevProp);
    await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${props._id}/likedislike`,{userId:props.currentUser._id})
    setNlikes(props.likes.lengthnLikes)
  }
  return (
    <div className={classes.container} onDoubleClick={handleDoubleClick}>
      <div className={classes.header}>
        <div
          className={classes.profileImgContainer}
        >
          <img
            className={classes.profileImg}
            src={
              props.profilePicture
                ? `${props.profilePicture.url}`
                : `${noAvatar}`
            }
            alt=""
          />
        </div>
        <div style={{display: 'flex', alignItems: 'center',justifyContent: 'space-between',width:'90%'}}>
        <div className={classes.name_username}>
          <div>
            <Link to={`/profile/${creator.username}`} className={classes.name}>
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
        <div className={classes.iconContainer}>
          <Link to="/update/post/1" className={classes.link}>
            <FaEdit className={classes.edit_delete_icon} title="Edit" />
          </Link>
          {/*here instead of 1 in 'to' attribute post id must come*/}
          <MdDelete className={classes.edit_delete_icon} title="Delete" />
        </div>
        </div>
      </div>
      {/* {content} */}
      <div
        className={classes.postImg}
        style={{
          display: !props.post.url ? "none" : "block",
          background: props.post ? `url(${props.post.url})` : "null",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
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
            style={{ color: props.likes.includes(props._id) ? "tomato" : "" }}
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
          <strong>
            {nLikes === 0 ? null : nLikes}
          </strong>
          {nLikes === 0 ? null : " like(s)"}{" "}{comments.length === 0 ? null : "and "}
          <strong>{comments.length === 0 ? null : comments.length}</strong>{" "}
          {comments.length===0 ?null : "comment(s)" }
        </div>
      </div>
      {showComments ? <Hdivider /> : null}
      <Comment showComments={showComments} comments={comments}/>
    </div>
  );
};

export default Post;
