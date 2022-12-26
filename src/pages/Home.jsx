import { makeStyles } from "@mui/styles";

import Sizes from "../Sizes";
import Navbar from "../components/navbar/Navbar";
import BottomNavbar from "../components/navbar/BottomNavbar";


const useStyles = makeStyles({
  outterContainer: {
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--purple-3)",
  },

  container: {
    border: ".2rem solid",
    display: "grid",
    gridTemplateColumns: "2fr 4fr 2fr",
    height: "100vh",
    columnGap: "2rem",
    width: "100%",
    marginTop: "3rem",
    [Sizes.down('md')]:{
      marginBottom:'2.5rem'
    },
    [Sizes.up("xl")]: {
      width: "80%",
    },
  },
  childContainer: {
    border: ".2rem solid",
  },
});

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <div className={classes.outterContainer}>
        <div className={classes.container}>
          <div className={`${classes.left} ${classes.childContainer}`}></div>
          <div className={`${classes.center} ${classes.childContainer}`}></div>
          <div className={`${classes.right} ${classes.childContainer}`}></div>
        </div>
      </div>
      <BottomNavbar/>
    </>
  );
};

export default Home;
