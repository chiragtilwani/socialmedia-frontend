import { makeStyles } from "@mui/styles";
import {useContext, useEffect,useState} from 'react'
import axios from 'axios'

import Sizes from "../Sizes";
import Navbar from "../components/navbar/Navbar";
import BottomNavbar from "../components/navbar/BottomNavbar";
import PofileCard from "../components/PofileCard";
import UsersList from "../components/UsersList";
import UploadPost from "../components/UploadPost";
import Post from "../components/Post";
import video from '../video.mp4'
import { AuthContext } from "../context/AuthContext";

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
    display: "grid",
    gridTemplateColumns: "2fr 4fr 2fr",
    height: "100vh",
    columnGap: ".5rem",
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
    paddingBottom:'4rem',
    [Sizes.down("md")]: {
      display: "none",
    },
  },
  right: {
    paddingBottom:'4rem',
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
    width:'90%',
    marginBottom: "2rem"
  }
});
const Home = (props) => {
  const classes = useStyles();
  const [posts,setPosts]=useState([])
  const contextData=useContext(AuthContext)

  useEffect(()=>{
    const getPost =async()=>{
      const res=await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/timeline/${props._id}`)
      setPosts(res.data)
    }
    getPost()
  },[props._id])

  let friendSuggestions=props.followers.filter(id=>!props.followings.includes(id))
  
console.log(contextData)
console.log(props)
  return (
    <>
      <div className={classes.outterContainer}>
        <Navbar />
        <div className={classes.container}>
          <div className={`${classes.left} ${classes.childContainer}`}>
            <PofileCard currentUser={props} currentUserPost={posts.filter(post=>post.creatorId===props._id)}/>
              <h2 className={classes.h2} style={{ marginTop: "1rem" }}>
                Suggestions for you
              </h2>
              <UsersList users={friendSuggestions} currentUser={props}/>
              {/*here we will send list of users whom you are following instead of users with propname user*/}
          </div>
          <div className={`${classes.center} ${classes.childContainer}`}>
            <UploadPost profile="https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg" currentUser={props}/>
            <div className={classes.postContainer}>
              {posts.map((post) => (
                <Post key={post._id} {...post} currentUser={props}/>
                ))}
            </div>
          </div>
          <div className={`${classes.right} ${classes.childContainer}`}>
                <h2 className={classes.h2}>who is following you</h2>
                <UsersList users={props.followers} currentUser={props}/>
                {/*here we will send list of users who are following currentUser instead of users with propname user*/}
            <h2 className={classes.h2} style={{ marginTop: "1rem" }}>
              Whom you follow
            </h2>
            <UsersList users={props.followings} currentUser={props}/>
            {/*here we will send list of users whom you are following instead of users with propname user*/}
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default Home;
