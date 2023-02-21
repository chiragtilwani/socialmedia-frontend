import { makeStyles } from "@mui/styles";
import { BsFillHeartFill } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { IoIosShare } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Comment from "./Comment";
import noAvatar from "../assets/noAvatar.png";
import Sizes from "../Sizes";
import Hdivider from "./Hdivider";
import Loading from "./Loading";

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
    height: "25rem",
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
    "&:active": {
      transform: "scale(.5)",
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
    transitionDuration: ".2s",
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
    marginRight: "1rem",
  },
  profileImg: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
  },
  changedCaption: {
    outline: "none",
    borderColor: "var(--purple-2)",
    marginTop: ".7rem",
    width: "100%",
    height: "2rem",
    borderRadius: ".5rem",
    padding: ".5rem",
  },
});
const Post = (props) => {
  const classes = useStyles();
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [creator, setCreator] = useState({});
  const [comments, setComments] = useState([]);
  const [nLikes, setNlikes] = useState(props.likes.length);
  const [open, setOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(props);
  const [sharePost, setSharePost] = useState(false);
  const [changedCaption, setChangedCaption] = useState(props.desc);

  // console.log(props)
  useEffect(() => {
    const fetchCreatorAndComment = async () => {
      let res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users?userId=${currentPost.creatorId}`
      );
      setCreator(res.data);

      res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments/${currentPost._id}`
      );
      setComments(res.data);
    };
    fetchCreatorAndComment();
  }, [currentPost.creatorId, currentPost._id]);

  async function handleLikeClick() {
    setLiked((prevProp) => !prevProp);
    await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/posts/${currentPost._id}/likedislike`,
      { userId: props.currentUser._id }
    );
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/posts/${currentPost._id}`
    );
    setCurrentPost(res.data);
    //  res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users?userId=${currentPost.creatorId}`)
  }
  function handleCommentClick() {
    setShowComments((prevProp) => !prevProp);
  }

  console.log(props.currentUser._id + " " + creator._id);
  async function handleDeleteClick() {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${props._id}`,
        { data: { userId: props.currentUser._id } }
      );
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/timeline/${props.currentUser._id}`
      );
      props.setPostsArray(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleShareClick() {
    setSharePost(true);
  }

  function handleSharePostClose() {
    setSharePost(false);
  }
  function handleChangeCaption(evt) {
    setChangedCaption(evt.target.value);
  }
  async function handlePost() {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/posts/`, {
      creatorId: props.currentUser._id,
      desc: changedCaption,
      post: props.post.url,
    });
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/posts/timeline/${props.currentUser._id}`
    );
    props.setPostsArray(res.data);
    setSharePost(false);
  }
  console.log(changedCaption);
  return (
    <>
      {/* diaglog box for delete post */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are going to delete this post permanently.
            <br />
            Are you sure ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDeleteClick} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {/* dialog box for sharing same post */}
      <Dialog
        open={sharePost}
        onClose={handleSharePostClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Share Same Post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sharing same post, you can change the caption from here.
          </DialogContentText>
          <input
            type="text"
            className={classes.changedCaption}
            placeholder="Enter caption..."
            value={changedCaption ? changedCaption : ""}
            onChange={handleChangeCaption}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSharePostClose}>Cancel</Button>
          <Button onClick={handlePost} autoFocus>
            Post
          </Button>
        </DialogActions>
      </Dialog>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.profileImgContainer}>
            <Link to={`/profile/${creator.username}`} className={classes.name}>
              <img
                className={classes.profileImg}
                src={
                  props.profilePicture
                    ? `${props.profilePicture.url}`
                    : `${noAvatar}`
                }
                alt=""
              />
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "90%",
            }}
          >
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
            <div
              className={classes.iconContainer}
              style={{
                display:
                  creator._id === props.currentUser._id ? "flex" : "none",
              }}
            >
              <Link to="/update/post/1" className={classes.link}>
                <FaEdit className={classes.edit_delete_icon} title="Edit" />
              </Link>
              {/*here instead of 1 in 'to' attribute post id must come*/}
              <MdDelete
                className={classes.edit_delete_icon}
                title="Delete"
                onClick={handleClickOpen}
              />
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
          onDoubleClick={handleLikeClick}
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
              style={{
                color: currentPost.likes.includes(props.currentUser._id)
                  ? "tomato"
                  : "",
              }}
              onClick={handleLikeClick}
            />
            {/*will make tile dynamic like/unlike*/}
            <FaCommentAlt
              className={classes.icon}
              title="COMMENT"
              style={{ color: showComments ? "#efce7b" : "" }}
              onClick={handleCommentClick}
            />
            <IoIosShare
              className={classes.icon}
              title="SHARE"
              onClick={handleShareClick}
            />
          </div>
          <div className={classes.like_comment_count}>
            <strong>
              {currentPost.likes.length ? currentPost.likes.length : null}
            </strong>
            {currentPost.likes.length ? " like(s)" : null}{" "}
            {currentPost.likes.length && (comments && comments.length) > 0
              ? "and "
              : null}
            <strong>
              {comments && comments.length > 0 ? comments.length : null}
            </strong>{" "}
            {comments && comments.length > 0 ? "comment(s)" : null}
          </div>
        </div>
        {showComments ? <Hdivider /> : null}
        <Comment
          showComments={showComments}
          comments={comments}
          currentUserId={props.currentUser._id}
          postId={currentPost._id}
          postComponentSetComments={setComments}
        />
      </div>
    </>
  );
};

export default Post;
