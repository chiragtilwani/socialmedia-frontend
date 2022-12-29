import { makeStyles } from "@mui/styles";
import { IoMdPhotos } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";

const useStyles = makeStyles({
  container: {
    width: "90%",
    margin: "1rem 0rem",
    padding: ".5rem",
    backgroundColor: "white",
    borderRadius:'1.2rem'
  },
  profile_textfield: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin:'.5rem 0rem'
  },
  profile: {
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
    border: ".2rem solid var(--purple-1)",
  },
  textfield: {
    width: "80%",
    height:'4rem',
    backgroundColor:'var(--purple-3)',
    borderRadius:'1.2rem',
    outline:'none',
    border:'.2rem solid var(--purple-2)',
    padding:'1rem'
  },
  Hdivider: {
    width: "100%",
    height: ".2rem",
    backgroundColor: "var(--purple-3)",
  },
  Vdivider: {
    height: "100%",
    width: ".2rem",
    backgroundColor: "var(--purple-3)",
  },
  btnContainer:{
    display:'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height:'3rem'
  },
  photoUploader:{
    color:'tomato',
    fontSize:'1.5rem',
    cursor:'pointer',
    '&:hover':{
        opacity:'.5'
    }
  },
  videoUploader:{
    color:'#3cb73c',
    fontSize:'1.8rem',
    cursor:'pointer',
    '&:hover':{
        opacity:'.5'
    }
},
btn:{
    padding:'.5rem',
    cursor:'pointer',
    backgroundColor:'var(--purple-1)',
    color:'white',
    outline:'none',
    borderRadius:'.5rem',
    fontWeight:'bold',
    borderWidth:'0rem',
    '&:hover':{
        opacity:'.5'
    }
  }
});

const UploadPost = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <form>
        <div className={classes.profile_textfield}>
          <div
            className={classes.profile}
            style={{
              background:
                "url(https://newprofilepic2.photo-cdn.net//assets/images/article/profile.jpg)",
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
          ></div>
          <input type="textfield"
            className={classes.textfield}
            placeholder="What's Happening ?"
          />
        </div>
        <div className={classes.Hdivider}></div>
        <div className={classes.btnContainer}>
          <IoMdPhotos className={classes.photoUploader} title="PHOTO"/>
          <div className={classes.Vdivider}></div>
          <MdVideoCall className={classes.videoUploader} title="VIDEO"/>
          <div className={classes.Vdivider}></div>
          <button className={classes.btn}>POST</button>
        </div>
        <div className={classes.Hdivider}></div>
      </form>
    </div>
  );
};

export default UploadPost;
