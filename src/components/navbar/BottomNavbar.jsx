import React from "react";
import { makeStyles } from "@mui/styles";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";
import { IoMdNotifications } from "react-icons/io";
import { BsFillChatDotsFill } from "react-icons/bs";

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

function BottomNavbar() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <Link to="/" className={classes.iconLink}>
          <Badge badgeContent={4} color="primary" variant="dot">
            <AiTwotoneHome />
          </Badge>
        </Link>
        <Link to="/" className={classes.iconLink}>
          <Badge badgeContent={4} color="primary" variant="dot">
            <IoMdNotifications />
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
