import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { AiTwotoneHome } from "react-icons/ai";
import { RiSearchFill } from "react-icons/ri";
import Badge from "@mui/material/Badge";
import { IoMdNotifications } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import UserMenu from "./UserMenu";
import Sizes from "../../Sizes";

const useStyles = makeStyles({
  container: {
    height: "3rem",
    width: "100vw",
    backgroundColor: "var(--purple-1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    zIndex: "2",
    boxShadow:
      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
  },
  innerContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1rem",
    [Sizes.up("xl")]: {
      width: "80%",
      padding: "0",
    },
  },
  logo: {
    fontWeight: "900",
    color: "white",
    textDecoration: "none",
    fontSize: "2rem",
    [Sizes.down("sm")]: {
      display: "none",
    },
  },
  smLogo: {
    fontWeight: "900",
    color: "white",
    textDecoration: "none",
    fontSize: "1.5rem",
    [Sizes.up("sm")]: {
      display: "none",
    },
  },
  center: {
    position: "relative",
  },
  searchBar: {
    backgroundColor: "white",
    height: "2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "1rem",
    borderRadius: "1.2rem",
    cursor: "pointer",
  },
  searchbarInput: {
    outline: "none",
    border: "none",
    width: "15rem",
    transition: "all .5s",
    padding: "0 .5rem",
    "&:focus": {
      width: "25rem",
    },
    [Sizes.down("sm")]: {
      width: "5rem",
      "&:focus": {
        width: "12rem",
      },
    },
    [Sizes.down("xs")]: {
      width: "5rem",
      "&:focus": {
        width: "7rem",
      },
    },
  },
  searchIcon: {
    backgroundColor: "white",
  },
  searchResult: {
    backgroundColor: "white",
    marginTop: ".5rem",
    maxHeight: "20rem",
    overflowY: "scroll",
    overflowX: "hidden",
    position: "absolute",
    width: "100%",
    borderRadius: ".2rem",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
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
    [Sizes.down("sm")]: {
      width: "100vw",
      position: "fixed",
      left: 0,
    },
  },
  searchResultItem: {
    padding: ".5rem",
    borderBottom: ".1rem solid var(--purple-2)",
    display: "flex",
    alignItems: "center",
  },
  searchResultItemLink: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  searchLink: {
    textDecoration: "none",
    color: "black",
  },
  searchName: {
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  searchUserName: {
    fontSize: ".8rem",
    color: "var(--purple-2)",
  },
  searchUserImg: {
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    border: ".2rem solid var(--purple-1)",
    marginRight: ".5rem",
  },
  right: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconLink: {
    margin: "0 .8rem",
    fontSize: "1.4rem",
    color: "white",
    transitionDuration: ".2s",
    "&:hover": {
      color: "#0000007d",
    },
    [Sizes.down("md")]: {
      display: "none",
    },
  },
  span: {
    fontSize: "1rem",
    margin: "0 .3rem",
    padding: ".3rem 1rem",
    borderRadius: "1.2rem",
    cursor: "pointer",
    fontWeight: "bold",
    border: "1px solid",
    transitionDuration: ".2s",
    letterSpacing: ".05rem",
    "&:hover": {
      opacity: ".7",
    },
    "&:active": {
      boxShadow: "inset .1rem .1rem rgba(0,0,0,0.8)",
    },
  },
  avatar: {
    cursor: "pointer",
  },
  userMenu: {
    position: "absolute",
    right: "2rem",
    top: "3.5rem",
    display: "none",
    transitionDuration: "2s",
    "&:hover": {
      display: "block",
    },
    [Sizes.up("xl")]: {
      right: "12rem",
    },
  },
});

const Navbar = (props) => {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const [searchWord, setSearchWord] = useState();
  const [allUsers, setAllUsers] = useState();
  const [searchResult, setSearchResult] = useState();
  const [currentUser, setCurrentUser] = useState();

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users?userId=${user._id}`
      );
      setCurrentUser(res.data);
    };
    if (user) {
      fetchCurrentUser();
    }
  }, [user]);

  useEffect(() => {
    async function fetchAllUsers() {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/allUsers`
      );
      setAllUsers(res.data);
    }
    fetchAllUsers();
  }, []);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function handleOpen() {
    setIsOpen(true);
  }

  function handleNotificationIconClick() {
    props.OpenSideBar();
  }

  function handleSearchChange(evt) {
    setSearchWord(evt.target.value);
    setSearchResult(
      allUsers.filter(
        (user) =>
          user.username.includes(evt.target.value) ||
          user.name.includes(evt.target.value)
      )
    );
    if (evt.target.value === "") {
      setSearchResult(null);
    }
  }

  function handleSearchUserClick(evt) {
    setSearchWord("");
    setSearchResult(null);
  }

  return (
    <div className={classes.container} onClick={isOpen ? handleClick : null}>
      <div className={classes.innerContainer}>
        <div className={classes.left}>
          <Link to="/" className={classes.logo}>
            CONNECT
          </Link>
          <Link to="/" className={classes.smLogo}>
            Cnct.
          </Link>
        </div>
        <div className={classes.center}>
          <div className={classes.searchBar}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <RiSearchFill className={classes.searchIcon} />
              <input
                type="search"
                placeholder="Search..."
                className={classes.searchbarInput}
                value={searchWord}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className={classes.searchResult}>
            {searchResult
              ? searchResult.map((user) => (
                  <div className={classes.searchResultItem}>
                    <img
                      src={
                        user.profilePicture.url
                          ? user.profilePicture.url
                          : `https://api.dicebear.com/5.x/avataaars/svg?seed=${user.username}`
                      }
                      className={classes.searchUserImg}
                      alt=""
                    />
                    <div className={classes.searchResultItemLink}>
                      <Link
                        to={`/profile/${user.username}`}
                        className={`${classes.searchLink} ${classes.searchName}`}
                        onClick={handleSearchUserClick}
                      >
                        {user.name}
                      </Link>
                      <Link
                        to={`/profile/${user.username}`}
                        className={`${classes.searchLink} ${classes.searchUserName}`}
                        onClick={handleSearchUserClick}
                      >
                        <i>@{user.username}</i>
                      </Link>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className={classes.right}>
          <div style={{ marginRight: "1rem" }}>
            <Link to="/" className={classes.iconLink}>
              <Badge badgeContent={0} color="primary" variant="dot">
                <AiTwotoneHome />
              </Badge>
            </Link>
            <Link className={classes.iconLink}>
              <Badge badgeContent={0} color="primary">
                <MdDarkMode />
              </Badge>
            </Link>
            <Link className={classes.iconLink}>
              <Badge badgeContent={props.n_notifications} color="primary">
                <IoMdNotifications onClick={handleNotificationIconClick} />
              </Badge>
            </Link>
          </div>
          <div
            className={classes.avatar}
            onClick={handleClick}
            onMouseEnter={handleOpen}
          >
            {currentUser && (
              <Avatar
                alt="Remy Sharp"
                src={
                  currentUser.profilePicture.url
                    ? `${currentUser.profilePicture.url}`
                    : `https://api.dicebear.com/5.x/avataaars/svg?seed=${currentUser.username}`
                }
                style={{
                  border: ".2rem solid white",
                  boxShadow:
                    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
                }}
              />
            )}
          </div>
          <div
            className={classes.userMenu}
            style={{ display: isOpen ? "block" : "none" }}
          >
            <UserMenu
              currentUsername={
                props.currentUser ? props.currentUser.username : null
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
