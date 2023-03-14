import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { ImCancelCircle } from "react-icons/im";
import axios from "axios";

import Sizes from "../../Sizes";
import UsersList from "../UsersList";

const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "2.5rem",
    backgroundColor: "var(--purple-1)",
    position: "fixed",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: "2",
    boxShadow:
      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px 3px, rgba(0, 0, 0, 0.2) 0px 3px 0px inset",
    [Sizes.up("md")]: {
      display: "none",
    },
  },
  innerContainer: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconLink: {
    fontSize: "1.4rem",
    color: "white",
    transitionDuration: ".2s",
    "&:hover": {
      color: "#0000007d",
    },
  },
  suggestionsSM: {
    position: "fixed",
    zIndex: 3,
    backgroundColor: "white",
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    top: 0,
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
  h2: {
    marginTop: "2rem",
    textTransform: "capitalize",
    fontWeight: "bold",
    color: "var(--purple-1)",
  },
});

function BottomNavbar(props) {
  const classes = useStyles();

  const [allUsers, setAllUsers] = useState();
  const [user, setUser] = useState(props.currentUser);
  const [showSuggestionsSM, setSuggestionsSM] = useState(false);

  useEffect(() => {
    async function fetchAllUsers() {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/allUsers`
      );
      setAllUsers(res.data);
    }
    fetchAllUsers();
  }, []);

  function handleNotificationIconClick() {
    props.OpenSideBar();
  }

  function handleShowSuggestionsSM() {
    setSuggestionsSM((prevState) => !prevState);
  }
  function setuser(followers) {
    setUser(followers);
  }

  return (
    <>
      <div className={classes.container}>
        <div
          className={classes.suggestionsSM}
          style={{
            display:
              window.innerWidth <= 768 && showSuggestionsSM ? "flex" : "none",
          }}
        >
          <ImCancelCircle
            className={classes.cancleButton}
            onClick={handleShowSuggestionsSM}
          />
          <h1 className={classes.h2}>Suggestions for you</h1>
          {user && (
            <UsersList
              users={
                props.currentUser &&
                allUsers &&
                allUsers
                  .filter(
                    (user) =>
                      !props.currentUser.followings.includes(user._id) &&
                      user._id !== props.currentUser._id
                  )
                  .map((user) => user._id)
              }
              currentUser={user}
              setuser={setuser}
              type="Suggestion"
              height="90%"
              width={window.innerWidth > 425 ? "60%" : "100%"}
            />
          )}
        </div>

        <div className={classes.innerContainer}>
          <Link to="/" className={classes.iconLink}>
            <Badge badgeContent={4} color="primary" variant="dot">
              <AiTwotoneHome />
            </Badge>
          </Link>
          <Link className={classes.iconLink}>
            <Badge badgeContent={0} color="primary">
              <MdDarkMode />
            </Badge>
          </Link>
          <Link className={classes.iconLink}>
            <Badge
              badgeContent={props.n_notifications}
              color="primary"
              variant="dot"
            >
              <IoMdNotifications onClick={handleNotificationIconClick} />
            </Badge>
          </Link>
          <Link
            to=""
            className={classes.iconLink}
            onClick={handleShowSuggestionsSM}
          >
            <Badge color="primary">
              <ImUsers />
            </Badge>
          </Link>
        </div>
      </div>
    </>
  );
}

export default BottomNavbar;
