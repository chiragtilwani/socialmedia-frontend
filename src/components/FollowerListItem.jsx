import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    border: ".1rem solid",
    borderLeft: 0,
    borderRight: 0,
    padding:'.2rem',
    cursor:'pointer',
    "&:hover": {
      backgroundColor: "var(--purple-2)",
    },
  },
  profile: {
    width: "4rem",
    height: "4rem",
    borderRadius: "50%",
    border: ".2rem solid var(--purple-1)",
  },
  name_username: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  username: {
    marginBottom: ".1rem",
    fontWeight: "bold",
  },
  name:{
    textTransform:'capitalize'
  },
  btn: {
    padding: ".5rem",
    backgroundColor: "var(--purple-1)",
    color: "white",
    borderRadius: ".3rem",
    outline:'none',
    border:"none",
    "&:hover": {
      opacity: ".8",
      cursor: "pointer",
    },
  },
});

const FollowerListItem = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div
        className={classes.profile}
        style={{
          background: `url(${props.follower.profilePicture})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
        }}
      ></div>
      <div className={classes.name_username}>
        <span className={classes.username}>{props.follower.username}</span>
        <span className={classes.name}>{props.follower.name}</span>
      </div>
      <button className={classes.btn}>Follow</button>
      {/*later we will dynamically change this button's text to follow/unfollow based on if current user's following list have this user or not*/}
    </div>
  );
};

export default FollowerListItem;
