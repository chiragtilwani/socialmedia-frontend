import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import noAvatar from "../assets/noAvatar.png";

import Sizes from "../Sizes";
import { Link } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "white",
    border: ".1rem solid",
    borderLeft: 0,
    borderRight: 0,
    cursor: "pointer",
    transitionDuration: ".2s",
    textDecoration: "none",
    color: "black",
    width: "100%",
    height: "4rem",
  },
  profileImgContainer: {
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    border: ".2rem solid var(--purple-1)",
    overflow: "hidden",
    marginLeft: ".2rem",
  },
  profileImg: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
  },
  name_username: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "50%",
    margin: "0rem .2rem",
    [Sizes.down("lg")]: {
      fontSize: ".8rem",
    },
  },
  name: {
    marginBottom: ".1rem",
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "black",
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textDecoration: "none",
  },
  username: {
    color: "var(--purple-2)",
    fontWeight: "bold",
    transitionDuration: ".2s",
    cursor: "pointer",
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textDecoration: "none",
  },
  btn: {
    padding: ".5rem",
    backgroundColor: "var(--purple-1)",
    color: "white",
    borderRadius: ".3rem",
    outline: "none",
    border: "none",
    "&:hover": {
      opacity: ".8",
      cursor: "pointer",
    },
  },
  profileOverlay: {
    width: "50%",
    height: "80vh",
  },
});

const UserListItem = (props) => {
  const classes = useStyles();
  const [profileClick, setProfileClick] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users?userId=${props.userId}`
      );
      setUser(res.data);
    };
    getUser();
  }, [props.userId]);
  console.log(user);

  function handleProfileClick() {
    setProfileClick((prevState) => !prevState);
  }

  async function handleFollowClick(e) {
    e.preventDefault();
    await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/users/${props.userId}/follow`,
      { userId: props.currentUser._id }
    );
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/posts/timeline/${props.currentUser._id}`
    );
    props.setPosts(res.data);
    res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users?userId=${props.currentUser._id}`
    );
    props.setuser(res.data);
    if (props.setfriendSuggestion) {
      props.setfriendSuggestion(
        res.data.followers.filter((id) => !res.data.followings.includes(id))
      );
    }
  }
  async function handleUnfollowClick(e) {
    e.preventDefault();
    await axios.patch(
      `${process.env.REACT_APP_BASE_URL}/users/${props.userId}/unfollow`,
      { userId: props.currentUser._id }
    );
    let res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/posts/timeline/${props.currentUser._id}`
    );
    props.setPosts(res.data);
    res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users?userId=${props.currentUser._id}`
    );
    props.setuser(res.data);
    if (props.setfriendSuggestion) {
      props.setfriendSuggestion(
        res.data.followers.filter((id) => !res.data.followings.includes(id))
      );
    }
  }

  return (
    <div className={classes.container}>
      {console.log(props)}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={profileClick}
        onClick={handleProfileClick}
      >
        <img
          className={classes.profileOverlay}
          src={
            user.profilePicture && user.profilePicture.url
              ? `${user.profilePicture.url}`
              : `${noAvatar}`
          }
          alt=""
        />
      </Backdrop>
      <div className={classes.profileImgContainer} onClick={handleProfileClick}>
        <img
          className={classes.profileImg}
          src={
            user.profilePicture && user.profilePicture.url
              ? `${user.profilePicture.url}`
              : `${noAvatar}`
          }
          alt=""
        />
      </div>
      <div className={classes.name_username}>
        <Link to={`/profile/${user.username}`} className={classes.name}>
          {user.name}
        </Link>
        <Link to={`/profile/${user.username}`} className={classes.username}>
          {user.username}
        </Link>
      </div>
      {props.currentUser.followings.includes(props.userId) ? (
        props.userId === props.currentUser._id ? null : (
          <button className={classes.btn} onClick={handleUnfollowClick}>
            Unfollow
          </button>
        )
      ) : props.userId === props.currentUser._id ? null : (
        <button className={classes.btn} onClick={handleFollowClick}>
          Follow
        </button>
      )}
      {/*later we will dynamically change this button's text to follow/following based on if current user's following list have this user or not*/}
      {/* if it is following then on clicking this button we will alert user with msg 'if you change your mind,you'll have to request to follow username_of_user_we_are_unfollowing again. */}
    </div>
  );
};

export default UserListItem;
