import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import * as React from "react";

import Loading from "../components/Loading";
import noCover from "../assets/noCover.png";
import Sizes from "../Sizes";

const useStyles = makeStyles({
  outterContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--purple-2)",
    zIndex: 3,
    position: "absolute",
  },
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    [Sizes.up("xl")]: {
      width: "80%",
      hight: "80%",
    },
  },
  card: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: ".5rem",
    boxShadow:
      "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
    [Sizes.down("sm")]: {
      width: "100vw",
      borderRadius: "0",
      alignItems: "center",
    },
  },
  cover: {
    borderRadius: ".5rem .5rem 0rem 0rem",
    width: "100%",
    height: "15rem",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    objectFit: "fill",
  },
  profile: {
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
    border: ".2rem solid var(--purple-1)",
    boxShadow: "0rem 0rem .5rem .05rem var(--purple-2)",
    marginBottom: "-2.5rem",
    cursor: "pointer",
    position: "absolute",
    bottom: "2.5rem",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "3rem 2rem 1rem 2rem",
  },
  input: {
    margin: "1rem",
    padding: "0.5rem",
    outline: "none",
  },
  btnContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  },
  btn: {
    width: "7rem",
    height: "2.5rem",
    backgroundColor: "var(--purple-1)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: ".2rem",
    outline: "none",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    marginLeft: "1.5rem",
    "&:hover": {
      opacity: 0.8,
    },
  },
  postImgContainer: {
    width: "100%",
    height: "50vh",
    position: "relative",
    "&:hover": {
      "& $postImgBackdrop": {
        display: "flex",
      },
    },
  },
  postImg: {
    width: "100%",
    height: "100%",
    objectFit: "fill",
    borderRadius: ".5rem .5rem 0 0",
  },
  postImgBackdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "none",
    borderRadius: ".5rem .5rem 0 0",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImgBackdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    display: "flex",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: ".5rem .5rem 0 0",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.3rem",
    letterSpacing: ".2rem",
    transitionDuration: ".2s",
    opacity: 0,
    "&:hover": {
      opacity: 1,
    },
  },
  coverImgBackdrop: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    borderRadius: ".5rem .5rem 0 0",
    justifyContent: "center",
    alignItems: "center",
    transitionDuration: ".2s",
    opacity: 0,
    "&:hover": {
      opacity: 1,
    },
  },
  updateBtn: {
    "&:hover": {
      color: "var(--purple-1)",
      backgroundColor: "white",
      transitionDuration: ".2s",
      opacity: 1,
    },
  },
  coverProfileContainer: {
    borderRadius: ".5rem .5rem 0 0",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  coverContainer: {
    position: "relative",
    width: "100%",
  },
  profileContainer: {
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: ".2rem solid var(--purple-1)",
    position: "absolute",
    bottom: "-2.5rem",
    overflow: "hidden",
    backgroundColor: "white",
    "&:hover": {
      "$ &profileImgBackdrop": {
        display: "none",
      },
    },
  },
});

