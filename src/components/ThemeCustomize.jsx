import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import SIZES from "../Sizes";

const useStyles = makeStyles({
  container: {
    backgroundColor: "rgba(0,0,0,.5)",
    position: "absolute",
    width: "100vw",
    height: "100vh",
    top: 0,
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    borderRadius: "2rem",
    width: "30%",
    height: "40vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "var(--bg)",
    color:'var(--text1)',
    [SIZES.down("md")]: {
      width: "100vw",
      height: "100vh",
    },
  },
  heading: {
    marginBottom: "1.5rem",
    fontSize: "2rem",
  },
  para: {
    marginBottom: "1.5rem",
    fontSize: "1.2rem",
    width: "80%",
    textAlign: "center",
  },
  colorOutterContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  colorContainer: {
    height: "3rem",
    width: "70%",
    borderRadius: "2rem",
    backgroundColor: "var(--purple-2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  span: {
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    border: ".2rem solid black",
    cursor: "pointer",
  },
  backgroundColorOutterContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    margin: "2rem",
  },
  backgroundColorContainer: {
    backgroundColor: "var(--purple-2)",
    height: "3rem",
    width: "70%",
    borderRadius: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  BackgroundColorspan: {
    width: "7rem",
    height: "2.5rem",
    borderRadius: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    cursor: "pointer",
  },
  backgroundColorInnerSpan: {
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "50%",
    border: ".2rem solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const ThemeCustomize = (props) => {
  const classes = useStyles();

  const [open,setOpen]=useState(props.openThemeCustomizeOption)

  function colorSelected(index) {
    const colors = ["purple", "yellow", "red", "green", "blue"];
    document.documentElement.style.setProperty(
      "--purple-1",
      `var(--${colors[index]})`
    );
  }

  function bgColorSelected(index) {
    const colors = ["bg-1", "bg-2", "bg-3"];
    document.documentElement.style.setProperty(
      "--bg",
      `var(--${colors[index]})`
    );
    if (index === 0) {
      document.documentElement.style.setProperty("--text1", `var(--text1)`);
      document.documentElement.style.setProperty("--purple-3", `#E5ECF4`);
    } else if (index === 1) {
      document.documentElement.style.setProperty("--text1", `var(--text2)`);
      document.documentElement.style.setProperty(
        "--purple-3",
        `var(--page-color-1)`
      );
    } else {
      document.documentElement.style.setProperty("--text1", `var(--text2)`);
      document.documentElement.style.setProperty(
        "--purple-3",
        `var(--page-color-2)`
      );
    }
  }

  function handleClick(evt){
    evt.stopPropagation()
   props.changeOpenThemeCustomizeOption()
  }
  return (
    <div className={classes.container} style={{display:props.openColorCustomize?'flex':'none'}} onClick={handleClick}>
      <div className={classes.card}>
        <h1 className={classes.heading}>Customize your view</h1>
        <p className={classes.para}>
          Set <strong>Color</strong> and <strong>Background color </strong>
          according to your preference.
        </p>
        <div className={classes.colorOutterContainer}>
          <span
            style={{
              fontWeight: "bold",
              marginBottom: ".5rem",
              fontSize: "1.2rem",
            }}
          >
            Color
          </span>
          <div className={classes.colorContainer}>
            <span
              onClick={() => {
                colorSelected(0);
              }}
              className={classes.span}
              style={{ backgroundColor: "var(--purple)" }}
            ></span>
            <span
              onClick={() => {
                colorSelected(1);
              }}
              className={classes.span}
              style={{ backgroundColor: "var(--yellow)" }}
            ></span>
            <span
              onClick={() => {
                colorSelected(2);
              }}
              className={classes.span}
              style={{ backgroundColor: "var(--red)" }}
            ></span>
            <span
              onClick={() => {
                colorSelected(3);
              }}
              className={classes.span}
              style={{ backgroundColor: "var(--green)" }}
            ></span>
            <span
              onClick={() => {
                colorSelected(4);
              }}
              className={classes.span}
              style={{ backgroundColor: "var(--blue)" }}
            ></span>
          </div>
        </div>
        <div className={classes.backgroundColorOutterContainer}>
          <span
            style={{
              fontWeight: "bold",
              margin: ".5rem 0",
              fontSize: "1.2rem",
            }}
          >
            Background Color
          </span>
          <div className={classes.backgroundColorContainer}>
            <span
              onClick={() => {
                bgColorSelected(0);
              }}
              className={classes.BackgroundColorspan}
              style={{ backgroundColor: "var(--bg-1)",color:'black' }}
            >
              <span className={classes.backgroundColorInnerSpan}>
              </span>
              <p>Light</p>
            </span>
            <span
              onClick={() => {
                bgColorSelected(1);
              }}
              className={classes.BackgroundColorspan}
              style={{ backgroundColor: "var(--bg-2)", color: "white" }}
            >
              <span className={classes.backgroundColorInnerSpan}>
              </span>
              <p>Dim</p>
            </span>
            <span
              onClick={() => {
                bgColorSelected(2);
              }}
              className={classes.BackgroundColorspan}
              style={{ backgroundColor: "var(--bg-3)", color: "white" }}
            >
              <span className={classes.backgroundColorInnerSpan}>
              </span>
              <p>Light out</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomize;
