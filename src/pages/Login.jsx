import { makeStyles } from "@mui/styles";
import { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";

import { login, reset } from "../features/auth/authSlice";
import Sizes from "../Sizes";
import Loading from "../components/Loading";

const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "var(--purple-2)",
    zIndex: 3,
    position: "absolute",
  },
  card: {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    borderRadius: "2rem 0rem 2rem 0rem",
    width: "50%",
    height: "70vh",
    display: "flex",
    flexDirection: "row",
    [Sizes.down("md")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  left: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2rem",
    background:
      'linear-gradient(rgba(39, 11, 96, 0.5), rgba(39, 11, 96, 0.5)), url("https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600")',
    backgroundPosition: "center",
    backgroundSize: "100% 100%",
    borderRadius: "2rem 0rem 0rem 0rem",
    [Sizes.down("md")]: {
      borderRadius: "0rem",
    },
    [Sizes.down("sm")]: {
      display: "none",
    },
  },
  right: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: "white",
    borderRadius: "0rem 0rem 2rem 0rem",
    [Sizes.down("md")]: {
      borderRadius: "0rem",
    },
    [Sizes.down("sm")]: {
      width: "100%",
      height: "100%",
      borderRadius: "0rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  h1: {
    fontSize: "4rem",
    color: "white",
  },
  p: {
    color: "white",
  },
  span: {
    fontWeight: "900",
    fontSize: "1rem",
  },
  link: {
    fontWeight: "900",
    width: "50%",
    height: "2.5rem",
    marginTop: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    color: "var(--purple-1)",
    textDecoration: "none",
    fontSize: "1.5rem",
    border: "none",
    borderRadius: ".2rem",
  },
  h2: {
    color: "var(--purple-1)",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    [Sizes.down("sm")]: {
      width: "100%",
    },
  },
  input: {
    margin: "1rem 0rem",
    borderWidth: "0rem",
    outline: "none",
    height: "2.5rem",
    transitionDuration: ".5s",
    "&:focus": {
      borderBottomColor: "var(--purple-1)",
      borderWidth: "0rem 0rem .2rem 0rem",
    },
  },
  btn: {
    margin: "1rem 0rem",
    height: "2.5rem",
    width: "50%",
    fontSize: "1.2rem",
    backgroundColor: "var(--purple-1)",
    color: "white",
    border: "none",
    borderRadius: ".2rem",
    fontWeight: "bold",
  },
  linkContainer: {
    [Sizes.down("sm")]: {
      marginTop: "3rem",
    },
  },
  registerLink: {
    fontWeight: "300",
    letterSpacing: ".05rem",
    [Sizes.up("sm")]: {
      display: "none",
    },
  },
  homePageLink: {
    marginTop: "1rem",
    fontWeight: "300",
    letterSpacing: ".05rem",
  },
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = React.useState();
  const [isFetching, setIsFetching] = React.useState(false);
  const username_email = useRef();
  const password = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    setIsFetching(true)
    if (isError) {
      setIsFetching(false)
      setOpen(true);
      setErr(message);
    }
    if (isSuccess || user) {
      setIsFetching(false)
      navigate("/");
    }
    dispatch(reset());
    setIsFetching(false)
  }, [user, isError, message, isSuccess, navigate, dispatch]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  async function handleSubmit(evt) {
    evt.preventDefault();
    const userData = {
      username_email: username_email.current.value,
      password: password.current.value,
    };
    setIsFetching(true);
    dispatch(login(userData));
    setIsFetching(false);
  }

  return (
    <div className={classes.container}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {err}
          </Alert>
        </Snackbar>
      </Stack>
      {isFetching ? (
        <Loading />
      ) : (
        <div className={classes.card}>
          <div className={classes.left}>
            <h1 className={classes.h1}>Hello World.</h1>
            <p className={classes.p}>
              Welcome to <span className={classes.span}>CONNECT</span>.
            </p>
            <p className={classes.p}>
              Stay connected with friends and the world around you on{" "}
              <span className={classes.span}>CONNECT</span>.
            </p>
            <p className={classes.p} style={{ marginTop: "1.5rem" }}>
              Don't have an account ?
            </p>
            <Link to="/register" className={classes.link} disabled={isFetching}>
              {isFetching ? (
                <CircularProgress style={{ color: "white", width: "2rem" }} />
              ) : (
                "Register"
              )}
            </Link>
          </div>
          <div className={classes.right}>
            <h1 className={classes.h2}>Login</h1>
            <form className={classes.form} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username or Email"
                ref={username_email}
                required
                className={classes.input}
              />
              <input
                type="password"
                placeholder="Password"
                ref={password}
                required
                className={classes.input}
              />
              <button
                type="submit"
                className={classes.btn}
                disabled={isFetching}
                style={{ cursor: isFetching ? "not-allowed" : "pointer" }}
              >
                {isFetching ? (
                  <CircularProgress style={{ color: "white", width: "2rem" }} />
                ) : (
                  "Login"
                )}
              </button>
            </form>
            <div className={classes.linkContainer}>
              <p className={classes.registerLink}>
                Don't have an account ?
                <Link to="/register" style={{ fontWeight: "900" }}>
                  Register
                </Link>
              </p>
              <Link
                to="/forgotPassword"
                style={{ fontWeight: "900", color: "black" }}
              >
                Forgot Password
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
