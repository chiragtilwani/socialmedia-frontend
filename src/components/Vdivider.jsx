import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  Vdivider: {
    height: "100%",
    width: ".2rem",
    backgroundColor: "var(--purple-3)",
  },
});

const Vdivider = () => {
  const classes = useStyles();
  return <div className={classes.Vdivider}></div>;
};

export default Vdivider;