const Update = (props) => {
  const classes = useStyles();

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [post, setPost] = useState();
  const [url, setUrl] = useState();
  const [desc, setDesc] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [open, setOpen] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const [coverImg, setCoverImg] = useState();
  const [userProfileData, setUserProfileData] = useState({
    name: props.name,
    username: props.username,
    bio: props.bio,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const { pid } = useParams();
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/${pid}`
      );
      setPost(res.data);
      setDesc(res.data.desc);
    };
    if (pid) {
      fetchPost();
    }
  }, [pid]);

  function handleBack() {
    navigate(-1);
  }

  function changePostImg(evt) {
    setLoading(true);
    const fileName = evt.target.files[0].name;
    let idxDot = fileName.lastIndexOf(".") + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
      const file = evt.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setUrl(reader.result);
      };
      setLoading(false);
    } else {
      alert("Only jpg/jpeg and png files are allowed!");
    }
  }
  async function handleUpdate(evt) {
    setLoading(true);
    if (props.postUpdate) {
      try {
        await axios.patch(
          `${process.env.REACT_APP_BASE_URL}/posts/${post._id}`,
          {
            userId: user._id,
            url: url,
            desc: desc,
          },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        );
        navigate(-1);
      } catch (err) {
        setError(err.response.data.message);
        setOpen(true);
      }
    } else {
      try {
        const profileUrl = profileImg || null;
        const coverUrl = coverImg || null;
        await axios.patch(
          `${process.env.REACT_APP_BASE_URL}/users/${props._id}`,
          {
            ...userProfileData,
            profileUrl,
            coverUrl,
            userId: user._id,
          },
          {
            headers: {
              authorization: "Bearer " + user.token,
            },
          }
        );
        navigate(`/profile/${userProfileData.username}`);
      } catch (err) {
        setError(err || err.response || err.response.data.message);
        setOpen(true);
      }
    }
    setLoading(false);
  }

  function changeDescription(evt) {
    setDesc(evt.target.value);
  }

  function changeProfileImg(evt) {
    setLoading(true);
    const fileName = evt.target.files[0].name;
    let idxDot = fileName.lastIndexOf(".") + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
      const file = evt.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProfileImg(reader.result);
      };
      setLoading(false);
    } else {
      alert("Only jpg/jpeg and png files are allowed!");
    }
  }
  function changeCoverImg(evt) {
    setLoading(true);
    const fileName = evt.target.files[0].name;
    let idxDot = fileName.lastIndexOf(".") + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
      const file = evt.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setCoverImg(reader.result);
      };
      setLoading(false);
    } else {
      alert("Only jpg/jpeg and png files are allowed!");
    }
  }

  function handleUpdateProfileInput(evt) {
    setUserProfileData({
      ...userProfileData,
      [evt.target.name]: evt.target.value,
    });
  }
  return (
    <>
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
      <div className={classes.outterContainer}>
        <div className={classes.container}>
          {loading ? (
            <Loading />
          ) : (
            <div className={classes.card}>
              {props.postUpdate && post ? (
                <div
                  className={classes.postImgContainer}
                  style={{ display: post && post.post.url ? "block" : "none" }}
                >
                  {loading ? (
                    <Loading />
                  ) : (
                    <img
                      src={url ? url : post.post.url}
                      className={classes.postImg}
                      alt=""
                    />
                  )}
                  <div className={classes.postImgBackdrop}>
                    <label htmlFor="updatePostImg">
                      <span className={`${classes.btn} ${classes.updateBtn}`}>
                        Edit
                      </span>
                    </label>
                    <input
                      type="file"
                      id="updatePostImg"
                      accept="image/png, image/jpg, image/jpeg"
                      style={{ display: "none" }}
                      value={""}
                      onChange={changePostImg}
                    />
                  </div>
                </div>
              ) : (
                <div className={classes.coverProfileContainer}>
                  <div className={classes.coverContainer}>
                    <img
                      src={
                        coverImg
                          ? `${coverImg}`
                          : props.coverPicture && props.coverPicture.url
                          ? `${props.coverPicture.url}`
                          : `${noCover}`
                      }
                      className={classes.cover}
                      alt=""
                    />
                    <div className={classes.coverImgBackdrop}>
                      <label htmlFor="coverImgInput">
                        <span className={`${classes.btn} ${classes.updateBtn}`}>
                          Edit
                        </span>
                      </label>
                    </div>
                    <input
                      type="file"
                      id="coverImgInput"
                      accept="image/png, image/jpg, image/jpeg"
                      style={{ display: "none" }}
                      value={""}
                      onChange={changeCoverImg}
                    />
                  </div>
                  <div className={classes.profileContainer}>
                    <img
                      src={
                        profileImg
                          ? `${profileImg}`
                          : props.profilePicture && props.profilePicture.url
                          ? `${props.profilePicture.url}`
                          : `https://api.dicebear.com/5.x/avataaars/svg?seed=${props.username}`
                      }
                      className={classes.profile}
                      alt=""
                    />
                    <div className={classes.profileImgBackdrop}>
                      <label htmlFor="profileImgInput">
                        <span className={classes.profileUpdateBtn}>Edit</span>
                      </label>
                    </div>
                    <input
                      type="file"
                      id="profileImgInput"
                      accept="image/png, image/jpg, image/jpeg"
                      style={{ display: "none" }}
                      value={""}
                      onChange={changeProfileImg}
                    />
                  </div>
                </div>
              )}
              {props.postUpdate && post ? (
                desc && (
                  <input
                    type="text"
                    className={`${classes.input}`}
                    value={desc}
                    placeholder="description"
                    onChange={changeDescription}
                  />
                )
              ) : (
                <div className={classes.inputContainer}>
                  <div>
                    <span>Name : </span>
                    <input
                      type="text"
                      className={`${classes.input}`}
                      value={userProfileData.name}
                      name="name"
                      onChange={handleUpdateProfileInput}
                    />
                  </div>
                  <div>
                    <span>Username : </span>
                    <input
                      type="text"
                      className={`${classes.input}`}
                      value={userProfileData.username}
                      name="username"
                      onChange={handleUpdateProfileInput}
                    />
                  </div>
                  <div>
                    <span>Bio : </span>
                    <input
                      type="text"
                      className={`${classes.name} ${classes.input}`}
                      value={userProfileData.bio}
                      name="bio"
                      onChange={handleUpdateProfileInput}
                    />
                  </div>
                </div>
              )}
              <div
                className={classes.btnContainer}
                style={{ marginTop: ".5rem" }}
              >
                <button className={classes.btn} onClick={handleBack}>
                  Back
                </button>
                <button className={classes.btn} onClick={handleUpdate}>
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Update;
