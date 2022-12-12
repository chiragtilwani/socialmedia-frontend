import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { AiTwotoneHome } from "react-icons/ai";
import { RiSearchFill } from "react-icons/ri";
import Badge from "@mui/material/Badge";
import { IoMdNotifications } from "react-icons/io";
import { BsFillChatDotsFill } from "react-icons/bs";
import Sizes from "../Sizes";

const useStyles = makeStyles({
  container: {
    height: "3rem",
    width: "100vw",
    backgroundColor: "var(--purple-1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 1rem",
    [Sizes.up("xl")]: {
      width:'80%'
    },
  },
  logo: {
    fontWeight: "900",
    color: "white",
    textDecoration: "none",
    fontSize: "2rem",
    // margin: "0rem .5rem",
    // fontFamily:'var(--logo)'
  },
  center: {
    backgroundColor: "white",
    height: "2.5rem",
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "1.2rem",
    cursor: "pointer",
  },
  searchbar: {
    outline: "none",
    border: "none",
    width: "15rem",
    transition: "all .5s",
    padding: "0 .5rem",
    "&:focus": {
      width: "25rem",
    },
  },
  searchIcon: {
    backgroundColor: "white",
  },
  right: {
    display: "flex",
    // width:'20rem',
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconLink: {
    margin: "0 .8rem",
    fontSize: "1.4rem",
    color: "white",
    transitionDuration: ".2s",
    '&:hover':{
      color:'#0000007d',
    }
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
    letterSpacing:'.05rem',
    "&:hover": {
      opacity: ".7",
    },
    "&:active": {
      boxShadow: "inset .1rem .1rem rgba(0,0,0,0.8)",
    },
  },
});

const Navbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.innerContainer}>
        <div className={classes.left}>
          <Link to="/" className={classes.logo}>
            CONNECT
          </Link>
        </div>
        <div className={classes.center}>
          <RiSearchFill className={classes.searchIcon} />
          <input
            type="search"
            placeholder="Search for friend, place or thing"
            className={classes.searchbar}
          />
        </div>
        <div className={classes.right}>
          <div style={{ marginRight: "1rem" }}>
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
          <div>
            <span
              className={classes.span}
              style={{ backgroundColor: "#ffbc4c" }}
            >
              Register
            </span>
            <span
              className={classes.span}
              style={{ backgroundColor: "#42d542" }}
            >
              Login
            </span>
            <span className={classes.span} style={{ backgroundColor: "red" }}>
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;