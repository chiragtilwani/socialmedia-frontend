import { makeStyles } from "@mui/styles";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

import { reset, logout } from "../../features/auth/authSlice";
import { useState } from "react";
import axios from "axios";

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
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {user} = useSelector((state) => state.auth);

  function handleLogoutClick() {
    navigate("/login");
    dispatch(logout());
    dispatch(reset());
  }
  async function handleDeleteAccount() {
    setOpen(false);
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${user._id}`, {
      headers: { authorization: "Bearer " + user.token },
      data: { userId: user._id }
    });
    //call logout func from dispatch to delete user from localstorage //navigate to /login
    handleLogoutClick()
  }
  return (
    <div className={classes.container}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Connect Account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your <strong>CONNECT</strong> account?<br></br>{" "}
            Account once deleted, all posts associated with your account will be
            deleted and you can <strong>never</strong> rollback.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteAccount} autoFocus>
            Continue
          </Button>
        </DialogActions>
      </Dialog>
      {user ? (
        <>
          <Link
            to={`/profile/${props.currentUsername}`}
            className={classes.item}
          >
            {/*here instead of 1 we will use currentUser's id*/}
            Profile
          </Link>
          <Link to="" onClick={handleClickOpen} className={classes.item}>
            Delete Account
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
