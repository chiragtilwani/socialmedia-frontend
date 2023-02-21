import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {reset,logout}from '../../features/auth/authSlice'

const useStyles = makeStyles({
  container: {
    position: "absolute",
    right: "0rem",
    top: "0rem",
    border: ".1rem solid",
    borderBottom: "none",
    width: "10rem",
    borderRadius: ".2rem",
    overflow: "hidden",
  },
  item: {
    height: "3rem",
    backgroundColor: "var(--purple-2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: ".1rem solid",
    fontWeight: "bold",
    transitionDuration: ".2s",
    textDecoration: "none",
    color: "black",
    "&:hover": {
      backgroundColor: "var(--purple-1)",
      color: "white",
    },
  },
});

const UserMenu = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);

  function handleLogoutClick() {
    navigate("/login");
    dispatch(logout());
    dispatch(reset())
  }
  return (
    <div className={classes.container}>
      {user ? (
        <>
          <Link
            to={`/profile/${props.currentUsername}`}
            className={classes.item}
          >
            {/*here instead of 1 we will use currentUser's id*/}
            Profile
          </Link>
          <Link to="" onClick={handleLogoutClick} className={classes.item}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/register" className={classes.item}>
            Register
          </Link>
          <Link to="/login" className={classes.item}>
            Login
          </Link>
        </>
      )}
    </div>
  );
};

export default UserMenu;
