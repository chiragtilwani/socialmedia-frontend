import { makeStyles } from "@mui/styles";
import {useState} from 'react'
import Backdrop from "@mui/material/Backdrop";

import Sizes from "../Sizes";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    border: ".1rem solid",
    borderLeft: 0,
    borderRight: 0,
    padding: ".2rem",
    cursor: "pointer",
    transitionDuration: ".2s",
    textDecoration:'none',
    color:'black'
  },
  profile: {
    width: "4rem",
    height: "4rem",
    borderRadius: "50%",
    border: ".2rem solid var(--purple-1)",
  },
  name_username: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    [Sizes.down("lg")]: {
      fontSize: ".8rem",
    },
  },
  name: {
    marginBottom: ".1rem",
    fontWeight: "bold",
    textTransform: "capitalize",
    color:'black',
  },
  username: {
    color: "var(--purple-2)",
    fontWeight: "bold",
    transitionDuration: ".2s",
    cursor: "pointer",
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
  profileOverlay:{
    width:'50%',
    height:'80vh',
  }
});

const UserListItem = (props) => {
  const classes = useStyles();
  const [profileClick, setProfileClick] = useState(false);

  function handleProfileClick() {
    setProfileClick((prevState) => !prevState);
  }

  return (
    <Link to="/profile/1" className={classes.container}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={profileClick}
        onClick={handleProfileClick}
      >
        <div
          className={classes.profileOverlay}
          style={{
            background:`url(${props.userInfo.profilePicture})`,
            backgroundSize: "auto",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></div>
      </Backdrop>
      <div
        className={classes.profile}
        style={{
          background: `url(${props.userInfo.profilePicture})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
        onClick={handleProfileClick}
      ></div>
      <div className={classes.name_username}>
        <span className={classes.name}>{props.userInfo.name}</span>
        <span className={classes.username}>{props.userInfo.username}</span>
      </div>
      <button className={classes.btn}>Follow</button>
      {/*later we will dynamically change this button's text to follow/following based on if current user's following list have this user or not*/}
      {/* if it is following then on clicking this button we will alert user with msg 'if you change your mind,you'll have to request to follow username_of_user_we_are_unfollowing again. */}
    </Link>
  );
};

export default UserListItem;
