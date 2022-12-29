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

const UsersList = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {props.users.map((user) => (
        <UserListItem key={user.id} userInfo={user} />
      ))}
    </div>
  );
};

export default UsersList;
