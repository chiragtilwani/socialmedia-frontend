import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    width: "7rem",
    height: "2rem",
    marginBottom: "3rem",
    fontSize: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pageCount: {
    width: "2rem",
    height: "2rem",
    backgroundColor: "var(--bg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--purple-1)",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
});

const Pagination = (props) => {
  const classes = useStyles();

  function handleNextClick() {
    props.setPageNum((prevState) => prevState + 1);
  }
  function handlePrevClick() {
    props.setPageNum((prevState) => prevState - 1);
  }

  return props.totalPages > 1 ? (
    <div className={classes.container}>
      <span
        style={{
          color: props.pageNum === 1 ? "var(--purple-2)" : "var(--purple-1)",
          fontWeight: "bolder",
          cursor: "pointer",
        }}
        onClick={props.pageNum === 1 ? null : handlePrevClick}
      >
        <Link
          to={props.pageNum === 1 ? null : `/page/${props.pageNum - 1}`}
          style={{
            color: props.pageNum === 1 ? "var(--purple-2)" : "var(--purple-1)",
            textDecoration: "none",
          }}
        >
          &#171;
        </Link>
      </span>

      <span className={classes.pageCount}>{props.pageNum}</span>

      <span
        style={{
          color:
            props.pageNum === props.totalPages
              ? "var(--purple-2)"
              : "var(--purple-1)",
          fontWeight: "bolder",
          cursor: "pointer",
        }}
        onClick={props.pageNum === props.totalPages ? null : handleNextClick}
      >
        <Link
          to={
            props.pageNum === props.totalPages
              ? null
              : `/page/${props.pageNum + 1}`
          }
          style={{
            color:
              props.pageNum === props.totalPages
                ? "var(--purple-2)"
                : "var(--purple-1)",
            textDecoration: "none",
          }}
        >
          &#187;
        </Link>
      </span>
    </div>
  ) : null;
};

export default Pagination;
