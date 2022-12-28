import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    width: "90%",
    height: "20rem",
    backgroundColor: "white",
    marginTop: "1rem",
    borderRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  coverImg: {
    width: "100%",
    height: "40%",
    borderRadius: "1rem 1rem 0rem 0rem",
    background:
      "url(https://images.pexels.com/photos/1323206/pexels-photo-1323206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
  },
  profileImg: {
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
    border: ".2rem solid var(--purple-1)",
    transform: "translateY(-50%)",
    background:
      "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTazRa-UljlJ57z2tqmSNSz5X_C5RkD1S-Nfj46b_ZO&s)",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    boxShadow: "0rem 0rem .5rem .05rem var(--purple-2)",
  },
  name: {
    marginTop: "-1.5rem",
    fontSize: "1.4rem",
    fontWeight: "bold",
    letterSpacing: ".05rem",
    wordBreak: "break-word",
    padding: ".5rem",
    marginBottom: "1rem",
    textTransform:'capitalize'
  },
  line: {
    width: "90%",
    height: ".2rem",
    backgroundColor: "var(--purple-3)",
    margin: ".5rem",
  },
  stats: {
    display: "flex",
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerStats: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  centerLine: {
    height: "90%",
    width: ".1rem",
    backgroundColor: "var(--purple-3)",
  },
});

const PofileCard = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.coverImg}></div>
      <div className={classes.profileImg}></div>
      <div className={classes.name}>Chirag Tilwani</div>
      <div className={classes.line}></div>
      <div className={classes.stats}>
        <div className={classes.innerStats}>
          <span style={{fontWeight:'bold',fontSize:'.9rem'}}>1234</span>
          <span style={{fontSize:'.8rem'}}>Followers</span>
        </div>
        <div className={classes.centerLine}></div>
        <div className={classes.innerStats}>
          <span style={{fontWeight:'bold',fontSize:'.9rem'}}>1234</span>
          <span style={{fontSize:'.8rem'}}>Followings</span>
        </div>
        <div className={classes.centerLine}></div>
        <div className={classes.innerStats}>
          <span style={{fontWeight:'bold',fontSize:'.9rem'}}>1234</span>
          <span style={{fontSize:'.8rem'}}>Posts</span>
        </div>
      </div>
      <div className={classes.line}></div>
    </div>
  );
};

export default PofileCard;
