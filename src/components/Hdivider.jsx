import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  Hdivider: {
    width: "100%",
    height: ".2rem",
    backgroundColor: "var(--purple-3)",
  },
});

const Hdivider = () => {
  const classes = useStyles();
  return <div className={classes.Hdivider}></div>;
};

export default Hdivider;