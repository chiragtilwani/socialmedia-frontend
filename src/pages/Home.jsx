import { makeStyles } from "@mui/styles";

import Sizes from "../Sizes";
import Navbar from "../components/navbar/Navbar";
import BottomNavbar from "../components/navbar/BottomNavbar";
import PofileCard from "../components/PofileCard";
import FollowingYou from "../components/FollowingYou";

const useStyles = makeStyles({
  outterContainer: {
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--purple-3)",
    // position: "fixed",
    marginTop: "3rem",
  },

  container: {
    border: ".2rem solid",
    display: "grid",
    gridTemplateColumns: "2fr 4fr 2fr",
    height: "100vh",
    columnGap: "2rem",
    width: "100%",
    overflow: "scroll",
    [Sizes.down("md")]: {
      marginBottom: "2.5rem",
      gridTemplateColumns:'4fr'
    },
    [Sizes.up("xl")]: {
      width: "80%",
    },
    '&::-webkit-scrollbar':{
      display:'none'
    }
  },
  childContainer: {
    border: ".2rem solid",
  },
  left: {
    display: "flex",
    alignItems: "center",
    flexDirection:'column',
    height:'100%',
    overflowY:'scroll',
    [Sizes.down("md")]: {
      display: "none",
    },
  },
  right: {
    [Sizes.down("md")]: {
      display: "none",
    },
  },
  h3:{
    marginTop:'2rem',
    textTransform:'capitalize'
  }
});

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.outterContainer}>
        <Navbar />
        <div className={classes.container}>
          <div className={`${classes.left} ${classes.childContainer}`}>
            <PofileCard />
            <h3 className={classes.h3}>who is following you</h3>
            <FollowingYou/>
          </div>
          <div className={`${classes.center} ${classes.childContainer}`}></div>
          <div className={`${classes.right} ${classes.childContainer}`}>
            {/* whom you follow */}
          </div>
        </div>
      </div>
      <BottomNavbar />
    </>
  );
};

export default Home;
