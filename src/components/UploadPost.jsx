import { makeStyles } from "@mui/styles";
import { IoMdPhotos } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import Vdivider from "./Vdivider";
import Hdivider from "./Hdivider";

const useStyles = makeStyles({
  container: {
    width: "90%",
    margin: "1rem 0rem",
    padding: ".5rem",
    backgroundColor: "white",
    borderRadius:'.5rem',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
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

const UploadPost = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <form>
        <div className={classes.profile_textfield}>
          <div
            className={classes.profile}
            style={{
              background:
                `url(${props.profile})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
          ></div>
          <input type="textfield"
            className={classes.textfield}
            placeholder="What's Happening ?"
          />
        </div>
        <Hdivider/>
        <div className={classes.btnContainer}>
          <IoMdPhotos className={classes.photoUploader} title="PHOTO"/>
          <Vdivider/>
          <MdVideoCall className={classes.videoUploader} title="VIDEO"/>
          <Vdivider/>
          <button className={classes.btn}>POST</button>
        </div>
        <Hdivider/>
      </form>
    </div>
  );
};

export default UploadPost;
