import { makeStyles } from "@mui/styles";
import { IoMdPhotos } from "react-icons/io";
import { MdVideoCall } from "react-icons/md";
import { useRef, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import * as React from "react";
import { ImCancelCircle } from "react-icons/im";
import axios from "axios";
import { useSelector } from "react-redux";

import Vdivider from "./Vdivider";
import Hdivider from "./Hdivider";
import Sizes from "../Sizes";

const useStyles = makeStyles({
  container: {
    width: "90%",
    margin: "1rem 0rem",
    padding: ".5rem",
    backgroundColor: "white",
    borderRadius: ".5rem",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
    [Sizes.down("sm")]: {
      width: "100%",
      borderRadius: 0,
    },
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
    objectFit: "fill",
    border: ".2rem solid var(--purple-1)",
    [Sizes.down("sm")]: {
      width: "4rem",
      height: "4rem",
    },
    [Sizes.down("xs")]: {
      width: "3rem",
      height: "3rem",
    },
  },
  textfield: {
    width: "80%",
    height: "4rem",
    backgroundColor: "var(--purple-3)",
    borderRadius: "1.2rem",
    outline: "none",
    border: ".2rem solid var(--purple-2)",
    padding: "1rem",
    [Sizes.down("sm")]: {
      height: "3rem",
    },
    [Sizes.down("xs")]: {
      height: "2rem",
    },
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    height: "3rem",
    [Sizes.down("sm")]: {
      height: "2rem",
    },
  },
  photoUploader: {
    color: "tomato",
    fontSize: "1.5rem",
    cursor: "pointer",
    transitionDuration: ".2s",
    "&:active": {
      opacity: ".5",
      transform: "scale(.8)",
    },
    "&:hover": {
      opacity: ".5",
    },
  },
  videoUploader: {
    color: "#3cb73c",
    fontSize: "1.8rem",
    cursor: "pointer",
    transitionDuration: ".2s",
    "&:active": {
      opacity: ".5",
      transform: "scale(.8)",
    },
    "&:hover": {
      opacity: ".5",
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
    transitionDuration: ".2s",
    "&:active": {
      transform: "scale(.8)",
    },
    "&:hover": {
      opacity: ".8",
    },
  },
  previewImg: {
    border: ".2rem solid",
    width: "100%",
    height: "25rem",
    borderRadius: ".5rem",
    objectFit: "fill",
    [Sizes.down("sm")]: {
      height: "20rem",
    },
    [Sizes.down("xs")]: {
      height: "15rem",
    },
  },
  canclePreview: {
    fontSize: "1.8rem",
    color: "var(--purple-1)",
    float: "right",
    margin: ".5rem",
    cursor: "pointer",
    transitionDuration: ".2s",
    "&:hover": {
      opacity: ".5",
      transform: "scale(.8)",
    },
    [Sizes.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
});

const UploadPost = (props) => {
  const classes = useStyles();

  const [previewImg, setPreviewImg] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const whatsHappening = useRef("");

  const { user } = useSelector((state) => state.auth);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  function handlePreviewImgChange(evt) {
    const fileName = evt.target.files[0].name;
    let idxDot = fileName.lastIndexOf(".") + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
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

  function handlePreviewVideoChange(evt) {
    const file = evt.target.files[0];
    setPreviewVideo(URL.createObjectURL(file));
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleCanclePreview() {
    setPreviewImg(null);
    setPreviewVideo(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/posts/`, {
        creatorId: props.currentUser._id,
        desc: whatsHappening.current.value,
        post: previewImg,
      });
    } catch (e) {
      setError(e.response.data.message);
      setOpen(true);
    }
    try{
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/timeline/${props.currentUser._id}`
      );
      if (props.homePage) {
        props.setPostsArray(res.data);
      } else {
        const currentUserPosts = res.data.filter(
          (post) => post.creatorId === props.currentUser._id
        );
        props.setPostsArray(currentUserPosts);
      }
    }catch(err){
      setError(err.response.data.message);
      setOpen(true);
    }
    setPreviewImg(null);
    setPreviewVideo(null);
    whatsHappening.current.value = "";
  }
  return (
    <div
      className={classes.container}
      style={{
        display:
          user.username !== props.currentUser.username ? "none" : "block",
      }}
    >
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
          <img
            className={classes.profile}
            src={
              props.currentUser.profilePicture.url
                ? `${props.currentUser.profilePicture.url}`
                : `https://api.dicebear.com/5.x/avataaars/svg?seed=${props.currentUser.username}`
            }
            alt=""
          />
          <input
            type="textfield"
            className={classes.textfield}
            placeholder="What's Happening ?"
            ref={whatsHappening}
          />
        </div>
        <div className={classes.previewContainer}>
          {previewImg || previewVideo ? (
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
          ) : previewVideo ? (
            <video width="100%" height="240" controls src={previewVideo} />
          ) : null}

          <input
            type="file"
            id="imgInput"
            accept="image/png, image/jpg, image/jpeg"
            style={{ display: "none" }}
            value={""}
            onChange={handlePreviewImgChange}
          />
          <input
            type="file"
            id="videoInput"
            accept="video/mp4"
            style={{ display: "none" }}
            value={""}
            onChange={handlePreviewVideoChange}
          />
        </div>
        <Hdivider />
        <div className={classes.btnContainer}>
          <label htmlFor="imgInput">
            <IoMdPhotos className={classes.photoUploader} title="PHOTO" />
          </label>
          <Vdivider />
          <label htmlFor="videoInput">
            <MdVideoCall className={classes.videoUploader} title="VIDEO" />
          </label>
          <Vdivider />
          <button className={classes.btn} type="submit">
            POST
          </button>
        </div>
        <Hdivider />
      </form>
    </div>
  );
};

export default UploadPost;
