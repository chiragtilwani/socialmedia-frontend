import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "var(--purple-2)",
  },
  card: {
    width: "50%",
    height: "70vh",
    display: "flex",
    flexDirection: "row",
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
    borderRadius:'2rem 0rem 0rem 0rem'
  },
  right: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: "white",
    borderRadius:'0rem 0rem 2rem 0rem'
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
});

const Login = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.left}>
          <h1 className={classes.h1}>Hello World.</h1>
          <p className={classes.p}>
            Welcome to <span className={classes.span}>CONNECT</span>.
          </p>
          <p className={classes.p}>
            Stay connected to the world with{" "}
            <span className={classes.span}>CONNECT</span>.
          </p>
          <p className={classes.p} style={{ marginTop: "1.5rem" }}>
            Don't have an account ?
          </p>
          <Link to="/register" className={classes.link}>
            Register
          </Link>
        </div>
        <div className={classes.right}>
          <h1 className={classes.h2}>Login</h1>
          <form className={classes.form}>
            <input
              type="text"
              placeholder="username"
              className={classes.input}
            />
            <input
              type="text"
              placeholder="password"
              className={classes.input}
            />
            <button type="submit" className={classes.btn}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
