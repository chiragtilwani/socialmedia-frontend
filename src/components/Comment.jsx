import { makeStyles } from "@mui/styles";

import CommentItem from "./CommentItem";

const useStyles = makeStyles({
  container: {
    width: "100%",
    overflowY: "scroll",
    transitionDuration:".2s",
    "&::-webkit-scrollbar": {
      width: ".25rem",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "white",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "var(--purple-2)",
      borderRadius: "20rem",
      "&:hover": {
        backgroundColor: "var(--purple-1)",
      },
    },
  },
});

const Comment = (props) => {
  const classes = useStyles();

  const comments = [
    {
      id: 1,
      name: "chirag tilwani",
      username: "chiragTilwani",
      text: "this is first dummy comment",
      likes: 123,
    },
    {
      id: 2,
      name: "chirag tilwani",
      username: "chiragTilwani",
      text: "this is first dummy comment",
      likes: 123,
    },
    {
      id: 3,
      name: "chirag tilwani",
      username: "chiragTilwani",
      text: "this is first dummy comment",
      likes: 123,
    },
    {
      id: 4,
      name: "chirag tilwani",
      username: "chiragTilwani",
      text: "this is first dummy comment",
      likes: 123,
    },
  ];
  return (
    <div className={classes.container} style={{height:props.showComments?'20rem':'0rem'}}>
      {comments.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default Comment;
