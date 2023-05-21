import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BsList } from "react-icons/bs";
import { BsGrid3X3 } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";

import UploadPost from "../components/UploadPost";
import UsersList from "../components/UsersList";
import Post from "../components/Post";
import Sizes from "../Sizes";
import BottomNavbar from "../components/navbar/BottomNavbar";
import noCover from "../assets/noCover.png";
import PostWithUrl from "../components/PostWithUrl";

const useStyles = makeStyles({
  outterContainer: {
    backgroundColor: "var(--purple-3)",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
  container: {
    width: "100vw",
    height: "100vh",
    display: "grid",
    gridTemplateColumns: "1.5fr 4fr",
    overflowY: "scroll",
    marginTop: "3rem",
    backgroundColor: "var(--purple-3)",
    "&::-webkit-scrollbar": {
      width: ".25rem",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "var(--purple-3)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--purple-2)",
      borderRadius: "20rem",
      "&:hover": {
        backgroundColor: "var(--purple-1)",
      },
    },
    [Sizes.up("xl")]: {
      width: "80%",
      margin: "auto",
    },
    [Sizes.down("md")]: {
      gridTemplateColumns: "1fr",
    },
  },
  left: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "4rem 0rem 3rem 0rem",
    height: "100vh",
    overflowY: "scroll",
    backgroundColor: "var(--purple-3)",
    "&::-webkit-scrollbar": {
      width: ".25rem",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "var(--purple-3)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--purple-2)",
      borderRadius: "20rem",
      "&:hover": {
        backgroundColor: "var(--purple-1)",
      },
    },
    [Sizes.down("md")]: {
      display: "none",
    },
    [Sizes.up("xl")]: {
      padding: "8rem 0rem 3rem 0rem",
    },
  },
  right: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: ".25rem",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "var(--purple-3)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--purple-2)",
      borderRadius: "20rem",
      "&:hover": {
        backgroundColor: "var(--purple-1)",
      },
    },
  },
  h2: {
    marginTop: "2rem",
    textTransform: "capitalize",
    fontWeight: "bold",
    color: "var(--purple-1)",
  },
  infoContainer: {
    backgroundColor: "var(--bg)",
    color: "var(--text1)",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    width: "100%",
  },
  coverPic: {
    width: "100%",
    height: "20rem",
    cursor: "pointer",
    transitionDuration: ".2s",
    objectFit: "fill",
    [Sizes.up("xl")]: {
      height: "25rem",
    },
    [Sizes.down("sm")]: {
      height: "15rem",
    },
    [Sizes.down("xs")]: {
      height: "10rem",
    },
  },
  profileContainer: {
    [Sizes.down("sm")]: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  profilePic: {
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
    border: ".2rem solid var(--purple-1)",
    transform: "translateY(-50%)",
    boxShadow: "0rem 0rem .5rem .05rem var(--purple-2)",
    marginLeft: "2rem",
    cursor: "pointer",
    backgroundColor: "var(--bg)",
    color: "var(--text1)",
    [Sizes.down("sm")]: {
      margin: "0rem",
      marginBottom: ".5rem",
      width: "4rem",
      height: "4rem",
    },
  },
  details: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: ".5rem",
    marginTop: "-2rem",
    [Sizes.down("sm")]: {
      alignItems: "center",
    },
  },
  name: {
    textTransform: "capitalize",
    fontWeight: "bolder",
    fontSize: "1.2rem",
  },
  username: {
    marginLeft: ".5rem",
    color: "var(--purple-2)",
    fontWeight: "bold",
    transitionDuration: ".2s",
    cursor: "pointer",
    "&:hover": {
      color: "var(--text1)",
      cursor: "default",
    },
    [Sizes.down("sm")]: {
      marginLeft: "0rem",
    },
  },
  p: {
    width: "100%",
    wordBreak: "break-word",
    margin: ".5rem 0rem 2rem 0rem",
  },
  followers_following_counters: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "50%",
    margin: "0 auto",
    borderTop: ".2rem solid var(--purple-2)",
    borderBottom: ".2rem solid var(--purple-2)",
    [Sizes.down("sm")]: {
      width: "80%",
    },
  },
  innerDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  upperSpan: {
    fontWeight: "bold",
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "1rem 0 .5rem 0",
  },
  btn: {
    width: "7rem",
    height: "2.5rem",
    backgroundColor: "var(--purple-1)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: ".2rem",
    outline: "none",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    "&:hover": {
      opacity: 0.8,
    },
    [Sizes.down("sm")]: {
      fontSize: ".8rem",
      width: "5rem",
    },
  },
  postContainer: {
    width: "90%",
    marginBottom: "2rem",
    [Sizes.down("md")]: {
      paddingBottom: "2rem",
    },
    [Sizes.down("sm")]: {
      width: "100%",
    },
  },
  profileCoverOverlay: {
    [Sizes.down("md")]: {
      width: "80vw",
    },
    [Sizes.down("sm")]: {
      width: "100vw",
    },
  },
  profileOverlay: {
    width: "25rem",
    height: "25rem",
    [Sizes.down("sm")]: {
      height: "15rem",
    },
  },
  postTypeSelector: {
    backgroundColor: "var(--bg)",
    color: "var(--text1)",
    display: "flex",
    width: "7rem",
    height: "3rem",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: ".5rem",
    borderRadius: ".5rem",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    [Sizes.down("sm")]: {
      margin: ".5rem",
    },
  },
  postTypeIcons: {
    color: "var(--purple-1)",
    fontSize: "1.5rem",
    cursor: "pointer",
    transitionDuration: ".2s",
    "&:hover": {
      transform: "scale(.8)",
    },
    [Sizes.down("sm")]: {
      fontSize: "1.2rem",
    },
  },
  userNotFound: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    fontSize: "3rem",
    fontWeight: "bold",
    color: "var(--purple-1)",
    textShadow: "2px 2px 3px #333333",
  },
  smUserList: {
    position: "absolute",
    zIndex: 3,
    backgroundColor: "var(--bg)",
    color: "var(--text1)",
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cancleButton: {
    position: "absolute",
    right: ".5rem",
    top: ".5rem",
    fontSize: "1.8rem",
    color: "var(--purple-1)",
    float: "right",
    margin: ".5rem",
    cursor: "pointer",
    transitionDuration: ".2s",
    "&:hover": {
      opacity: ".5",
      transform: "scale(.8)",
    },
    [Sizes.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
});

const Profile = (props) => {
  const classes = useStyles();

  const [coverClick, setCoverClick] = useState(false);
  const [profileClick, setProfileClick] = useState(false);
  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(props);
  const [userPosts, setUserPosts] = useState(null);
  const [showPostWithUrl, setShowPostWithUrl] = useState(true);
  const [userNotFound, setUserNotFound] = useState(false);
  const [showFollowersSM, setFollowersSM] = useState(false);
  const [showFollowingsSM, setFollowingsSM] = useState(false);

  const { uname } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users?username=${uname}`
        );
        setUser(res.data);
      } catch (err) {
        setUserNotFound(true);
      }
    };
    if (uname) {
      fetchUser();
    }
  }, [uname]);

  useEffect(() => {
    const fetchUserPost = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/user/${user._id}`
      );
      setUserPosts(res.data);
      setShowPostWithUrl(
        res.data.filter((post) => post.post.url).length === 0 ? false : true
      );
    };
    if (user) {
      fetchUserPost();
    }
  }, [user]);

  function handleCoverClick() {
    setCoverClick((prevState) => !prevState);
  }

  function handleProfileClick(evt) {
    setProfileClick((prevState) => !prevState);
  }

  function handleGridClick() {
    setShowPostWithUrl(true);
  }

  function handleListClick() {
    setShowPostWithUrl(false);
  }

  async function handleFollowUnfollow() {
    if (currentUser.followings.includes(user._id)) {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/${user._id}/unfollow`,
        { userId: props._id }
      );
      const res1 = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users?username=${props.username}`
      );
      setCurrentUser(res1.data);
      const res2 = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users?username=${uname}`
      );
      setUser(res2.data);
    } else {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/${user._id}/follow`,
        { userId: props._id }
      );
      const res1 = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users?username=${props.username}`
      );
      setCurrentUser(res1.data);
      const res2 = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users?username=${uname}`
      );
      setUser(res2.data);
    }
  }

  async function setuser(user) {
    setCurrentUser(user);
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users?username=${uname}`
    );
    setUser(res.data);
  }

  function setPostsArray(posts) {
    setUserPosts(posts);
  }

  function handleShowFollowersSM() {
    setFollowersSM((prevState) => !prevState);
  }
  function handleShowFollowingsSM() {
    setFollowingsSM((prevState) => !prevState);
  }
  console.log(userPosts);
  return (
    <>
      {userNotFound && (
        <div className={classes.userNotFound}>
          This account has been deleted!😕
        </div>
      )}
      {user ? (
        <div className={classes.outterContainer}>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={profileClick}
            onClick={handleProfileClick}
          >
            <img
              className={classes.profileOverlay}
              src={
                user.profilePicture.url
                  ? `${user.profilePicture.url}`
                  : `https://api.dicebear.com/5.x/avataaars/svg?seed=${user.username}`
              }
              alt=""
            />
          </Backdrop>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={coverClick}
            onClick={handleCoverClick}
          >
            <img
              className={classes.profileCoverOverlay}
              src={
                user.coverPicture.url
                  ? `${user.coverPicture.url}`
                  : `${noCover}`
              }
              alt=""
            />
          </Backdrop>

          <div
            className={classes.smUserList}
            style={{
              display:
                window.innerWidth <= 768 && showFollowersSM ? "flex" : "none",
            }}
          >
            <ImCancelCircle
              className={classes.cancleButton}
              onClick={handleShowFollowersSM}
            />
            <h1 className={classes.h2}>Followers</h1>
            <UsersList
              users={user.followers}
              currentUser={currentUser}
              setuser={setuser}
              type="Follower"
              height="90%"
              width={window.innerWidth > 425 ? "60%" : "100%"}
            />
          </div>
          <div
            className={classes.smUserList}
            style={{
              display:
                window.innerWidth <= 768 && showFollowingsSM ? "flex" : "none",
            }}
          >
            <ImCancelCircle
              className={classes.cancleButton}
              onClick={handleShowFollowingsSM}
            />
            <h1 className={classes.h2}>Followings</h1>
            <UsersList
              users={user.followings}
              currentUser={currentUser}
              setuser={setuser}
              type="Following"
              height="90%"
              width={window.innerWidth > 425 ? "60%" : "100%"}
            />
          </div>

          <div className={classes.container}>
            <div className={classes.left}>
              <h2 className={classes.h2}>Followers</h2>
              <UsersList
                users={user.followers}
                currentUser={currentUser}
                setuser={setuser}
                type="Follower"
              />
              <h2 className={classes.h2}>Followings</h2>
              <UsersList
                users={user.followings}
                currentUser={currentUser}
                setuser={setuser}
                type="Following"
              />
            </div>
            <div className={classes.right}>
              <div className={classes.infoContainer}>
                <img
                  className={classes.coverPic}
                  src={user.coverPicture.url ? user.coverPicture.url : noCover}
                  alt=""
                  onClick={handleCoverClick}
                ></img>
                <div className={classes.profileContainer}>
                  <img
                    className={classes.profilePic}
                    src={
                      user.profilePicture.url
                        ? user.profilePicture.url
                        : `https://api.dicebear.com/5.x/avataaars/svg?seed=${user.username}`
                    }
                    alt=""
                    onClick={handleProfileClick}
                  ></img>
                </div>
                <div className={classes.details}>
                  <span className={classes.name}>{user.name}</span>
                  <span className={classes.username}>@{user.username}</span>
                  <p className={classes.p}>{user.bio}</p>
                  <div className={classes.followers_following_counters}>
                    <div
                      className={classes.innerDiv}
                      onClick={handleShowFollowersSM}
                    >
                      <span className={classes.upperSpan}>Followers</span>
                      <span className={classes.lowerSpan}>
                        {user.followers.length}
                      </span>
                    </div>
                    <div className={classes.centerLine} />
                    <div
                      className={classes.innerDiv}
                      onClick={handleShowFollowingsSM}
                    >
                      <span className={classes.upperSpan}>Followings</span>
                      <span className={classes.lowerSpan}>
                        {user.followings.length}
                      </span>
                    </div>
                  </div>
                  <div className={classes.btnContainer}>
                    <Link
                      to={
                        uname === props.username
                          ? `/update/user/${user._id}`
                          : null
                      }
                      className={classes.btn}
                      onClick={
                        uname === props.username ? null : handleFollowUnfollow
                      }
                    >
                      {uname === props.username
                        ? "Edit Profile"
                        : currentUser.followings.includes(user._id)
                        ? "Unfollow"
                        : "Follow"}
                    </Link>
                  </div>
                </div>
              </div>
              <UploadPost
                profile={
                  user.profilePicture
                    ? user.profilePicture.url
                    : `https://api.dicebear.com/5.x/avataaars/svg?seed=${user.username}`
                }
                currentUser={user}
                setPostsArray={setPostsArray}
                homePage={false}
              />
              {userPosts ? (
                <div
                  className={classes.postContainer}
                  style={{
                    marginTop:
                      user.username !== currentUser.username ? "1rem" : "",
                  }}
                >
                  <div
                    className={classes.postTypeSelector}
                    style={{
                      marginBottom:
                        userPosts &&
                        userPosts.filter((post) => post.post.url).length === 0
                          ? "2rem"
                          : null,
                    }}
                  >
                    <BsGrid3X3
                      className={classes.postTypeIcons}
                      onClick={
                        userPosts.filter((post) => post.post.url).length === 0
                          ? null
                          : handleGridClick
                      }
                    />
                    <BsList
                      className={classes.postTypeIcons}
                      onClick={handleListClick}
                    />
                  </div>
                  {userPosts ? (
                    userPosts.filter((post) => post.post.url).length ? (
                      <PostWithUrl
                        posts={userPosts.filter((post) => post.post.url)}
                        show={showPostWithUrl}
                        currentUser={currentUser}
                        setPostsArray={setPostsArray}
                        user={user}
                      />
                    ) : null
                  ) : null}
                  {userPosts && !showPostWithUrl
                    ? userPosts
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        .map((post) => (
                          <Post
                            key={post._id}
                            {...post}
                            currentUser={currentUser}
                            setPostsArray={setPostsArray}
                          />
                        ))
                    : null}
                </div>
              ) : null}
            </div>
          </div>
          <BottomNavbar />
        </div>
      ) : null}
    </>
  );
};

export default Profile;
