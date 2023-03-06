import { makeStyles } from "@mui/styles";
import { AiOutlineClose } from "react-icons/ai";
import { ButtonBase } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import * as React from "react";

import Sizes from '../Sizes'

const useStyles = makeStyles({
  container: {
    height: "100vh",
    width: "25vw",
    position: "fixed",
    right: 0,
    top: 0,
    zIndex: 5,
    backgroundColor: "white",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
    transitionDuration: ".2s",
    [Sizes.down('md')]:{
      width:'50vw'
    },
    [Sizes.down('sm')]:{
      width:'100vw'
    }
  },
  header: {
    height: "3rem",
    boxShadow:
      "rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset",
    display: "flex",
    alignItems: "center",
  },
  closeIcon: {
    color: "var(--purple-1)",
    fontSize: "1.5rem",
    fontWeight: "bolder",
  },
  headerTitle: {
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    letterSpacing: ".1rem",
    overflow: "hidden",
    transitionDuration: ".2s",
  },
  notificationContainer: {
    height: "100%",
    overflowY: "scroll",
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
  },
  notification: {
    width: "100%",
    height: "4rem",
    borderBottom: ".2rem solid var(--purple-2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // wordBreak:'break-word',
    // backgroundColor:'red',
    padding: "0 .5rem",
    textDecoration: "none",
    color: "black",
  },
});
function NotificationBar(props) {
  const classes = useStyles();
  const [notifications, setNotifications] = useState(null);
  const [error, setError] = useState();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    async function fetchNotifications() {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users?userId=${props.currentUser._id}`
      );
      setNotifications(res.data.notifications);
      props.handleNotificationCount(res.data.notifications.length);
    }

    fetchNotifications();
  }, [props]);

  async function handleCloseClick() {
    props.CloseSideBar();
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/clearNotifications`,
        { userId: props.currentUser._id }
      );
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users?userId=${props.currentUser._id}`
      );
      setNotifications(res.data.notifications);
    } catch (err) {
      setError(err.response.data.message);
      setOpen(true);
    }
  }
  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Stack>

      <div
        className={classes.container}
        style={{ width: props.openSideBar ? "" : "0vw" }}
      >
        <div className={classes.header}>
          <ButtonBase
            style={{
              marginLeft: "1rem ",
              padding: ".5rem ",
              borderRadius: "50% ",
              display: "flex ",
              alignItems: "center ",
              justifyContent: "center",
            }}
            onClick={handleCloseClick}
          >
            <AiOutlineClose className={classes.closeIcon} />
          </ButtonBase>
          <p
            className={classes.headerTitle}
            style={{ width: props.openSideBar ? "80%" : "0" }}
          >
            NOTIFICATIONS
          </p>
        </div>
        <div className={classes.notificationContainer}>
          {notifications
            ? notifications.map((notification) => {
                let username = notification.split(" ")[0];
                return (
                  <Link
                    to={`/profile/${username}`}
                    className={classes.notification}
                    onClick={handleCloseClick}
                  >
                    {notification}
                  </Link>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}

export default NotificationBar;
