import { makeStyles } from "@mui/styles";

import Sizes from "../Sizes";
import Navbar from "../components/navbar/Navbar";
import BottomNavbar from "../components/navbar/BottomNavbar";
import PofileCard from "../components/PofileCard";
import UsersList from "../components/UsersList";
import UploadPost from "../components/UploadPost";
import Post from "../components/Post";

const useStyles = makeStyles({
  outterContainer: {
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--purple-3)",
    marginTop: "3rem",
  },

  container: {
    border: ".2rem solid",
    display: "grid",
    gridTemplateColumns: "2fr 4fr 2fr",
    height: "100vh",
    columnGap: "2rem",
    width: "100%",
    overflow: "scroll",
    [Sizes.down("md")]: {
      marginBottom: "2.5rem",
      gridTemplateColumns: "4fr",
    },
    [Sizes.up("xl")]: {
      width: "80%",
    },
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  childContainer: {
    border: ".2rem solid",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
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
  left: {
    [Sizes.down("md")]: {
      display: "none",
    },
  },
  right: {
    [Sizes.down("md")]: {
      display: "none",
    },
  },
  h2: {
    marginTop: "2rem",
    textTransform: "capitalize",
    fontWeight: "bold",
    color: "var(--purple-1)",
  },
  postContainer:{
    width:'90%'
  }
});

const Home = () => {
  const classes = useStyles();

  const users = [
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
      desc: "this is first dummy post",
      postImg: "https://images.pexels.com/photos/1004014/pexels-photo-1004014.jpeg?cs=srgb&dl=pexels-min-an-1004014.jpg&fm=jpg",
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
      postImg: "https://images.pexels.com/photos/1004014/pexels-photo-1004014.jpeg?cs=srgb&dl=pexels-min-an-1004014.jpg&fm=jpg",
      likes: 700,
    },
    {
      id: 4,
      name: "chirag tilwani",
      username: "chiragTilwani",
      desc: "this is fourth dummy post",
      postImg: "https://images.pexels.com/photos/1004014/pexels-photo-1004014.jpeg?cs=srgb&dl=pexels-min-an-1004014.jpg&fm=jpg",
      likes: 12,
    },
    {
      id: 5,
      name: "chirag tilwani",
      username: "chiragTilwani",
      desc: "this is fourth dummy post",
      postImg: "https://images.pexels.com/photos/1004014/pexels-photo-1004014.jpeg?cs=srgb&dl=pexels-min-an-1004014.jpg&fm=jpg",
      likes: 12,
    },
  ];

  return (
    <>
      <div className={classes.outterContainer}>
        <Navbar />
        <div className={classes.container}>
          <div className={`${classes.left} ${classes.childContainer}`}>
            <PofileCard />
            <h2 className={classes.h2}>who is following you</h2>
            <UsersList users={users} />
            {/*here we will send list of users who are following currentUser instead of users with propname user*/}
          </div>
          <div className={`${classes.center} ${classes.childContainer}`}>
            <UploadPost />
            <div className={classes.postContainer}>
              {posts.map((post) => (
                <Post id={post.id} {...post} />
              ))}
            </div>
          </div>
          <div className={`${classes.right} ${classes.childContainer}`}>
            <h2 className={classes.h2} style={{ marginTop: "1rem" }}>
              Whom you follow
            </h2>
            <UsersList users={users} />
            {/*here we will send list of users whom you are following instead of users with propname user*/}
            <h2 className={classes.h2} style={{ marginTop: "1rem" }}>
              Friends Suggestion
            </h2>
            <UsersList users={users} />
            {/*here we will send list of users whom you are following instead of users with propname user*/}
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default Home;
