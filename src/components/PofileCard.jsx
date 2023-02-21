import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";

import noCover from "../assets/noCover.png";
import noAvatar from "../assets/noAvatar.png";
import axios from "axios";

const useStyles = makeStyles({
  container: {
    width: "90%",
    minHeight: "20rem",
    backgroundColor: "white",
    marginTop: "1rem",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  coverImgContainer: {
    width: "100%",
    height: "40%",
    borderRadius: "1rem 1rem 0rem 0rem",
    cursor: "pointer",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    overflow: "hidden"
  },
  coverImg: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
  },
  profileImgContainer: {
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
    border: ".2rem solid var(--purple-1)",
    transform: "translateY(-50%)",
    boxShadow: "0rem 0rem .5rem .05rem var(--purple-2)",
    cursor: "pointer",
    overflow: "hidden"
  },
  profileImg: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
  },
  name: {
    marginTop: "-1.5rem",
    fontSize: "1.4rem",
    fontWeight: "bold",
    letterSpacing: ".05rem",
    wordBreak: "break-word",
    padding: ".5rem",
    marginBottom: "1rem",
    textTransform: "capitalize",
    width: "90%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    textAlign:'center',
  },
  line: {
    width: "90%",
    height: ".2rem",
    backgroundColor: "var(--purple-3)",
    margin: ".5rem",
  },
  stats: {
    display: "flex",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerStats: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  centerLine: {
    height: "90%",
    width: ".1rem",
    backgroundColor: "var(--purple-3)",
  },
  profileCoverOverlay: {
    width: "auto",
    height: "auto",
    objectFit: "fill",
  },
});

const PofileCard = (props) => {
  const classes = useStyles();
  const [coverClick, setCoverClick] = useState(false);
  const [profileClick, setProfileClick] = useState(false);

  function handleCoverClick() {
    setCoverClick((prevState) => !prevState);
  }
  function handleProfileClick() {
    setProfileClick((prevState) => !prevState);
  }
  console.log(props.currentUser)
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={profileClick}
        onClick={handleProfileClick}
      >
        <img
          className={classes.profileCoverOverlay}
          src={
            props.currentUser.profilePicture.url ? `${props.currentUser.profilePicture.url}` : `${noAvatar}`
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
          src={props.currentUser.coverPicture.url ? `${props.currentUser.coverPicture.url}` : `${noCover}`}
          alt=""
        />
      </Backdrop>

      <div className={classes.container}>
        <div className={classes.coverImgContainer} onClick={handleCoverClick}>
          <img
            className={classes.coverImg}
            src={
              props.currentUser.coverPicture.url
                ? `${props.currentUser.coverPicture.url}`
                : `${noCover}`
            }
            alt=""
          />
        </div>
        <div
          className={classes.profileImgContainer}
          onClick={handleProfileClick}
        >
          <img
            className={classes.profileImg}
            src={
              props.currentUser.profilePicture.url
                ? `${props.currentUser.profilePicture.url}`
                : `${noAvatar}`
            }
            alt=""
          />
        </div>
        <div className={classes.name}>
          <Link
            to={`/profile/${props.currentUser.username}`}
            style={{ textDecoration: "none", color: "black",textTransform:'capitalize' }}
          >
            {props.currentUser.name}
          </Link>
        </div>
        <div className={classes.line}></div>
        <div className={classes.stats}>
          <div className={classes.innerStats}>
            <span style={{fontWeight: "bold", fontSize: ".9rem"  }}>Followers</span>
            <span style={{ fontSize: ".8rem" }}>{props.currentUser.followers?props.currentUser.followers.length:0}</span>
          </div>
          <div className={classes.centerLine}></div>
          <div className={classes.innerStats}>
            <span style={{ fontWeight: "bold", fontSize: ".9rem" }}>Followings</span>
            <span style={{ fontSize: ".8rem" }}>{props.currentUser.followings?props.currentUser.followings.length:0}</span>
          </div>
          <div className={classes.centerLine}></div>
          <div className={classes.innerStats}>
            <span style={{ fontWeight: "bold", fontSize: ".9rem" }}>Posts</span>
            <span style={{ fontSize: ".8rem" }}>{props.currentUserPost.length}</span>
          </div>
        </div>
        <div className={classes.line}></div>
      </div>
    </>
  );
};

export default PofileCard;
