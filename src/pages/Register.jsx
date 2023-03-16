import { makeStyles } from "@mui/styles";
import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import * as React from "react";

import { register, reset } from "../features/auth/authSlice";
import Sizes from "../Sizes";
import Loading from "../components/Loading";

const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "var(--purple-2)",
    flexDirection: "column",
    zIndex: 3,
    position: "absolute",
  },
  card: {
    width: "50%",
    height: "70vh",
    display: "flex",
    flexDirection: "row",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    borderRadius: "0rem 2rem 0rem 2rem",
    [Sizes.down("md")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  right: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2rem",
    background:
      'linear-gradient(rgba(39, 11, 96, 0.5), rgba(39, 11, 96, 0.5)), url("https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600")',
    backgroundPosition: "center",
    backgroundSize: "100% 100%",
    borderRadius: "0rem 2rem 0rem 0rem",
    [Sizes.down("md")]: {
      borderRadius: "0rem",
    },
    [Sizes.down("sm")]: {
      display: "none",
    },
  },
  left: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: "white",
    borderRadius: "0rem 0rem 0rem 2rem",
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
    margin: ".5rem 0rem",
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
    marginTop: "1rem",
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
  loginLink: {
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

const Register = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [open, setOpen] = useState(false);

  const email = useRef();
  const password = useRef();
  const username = useRef();
  const name = useRef();

  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

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
    if (isError) {
      setError(message);
      setOpen(true);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isError, message, isSuccess, navigate, dispatch]);

  function handleSubmit(evt) {
    evt.preventDefault();
    const userData = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
      username: username.current.value,
    };
    dispatch(register(userData));
  }
  
  return (
    <div className={classes.container}>
      {isLoading ? (
        <Loading />
      ) : (
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

          <div className={classes.card}>
            <div className={classes.left}>
              <h1 className={classes.h2}>Register</h1>
              <form className={classes.form} onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  required
                  ref={name}
                  className={classes.input}
                />
                <input
                  type="text"
                  placeholder="Username"
                  required
                  ref={username}
                  className={classes.input}
                />

                <input
                  type="email"
                  required
                  placeholder="Email"
                  ref={email}
                  className={classes.input}
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  ref={password}
                  className={classes.input}
                />
                <button type="submit" className={classes.btn}>
                  Register
                </button>
              </form>
              <div className={classes.linkContainer}>
                <p className={classes.loginLink}>
                  Already have an account ?
                  <Link to="/login" style={{ fontWeight: "900" }}>
                    Login
                  </Link>
                </p>
              </div>
            </div>
            <div className={classes.right}>
              <h1 className={classes.h1}>Connect.</h1>
              <p className={classes.p}>
                Welcome to <span className={classes.span}>CONNECT</span>.
              </p>
              <p className={classes.p}>
                Stay connected with friends and the world around you on{" "}
                <span className={classes.span}>CONNECT</span>.
              </p>
              <p className={classes.p} style={{ marginTop: "1.5rem" }}>
                Already have an account ?
              </p>
              <Link to="/login" className={classes.link}>
                Login
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Register;
