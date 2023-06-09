import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Link } from "react-router-dom";
import axios from "axios";

import Sizes from "../Sizes";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "var(--bg)",
    color: "var(--text1)",
    border: ".1rem solid",
    borderLeft: 0,
    borderRight: 0,
    cursor: "pointer",
    transitionDuration: ".2s",
    textDecoration: "none",
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
    color: "var(--text1)",
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
  deletedAccountName: {
    fontWeight: "bold",
    textDecoration: "none",
    color: "red",
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
      if (res) {
        setUser(res.data);
      }
    };
    getUser();
  }, [props.userId]);

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
    if (props.setPosts) {
      props.setPosts(res.data.posts);
    }
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
    if (props.setPosts) {
      props.setPosts(res.data.posts);
    }
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
              : `https://api.dicebear.com/5.x/avataaars/svg?seed=${user.username}`
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
              : `https://api.dicebear.com/5.x/avataaars/svg?seed=${user.username}`
          }
          alt=""
        />
      </div>
      <div className={classes.name_username}>
        {user.username ? (
          <>
            <Link to={`/profile/${user.username}`} className={classes.name}>
              {user.name}
            </Link>
            <Link to={`/profile/${user.username}`} className={classes.username}>
              {user.username}
            </Link>
          </>
        ) : (
          <Link
            to={`/profile/${user.username}`}
            className={classes.deletedAccountName}
          >
            Account Deleted
          </Link>
        )}
      </div>
      {props.currentUser.followings.includes(props.userId) ? (
        props.userId === props.currentUser._id || !user.username ? (
          <div style={{ width: "4rem" }}></div>
        ) : (
          <button className={classes.btn} onClick={handleUnfollowClick}>
            Unfollow
          </button>
        )
      ) : props.userId === props.currentUser._id || !user.username ? (
        <div style={{ width: "4rem" }}></div>
      ) : (
        <button className={classes.btn} onClick={handleFollowClick}>
          Follow
        </button>
      )}
    </div>
  );
};

export default UserListItem;
