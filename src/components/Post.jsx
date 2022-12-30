import { makeStyles } from "@mui/styles";
import { BsFillHeartFill } from "react-icons/bs";
import { FaCommentAlt } from "react-icons/fa";
import { IoIosShare } from "react-icons/io";
import { Link } from "react-router-dom";
import {useState} from 'react'

import Comment from './Comment';

const useStyles = makeStyles({
  container: {
    width: "100%",
    borderRadius: ".5rem",
    backgroundColor: "white",
    margin: "2rem 0rem",
    padding:'.5rem 0rem',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
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
    fontSize:'1.1rem'
  },
  btnContainer: {
    margin: ".8rem",
    display: "flex",
    alignItems: "center",
  },
  btn:{
    marginRight: ".5rem",
  },
  icon:{
    margin:'0rem .4rem',
    fontSize: '1.4rem',
    cursor:'pointer',
    transitionDuration:".2s",
    '&:hover':{
      transform:'scale(.8)'
    }
  },
  like_comment_count:{
    fontSize:'.9rem',
  },
  Hdivider: {
    width: "100%",
    height: ".2rem",
    backgroundColor: "var(--purple-3)",
  },
});
const Post = (props) => {
  const classes = useStyles();

  const [liked,setLiked]=useState(false)
  const [showComments,setShowComments]=useState(false)


  function handleLikeClick(){
    setLiked(prevProp=>!prevProp)
  }
  function handleCommentClick(){
    setShowComments(prevProp=>!prevProp)
  }
  return (
    <div className={classes.container}>
      <div className={classes.name_username}>
        <Link className={classes.name}>{props.name}</Link>
        <Link className={classes.username}><i>@{props.username}</i></Link>
      </div>
      <div
        className={classes.postImg}
        style={{
          background: `url(${props.postImg})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          display:!props.postImg?'none':'block'
        }}
      ></div>
      <p className={classes.desc}>{props.desc}</p>
      <div className={classes.btnContainer}>
        <div className={classes.btn}>
          <BsFillHeartFill
            className={classes.icon}
            title="LIKE"
            style={{color:liked?'tomato':''}}
            onClick={handleLikeClick}
            />
          {/*will make tile dynamic like/unlike*/}
          <FaCommentAlt
            className={classes.icon}
            title="COMMENT"
            style={{color:showComments?'#efce7b':''}}
            onClick={handleCommentClick}
          />
          <IoIosShare
            className={classes.icon}
            title="SHARE"
          />
        </div>
        <div className={classes.like_comment_count}>
          <strong>{props.likes}</strong> likes and <strong>455</strong> comments
        </div>
      </div>
      <div className={classes.Hdivider} style={{display:showComments?'block':'none'}}></div>
      <Comment showComments={showComments}/>
    </div>
  );
};

export default Post;
