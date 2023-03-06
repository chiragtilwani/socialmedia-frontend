import React from "react";
import { makeStyles } from "@mui/styles";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";

import Sizes from "../../Sizes";

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
    zIndex:'2',
    boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px 3px, rgba(0, 0, 0, 0.2) 0px 3px 0px inset',
    [Sizes.up("md")]: {
      display: "none",
    },
  },
  innerContainer:{
    width:'80%',
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
});

function BottomNavbar(props) {
  const classes = useStyles();

  function handleNotificationIconClick() {
    props.OpenSideBar();
  }
  return (
    <div className={classes.container}>
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
        <Link  className={classes.iconLink}>
          <Badge badgeContent={props.n_notifications} color="primary" variant="dot">
            <IoMdNotifications onClick={handleNotificationIconClick}/>
          </Badge>
        </Link>
        <Link to="/" className={classes.iconLink}>
          <Badge badgeContent={4} color="primary">
            <BsFillChatDotsFill />
          </Badge>
        </Link>
      </div>
    </div>
  );
}

export default BottomNavbar;
