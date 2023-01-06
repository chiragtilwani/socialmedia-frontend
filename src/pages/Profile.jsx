import { makeStyles } from "@mui/styles";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Link } from "react-router-dom";

import Navbar from "../components/navbar/Navbar";
import UploadPost from "../components/UploadPost";
import UsersList from "../components/UsersList";
import Post from "../components/Post";
import video from "../video.mp4";
import Sizes from '../Sizes'
import BottomNavbar from "../components/navbar/BottomNavbar";

const useStyles = makeStyles({
  outterContainer:{
    backgroundColor:'var(--purple-3)',
    height:'100vh',
    width:'100vw',
    overflow:'hidden',
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
      margin:'auto'
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
    [Sizes.down('md')]:{
      display:"none"
    }
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
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  },
  coverPic: {
    width: "100%",
    height: "20rem",
    cursor: "pointer",
    transitionDuration: ".2s",
    [Sizes.up('xl')]:{
      height: "25rem",
    }
  },
  profilePic: {
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
    border: ".2rem solid var(--purple-1)",
    transform: "translateY(-50%)",
    boxShadow: "0rem 0rem .5rem .05rem var(--purple-2)",
    margin: "auto",
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
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration:'none',
    "&:hover": {
      opacity: 0.8,
    },
  },
  postContainer: {
    width: "90%",
    marginBottom:'2rem'
  },
  profileOverlay:{
    width:'100%',
    height:'100%',
  }
});

const dummyUser = {
  id: 1,
  name: "rahul tilwani",
  username: "rtilwani03",
  profilePicture:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTazRa-UljlJ57z2tqmSNSz5X_C5RkD1S-Nfj46b_ZO&s",
  coverPicture:
    "https://images.pexels.com/photos/1323206/pexels-photo-1323206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  bio: "this is dummy bio",
  followers: 1234,
  followings: 750,
};

const dummyUsers = [
  {
    id: 1,
    name: "rahul tilwani",
    username: "rtilwani03",
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTazRa-UljlJ57z2tqmSNSz5X_C5RkD1S-Nfj46b_ZO&s",
  },
  {
    id: 2,
    name: "sid tilwani",
    username: "rtilwani03",
    profilePicture:
      "https://media.istockphoto.com/id/1321610286/photo/smiling-hispanic-mature-man-front-and-profile-mugshots.jpg?s=612x612&w=is&k=20&c=cZcMC5MoaEKVJ92hX8JoHkiGuWZA2jbaTzbyAlv3t9Q=",
  },
  {
    id: 3,
    name: "lavina tilwani",
    username: "ltilwani03",
    profilePicture:
      "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
  },
  {
    id: 4,
    name: "lavina tilwani",
    username: "ltilwani03",
    profilePicture:
      "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
  },
  {
    id: 5,
    name: "lavina tilwani",
    username: "ltilwani03",
    profilePicture:
      "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
  },
  {
    id: 6,
    name: "lavina tilwani",
    username: "ltilwani03",
    profilePicture:
      "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
  },
  {
    id: 7,
    name: "lavina tilwani",
    username: "ltilwani03",
    profilePicture:
      "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
  },
  {
    id: 8,
    name: "lavina tilwani",
    username: "ltilwani03",
    profilePicture:
      "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
  },
  {
    id: 9,
    name: "lavina tilwani",
    username: "ltilwani03",
    profilePicture:
      "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg",
  },
];

