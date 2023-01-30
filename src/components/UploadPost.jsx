import { makeStyles } from "@mui/styles";
import { IoMdPhotos } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { useRef,useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { ImCancelCircle } from "react-icons/im";
import axios from 'axios'

import Vdivider from "./Vdivider";
import Hdivider from "./Hdivider";

const useStyles = makeStyles({
  container: {
    width: "90%",
    margin: "1rem 0rem",
    padding: ".5rem",
    backgroundColor: "white",
    borderRadius: ".5rem",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  profile_textfield: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    margin: ".5rem 0rem",
  },
  profile: {
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
    border: ".2rem solid var(--purple-1)",
  },
  textfield: {
    width: "80%",
    height: "4rem",
    backgroundColor: "var(--purple-3)",
    borderRadius: "1.2rem",
    outline: "none",
    border: ".2rem solid var(--purple-2)",
    padding: "1rem",
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "3rem",
  },
  photoUploader: {
    color: "tomato",
    fontSize: "1.5rem",
    cursor: "pointer",
    transitionDuration:'.2s',
    "&:hover": {
      opacity: ".5",
      transform:'scale(.8)',
    },
  },
  videoUploader: {
    color: "#3cb73c",
    fontSize: "1.8rem",
    cursor: "pointer",
    transitionDuration:'.2s',
    "&:hover": {
      opacity: ".5",
      transform:'scale(.8)',
    },
  },
  btn: {
    padding: ".5rem",
    cursor: "pointer",
    backgroundColor: "var(--purple-1)",
    color: "white",
    outline: "none",
    borderRadius: ".5rem",
    fontWeight: "bold",
    borderWidth: "0rem",
    "&:hover": {
      opacity: ".5",
    },
  },
  previewImg: {
    border: ".2rem solid",
    width: "100%",
    height: "25rem",
    borderRadius: ".5rem",
    objectFit: "fill",
  },
  canclePreview: {
    fontSize: "1.8rem",
    color: "var(--purple-1)",
    float: "right",
    margin: ".5rem",
    cursor: "pointer",
    transitionDuration:'.2s',
    "&:hover": {
      opacity: ".5",
      transform:'scale(.8)',
    },
  },
});

const UploadPost = (props) => {
  const classes = useStyles();
  const [previewImg, setPreviewImg] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const whatsHappening=useRef('')

  
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  function handlePreviewImgChange(evt) {
    const fileName = evt.target.files[0].name;
    // console.log(fileName);
    let idxDot = fileName.lastIndexOf(".") + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
      //TO DO
      const file = evt.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImg(reader.result);
      };
    } else {
      setError("Only jpg/jpeg and png files are allowed!");
      setOpen(true);
    }
  }
  
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    
    setOpen(false);
  };
  
  function handleCanclePreview(){
    setPreviewImg(null)
  }
  
  async function handleSubmit(e){
    e.preventDefault();
    try{
      await axios.post(`${process.env.REACT_APP_BASE_URL}/posts/`,{
        creatorId:props.currentUser._id,
        desc:whatsHappening.current.value,
        post:previewImg
      })
    } catch(e){
      setError(e.response.data.message);
      setOpen(true);
    }
    setPreviewImg(null)
  }
  // console.log(props)
  return (
    <div className={classes.container}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="warning"
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Stack>
      <form onSubmit={handleSubmit}>
        <div className={classes.profile_textfield}>
          <div
            className={classes.profile}
            style={{
              background: `url(${props.profile})`,
              backgroundSize: "100% 100%",
              backgroundPosition: "center",
            }}
          ></div>
          <input
            type="textfield"
            className={classes.textfield}
            placeholder="What's Happening ?"
            ref={whatsHappening}
          />
        </div>
        <div className={classes.previewContainer}>
          {previewImg ? (
            <ImCancelCircle
              className={classes.canclePreview}
              onClick={handleCanclePreview}
            />
          ) : null}
          {previewImg ? (
            <img
              src={previewImg !== null ? `${previewImg}` : ""}
              className={classes.previewImg}
              alt="preview"
            />
          ) : null}
          <input
            type="file"
            id="imgInput"
            accept="image/png, image/jpg, image/jpeg"
            style={{ display: "none" }}
            value={""}
            onChange={handlePreviewImgChange}
          />
        </div>
        <Hdivider />
        <div className={classes.btnContainer}>
          <label htmlFor="imgInput">
            <IoMdPhotos className={classes.photoUploader} title="PHOTO" />
          </label>
          <Vdivider />
          <MdVideoCall className={classes.videoUploader} title="VIDEO" />
          <Vdivider />
          <button className={classes.btn} type="submit" disabled={!whatsHappening.current.value && !previewImg?true :false}>POST</button>
        </div>
        <Hdivider />
      </form>
    </div>
  );
};

export default UploadPost;
