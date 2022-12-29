import { makeStyles } from "@mui/styles";
import { AiOutlineHeart } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { IoIosShare } from "react-icons/io";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    width: "100%",
    border: ".2rem solid",
    borderRadius: ".5rem",
    backgroundColor: "white",
    margin: "2rem 0rem",
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
    cursor:'pointer'
  },
  like_comment_count:{
    fontSize:'.9rem',
  }
});
const Post = (props) => {
  const classes = useStyles();
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
        }}
      ></div>
      <p className={classes.desc}>{props.desc}</p>
      <div className={classes.btnContainer}>
        <div className={classes.btn}>
          <AiOutlineHeart
            className={`${classes.icon} ${classes.heart}`}
            title="LIKE"
          />
          {/*will make tile dynamic like/unlike*/}
          <BiCommentDetail
            className={`${classes.icon} ${classes.heart}`}
            title="COMMENT"
          />
          <IoIosShare
            className={`${classes.icon} ${classes.heart}`}
            title="SHARE"
          />
        </div>
        <div className={classes.like_comment_count}>
          <strong>{props.likes}</strong> likes and <strong>455</strong> comments
        </div>
      </div>
    </div>
  );
};

export default Post;
