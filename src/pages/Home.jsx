import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import axios from "axios";

import Sizes from "../Sizes";
import PofileCard from "../components/PofileCard";
import UsersList from "../components/UsersList";
import UploadPost from "../components/UploadPost";
import Post from "../components/Post";
import Loading from "../components/Loading";

const useStyles = makeStyles({
  outterContainer: {
    width: "100vw",
    height:'100vh',
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
    paddingBottom: "4rem",
    [Sizes.down("md")]: {
      display: "none",
    },
  },
  center: {
    [Sizes.down("md")]: {
      paddingBottom: "2rem",
    },
    [Sizes.down("sm")]: {
      paddingBottom: "3rem",
    },
  },
  right: {
    paddingBottom: "4rem",
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
  postContainer: {
    width: "90%",
    marginBottom: "2rem",
    [Sizes.down("sm")]: {
      width: "100%",
    },
  },
  noPosts: {
    color: "var(--purple-1)",
    width: "100%",
    height: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
    flexDirection: "column",
  },
  noPostSpan1: {
    fontSize: "2rem",
    [Sizes.down("xs")]: {
      fontSize: "1rem",
    },
  },
  noPostSpan2: {
    fontSize: "1rem",
    [Sizes.down("xs")]: {
      fontSize: ".5rem",
    },
  },
});
const Home = (props) => {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(props);
  const [allUsers, setAllUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/timeline/${user._id}`
      );
      setPosts(res.data);
    };
    async function fetchAllUsers() {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/allUsers`
      );
      setAllUsers(res.data);
    }
    setLoading(true);
    getPost();
    fetchAllUsers();
    setLoading(false);
  }, [user._id]);

  function setPostsArray(posts) {
    setPosts(posts);
  }

  function setuser(followers) {
    setUser(followers);
  }

  return (
    <>
      <div className={classes.outterContainer}>
        {loading ? (
          <Loading />
        ) : (
          <div className={classes.container}>
            <div className={`${classes.left} ${classes.childContainer}`}>
              <PofileCard
                currentUser={user}
                currentUserPost={posts.filter(
                  (post) => post.creatorId === user._id
                )}
              />
              <h2 className={classes.h2} style={{ marginTop: "1rem" }}>
                Suggestions for you
              </h2>
              <UsersList
                users={
                  allUsers &&
                  allUsers
                    .filter(
                      (user) =>
                        !props.followings.includes(user._id) &&
                        user._id !== props._id
                    )
                    .map((user) => user._id)
                }
                currentUser={user}
                setuser={setuser}
                setPosts={setPosts}
                type="Suggestion"
              />
            </div>
            <div className={`${classes.center} ${classes.childContainer}`}>
              <UploadPost
                profile="https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg"
                currentUser={user}
                setPostsArray={setPostsArray}
                homePage={true}
              />
              {loading ? (
                <Loading />
              ) : (
                <div className={classes.postContainer}>
                  {posts
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .map((post) => (
                      <Post
                        key={post._id}
                        {...post}
                        currentUser={user}
                        setPostsArray={setPostsArray}
                      />
                    ))}
                  {posts && posts.length === 0 && (
                    <div className={classes.noPosts}>
                      <span
                        className={classes.noPostSpan1}
                        style={{ fontSize: "2rem" }}
                      >
                        No Post Found!😕
                      </span>
                      <span
                        className={classes.noPostSpan2}
                        style={{ fontSize: "1rem" }}
                      >
                        Follow other people to see their posts on your timeline
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className={`${classes.right} ${classes.childContainer}`}>
              <h2 className={classes.h2}>who is following you</h2>
              <UsersList
                users={user.followers}
                currentUser={user}
                setuser={setuser}
                setPosts={setPosts}
                type="Follower"
              />
              <h2 className={classes.h2} style={{ marginTop: "1rem" }}>
                Whom you follow
              </h2>
              <UsersList
                users={user.followings}
                currentUser={user}
                setuser={setuser}
                setPosts={setPosts}
                type="Following"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
