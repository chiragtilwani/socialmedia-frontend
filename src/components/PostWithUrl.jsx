import { makeStyles } from "@mui/styles";
import PostsWithUrlItem from "./PostsWithUrlItem";

const useStyles = makeStyles({
  container:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: "white",
    boxShadow: "0rem 0rem .5rem .05rem var(--purple-2)",
    borderRadius:'.5rem',
    transitionDuration:'.2s',
    marginBottom:'2rem'
  },
  innerContainer: {
    display: "flex",
    flexWrap: "wrap",
    gridTemplateColumns: "4fr 4fr 4fr",
    columnGap: "1%",
    rowGap:'.5rem',
    padding: ".5rem",
    width:'100%',
  },
});

const PostWithUrl = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container} style={{transform:props.show?'scale(1)':'scale(0)',height:props.show?'fit-content':'0',position:props.show?'':'absolute'}}><div className={classes.innerContainer} >
      {props.posts.map(post => (
        <PostsWithUrlItem {...post} />
      ))}
    </div></div>
  );
};

export default PostWithUrl;
