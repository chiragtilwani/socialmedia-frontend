import { makeStyles } from "@mui/styles";

import FollowerListItem from './FollowerListItem'

const useStyles = makeStyles({
  container: {
    margin: "1rem 0rem",
    width:'90%',
    maxHeight:'50%',
    overflowY: 'scroll',
    overflowX: 'hidden',
    backgroundColor:'white',
    borderRadius:'1rem',
    '&::-webkit-scrollbar':{
        display: 'none',
      }
  },
});

const FollowingYou = () => {
  const classes = useStyles();
  const followers = [
    { id:1,name: "rahul tilwani", username: "rtilwani03", profilePicture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTazRa-UljlJ57z2tqmSNSz5X_C5RkD1S-Nfj46b_ZO&s" },
    { id:2,name: "sid tilwani", username: "rtilwani03", profilePicture: "https://media.istockphoto.com/id/1321610286/photo/smiling-hispanic-mature-man-front-and-profile-mugshots.jpg?s=612x612&w=is&k=20&c=cZcMC5MoaEKVJ92hX8JoHkiGuWZA2jbaTzbyAlv3t9Q=" },
    { id:3,name: "lavina tilwani", username: "ltilwani03", profilePicture: "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg" },
    { id:4,name: "lavina tilwani", username: "ltilwani03", profilePicture: "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg" },{ id:5,name: "lavina tilwani", username: "ltilwani03", profilePicture: "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg" },{ id:6,name: "lavina tilwani", username: "ltilwani03", profilePicture: "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg" },{ id:7,name: "lavina tilwani", username: "ltilwani03", profilePicture: "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg" },{ id:8,name: "lavina tilwani", username: "ltilwani03", profilePicture: "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg" },{ id:9,name: "lavina tilwani", username: "ltilwani03", profilePicture: "https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg" }
  ];
  return <div className={classes.container}>{
    followers.map(follower=><FollowerListItem key={follower.id} follower={follower}/>)
  }</div>;
};

export default FollowingYou;
