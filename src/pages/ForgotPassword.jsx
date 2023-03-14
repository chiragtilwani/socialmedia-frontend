import { makeStyles } from "@mui/styles";
import { useRef, useState } from "react";

import Sizes from "../Sizes";

const useStyles = makeStyles({
  container: {
    backgroundColor: "var(--purple-2)",
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    borderRadius: "2rem 0rem 2rem 0rem",
    width: "50%",
    height: "70vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    [Sizes.down("xs")]: {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    },
  },
  h1: {
    fontSize: "2.3rem",
    color: "var(--purple-1)",
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: "3rem",
    margin: "3rem 0rem",
    borderWidth: "0rem",
    borderBottomWidth: ".2rem",
    outline: "none",
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
});

const ForgotPassword = () => {
  const classes = useStyles();
  const [showEmailInput, setShowEmailInput] = useState(true);
  // let otp = Math.floor(Math.random() * (999999 - 100000+1) + 100000);

  const email = useRef("");

  function handleSendOtpClick(evt) {
    evt.preventDefault();
    setShowEmailInput((prevState) => !prevState);
    email.current.value = "";
  }

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <h1 className={classes.h1}>Forgot Password</h1>
        <form onSubmit={handleSendOtpClick}>
          {showEmailInput ? (
            <input
              placeholder="Enter your Email..."
              type="email"
              className={classes.input}
              required
              ref={email}
              value={email.current.value}
            />
          ) : (
            <input
              placeholder="Enter otp..."
              className={classes.input}
              required
            />
          )}
          {showEmailInput ? (
            <button className={classes.btn} type="submit">
              Send OTP
            </button>
          ) : (
            <button className={classes.btn}>Submit</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