const posts = [
  {
    id: 1,
    name: "chirag tilwani",
    username: "chiragTilwani",
    postImg: { video },
    likes: 1234,
  },
  {
    id: 2,
    name: "chirag tilwani",
    username: "chiragTilwani",
    desc: "this is second dummy post",
    likes: 560,
  },
  {
    id: 3,
    name: "chirag tilwani",
    username: "chiragTilwani",
    desc: "this is third dummy post",
    postImg:
      "https://images.pexels.com/photos/1004014/pexels-photo-1004014.jpeg?cs=srgb&dl=pexels-min-an-1004014.jpg&fm=jpg",
    likes: 700,
  },
  {
    id: 4,
    name: "chirag tilwani",
    username: "chiragTilwani",
    desc: "this is fourth dummy post",
    postImg:
      "https://images.pexels.com/photos/1004014/pexels-photo-1004014.jpeg?cs=srgb&dl=pexels-min-an-1004014.jpg&fm=jpg",
    likes: 12,
  },
  {
    id: 5,
    name: "chirag tilwani",
    username: "chiragTilwani",
    desc: "this is fourth dummy post",
    postImg:
      "https://images.pexels.com/photos/1004014/pexels-photo-1004014.jpeg?cs=srgb&dl=pexels-min-an-1004014.jpg&fm=jpg",
    likes: 12,
  },
];

const Profile = () => {
  const classes = useStyles();
  const [coverClick, setCoverClick] = useState(false);
  const [profileClick, setProfileClick] = useState(false);

  function handleCoverClick() {
    setCoverClick((prevState) => !prevState);
  }
  function handleProfileClick() {
    setProfileClick((prevState) => !prevState);
  }
  return (
    <div className={classes.outterContainer}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={profileClick}
        onClick={handleProfileClick}
      >
        <div
          className={classes.profileOverlay}
          style={{
            background:`url(${dummyUser.profilePicture})`,
            backgroundSize: "auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      </Backdrop>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={coverClick}
        onClick={handleCoverClick}
      >
        <div
          className={classes.profileOverlay}
          style={{
            background:`url(${dummyUser.coverPicture})`,
            backgroundSize: "auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      </Backdrop>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.left}>
          <h2 className={classes.h2}>Followers</h2>
          <UsersList users={dummyUsers} />
          <h2 className={classes.h2}>Followings</h2>
          <UsersList users={dummyUsers} />
        </div>
        <div className={classes.right}>
          <div className={classes.infoContainer}>
            {/* cover pic */}
            <div
              className={classes.coverPic}
              style={{
                background: `url(${dummyUser.coverPicture})`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
              }}
              onClick={handleCoverClick}
            ></div>
            {/* profile pic */}
            <div
              className={classes.profilePic}
              style={{
                background: `url(${dummyUser.profilePicture})`,
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
              }}
              onClick={handleProfileClick}
            ></div>
            {/* details */}
            <div className={classes.details}>
              <span className={classes.name}>{dummyUser.name}</span>
              <span className={classes.username}>@{dummyUser.username}</span>
              <p className={classes.p}>
                {dummyUser.bio}Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Cumque quibusdam aut aperiam numquam sint odit
                sapiente ex iusto nihil molestiae! Eius, non optio!
              </p>
              <div className={classes.followers_following_counters}>
                <div className={classes.innerDiv}>
                  <span className={classes.upperSpan}>Followers</span>
                  <span className={classes.lowerSpan}>
                    {dummyUser.followers}
                  </span>
                </div>
                <div className={classes.centerLine} />
                <div className={classes.innerDiv}>
                  <span className={classes.upperSpan}>Followings</span>
                  <span className={classes.lowerSpan}>
                    {dummyUser.followings}
                  </span>
                </div>
              </div>
              {/* edit profile btn / follow btn if profile of other people */}
              <div className={classes.btnContainer}>
                <Link to='/update/user/1' className={classes.btn}>Edit Profile</Link>{/*here in 'to' attribute instead of  1 userId must come */}
                {/* we weill make text dynamic b/w Edit profile/Follow/Following if current_userId!=uid from params */}
              </div>
            </div>
          </div>
          {/* post uploader */}
          <UploadPost profile={dummyUser.profilePicture} />
          {/* posts by user */}
          <div className={classes.postContainer}>
            {posts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
          </div>
        </div>
      </div>
      <BottomNavbar/>
    </div>
  );
};

export default Profile;
