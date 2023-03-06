import { makeStyles } from "@mui/styles";

import UserListItem from "./UserListItem";

const useStyles = makeStyles({
  container: {
    margin: "1rem 0rem",
    width: "90%",
    minHeight: "50%",
    overflowY: "scroll",
    overflowX: "hidden",
    backgroundColor: "white",
    borderRadius: ".6rem",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
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
  noUser:{
    width:'100%',
    height:'100%',
    color:'var(--purple-1)',
    display:'flex',
    alignItems:'center',
    justifyContent: 'center',
    fontSize:'1.5rem',
    fontWeight:'bold',
  }
});

const UsersList = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {props.users&&props.users.length!==0?props.users.map((user) => (
        <UserListItem
          key={user}
          userId={user}
          currentUser={props.currentUser}
          setuser={props.setuser}
          setfriendSuggestion={props.setfriendSuggestion}
          setPosts={props.setPosts}
        />
      )):<div className={classes.noUser}>No {props.type} found!😕</div>}
    </div>
  );
};

export default UsersList;
