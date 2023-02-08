import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BsList } from "react-icons/bs";
import { BsGrid3X3 } from "react-icons/bs";

import Navbar from "../components/navbar/Navbar";
import UploadPost from "../components/UploadPost";
import UsersList from "../components/UsersList";
import Post from "../components/Post";
import Sizes from "../Sizes";
import BottomNavbar from "../components/navbar/BottomNavbar";
import noAvatar from "../assests/noAvatar.png";
import noCover from "../assests/noCover.png";
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
    backgroundColor: "white",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
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
  },
  details: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    padding: ".5rem",
    marginTop: "-2rem",
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
      color: "black",
      cursor: "default",
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
  },
  postContainer: {
    width: "90%",
    marginBottom: "2rem",
  },
  profileOverlay: {
    width: "100%",
    height: "100%",
  },
  postTypeSelector: {
    backgroundColor: "white",
    display: "flex",
    width: "7rem",
    height: "3rem",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: ".5rem",
    borderRadius: ".5rem",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  postTypeIcons: {
    color: "var(--purple-1)",
    fontSize: "1.5rem",
    cursor: "pointer",
    transitionDuration: ".2s",
    "&:hover": {
      transform: "scale(.8)",
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

  const { uname } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users?username=${uname}`
      );
      setUser(res.data);
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
    //also updating followers/followings list of user who's profile we are checking
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/users?username=${uname}`
    );
    setUser(res.data);
  }
  return (
    <>
      {user ? (
        <div className={classes.outterContainer}>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={profileClick}
            onClick={handleProfileClick}
          >
            <img
              className={classes.profileCoverOverlay}
              src={
                user.profilePicture
                  ? `${user.profilePicture.url}`
                  : `${noAvatar}`
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
                user.coverPicture ? `${user.coverPicture.url}` : `${noCover}`
              }
              alt=""
            />
          </Backdrop>

          <Navbar />
          <div className={classes.container}>
            <div className={classes.left}>
              <h2 className={classes.h2}>Followers</h2>
              <UsersList
                users={user.followers}
                currentUser={currentUser}
                setuser={setuser}
              />
              <h2 className={classes.h2}>Followings</h2>
              <UsersList
                users={user.followings}
                currentUser={currentUser}
                setuser={setuser}
              />
            </div>
            <div className={classes.right}>
              <div className={classes.infoContainer}>
                {/* cover pic */}
                <img
                  className={classes.coverPic}
                  src={user.coverPicture ? user.coverPicture.url : noCover}
                  alt=""
                  onClick={handleCoverClick}
                ></img>
                {/* profile pic */}
                <img
                  className={classes.profilePic}
                  src={user.profilePic ? user.profilePic.url : noAvatar}
                  alt=""
                  onClick={handleProfileClick}
                ></img>
                {/* details */}
                <div className={classes.details}>
                  <span className={classes.name}>{user.name}</span>
                  <span className={classes.username}>@{user.username}</span>
                  <p className={classes.p}>
                    {user.bio}Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Cumque quibusdam aut aperiam numquam sint odit
                    sapiente ex iusto nihil molestiae! Eius, non optio!
                  </p>
                  <div className={classes.followers_following_counters}>
                    <div className={classes.innerDiv}>
                      <span className={classes.upperSpan}>Followers</span>
                      <span className={classes.lowerSpan}>
                        {user.followers.length}
                      </span>
                    </div>
                    <div className={classes.centerLine} />
                    <div className={classes.innerDiv}>
                      <span className={classes.upperSpan}>Followings</span>
                      <span className={classes.lowerSpan}>
                        {user.followings.length}
                      </span>
                    </div>
                  </div>
                  {/* edit profile btn / follow btn if profile of other people */}
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
                    {/*here in 'to' attribute instead of  1 userId must come */}
                    {/* we weill make text dynamic b/w Edit profile/Follow/Following if current_userId!=uid from params */}
                  </div>
                </div>
              </div>
              {/* post uploader */}
              <UploadPost
                profile={
                  user.profilePicture ? user.profilePicture.url : noAvatar
                }
                currentUser={user}
              />
              {/* posts by user */}
              {userPosts ? (
                <div className={classes.postContainer}>
                  <div
                    className={classes.postTypeSelector}
                    style={{
                      marginBottom:
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
                        setUserPosts={setUserPosts}
                      />
                    ) : null
                  ) : null}
                  {userPosts && !showPostWithUrl
                    ? userPosts
                        .sort(
                          (a, b) =>
                            new Date(b.createdAt) - new Date(a.createdAt)
                        )
                        .map((post) => <Post key={post._id} {...post} currentUser={currentUser}/>)
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
