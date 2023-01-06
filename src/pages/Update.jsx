import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

import Sizes from "../Sizes";

const useStyles = makeStyles({
  outterContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--purple-2)",
  },
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    [Sizes.up("xl")]: {
      width: "80%",
      hight: "80%",
    },
  },
  card: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius:'.5rem',
    [Sizes.down("md")]: {
        width: "100vw",
    },
},
cover: {
      borderRadius:'.5rem .5rem 0rem 0rem',
    width: "100%",
    height: "15rem",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  profile: {
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
    border: ".2rem solid var(--purple-1)",
    boxShadow: "0rem 0rem .5rem .05rem var(--purple-2)",
    marginBottom: "-2.5rem",
    cursor: "pointer",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "3rem 2rem 1rem 2rem",
  },
  input: {
    margin: "1rem",
    padding: "0.5rem",
    outline: "none",
  },
  btnContainer:{
    display: "flex",
    alignItems: "center",
    marginBottom:'1rem'
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
    marginLeft:'1.5rem',
    "&:hover": {
      opacity: 0.8,
    },
  },
});

const Update = (props) => {
  const classes = useStyles();
  const navigate=useNavigate()

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

  const dummyPost = {
    id: 3,
    name: "chirag tilwani",
    username: "chiragTilwani",
    desc: "this is third dummy post",
    postImg:
      "https://images.pexels.com/photos/1004014/pexels-photo-1004014.jpeg?cs=srgb&dl=pexels-min-an-1004014.jpg&fm=jpg",
    likes: 700,
  };

  function handleBack(){
    navigate(-1)
  }
  return (
    <div className={classes.outterContainer}>
      <div className={classes.container}>
        <div className={classes.card}>
          <div
            className={classes.cover}
            style={{
              background: props.postUpdate
                ? `url(${dummyPost.postImg})`
                : `url(${dummyUser.coverPicture})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
          >
            {props.postUpdate ? null : (
              <div
                className={classes.profile}
                style={{
                  background: `url(${dummyUser.profilePicture})`,
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                }}
              ></div>
            )}
          </div>
          {props.postUpdate ? (
            <input
              type="text"
              className={`${classes.input}`}
              value={dummyPost.desc}
              placeholder="description"
            />
          ) : (
            <div className={classes.inputContainer}>
              <div>
                <span>Name : </span>
                <input
                  type="text"
                  className={`${classes.input}`}
                  value={dummyUser.name}
                />
              </div>
              <div>
                <span>Username : </span>
                <input
                  type="text"
                  className={`${classes.input}`}
                  value={dummyUser.username}
                />
              </div>
              <div>
                <span>Bio : </span>
                <input
                  type="text"
                  className={`${classes.name} ${classes.input}`}
                  value={dummyUser.bio}
                />
              </div>
            </div>
          )}
          <div className={classes.btnContainer}>
            <button className={classes.btn} onClick={handleBack}>Back</button>
            <button className={classes.btn}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
