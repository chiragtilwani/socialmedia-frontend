import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

import Sizes from "../Sizes";

const useStyles = makeStyles({
  outterContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--purple-2)",
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
    [Sizes.down("md")]: {
      width: "100vw",
    },
  },
  cover: {
    borderRadius: ".5rem .5rem 0rem 0rem",
    width: "100%",
    height: "15rem",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  profile: {
    width: "5rem",
    height: "5rem",
    borderRadius: "50%",
    border: ".2rem solid var(--purple-1)",
    boxShadow: "0rem 0rem .5rem .05rem var(--purple-2)",
    marginBottom: "-2.5rem",
    cursor: "pointer",
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
    height: "15rem",
    position: "relative",
    "&:hover": {
      "& $postImgBackdrop": {
        display: "flex",
      },
    },
  },
  postImg: {
    width: "100%",
    height: "15rem",
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
  updateBtn: {
    "&:hover": {
      color: "var(--purple-1)",
      backgroundColor: "white",
      transitionDuration: ".2s",
      opacity: 1,
    },
  },
});

const Update = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [post, setPost] = useState();
  const [url,setUrl] = useState();
  const [desc,setDesc] = useState();
  const [loading,setLoading] = useState(false);
  const {user}=useSelector(state=>state.auth);

  const { pid } = useParams();
  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/posts/${pid}`
      );
      setPost(res.data);
      setDesc(res.data.desc)
    };
    if (pid) {
      fetchPost();
    }
  }, [pid]);

  const dummyUser = {
    id: 1,
    name: "rahul tilwani",
    username: "rtilwani03",
    profilePicture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTazRa-UljlJ57z2tqmSNSz5X_C5RkD1S-Nfj46b_ZO&s",
    coverPicture:
      "https://images.pexels.com/photos/1323206/pexels-photo-1323206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    bio: "this is dummy bio",
    followers: 1234,
    followings: 750,
  };

  const dummyPost = {
    id: 3,
    name: "chirag tilwani",
    username: "chiragTilwani",
    desc: "this is third dummy post",
    postImg:
      "https://images.pexels.com/photos/1004014/pexels-photo-1004014.jpeg?cs=srgb&dl=pexels-min-an-1004014.jpg&fm=jpg",
    likes: 700,
  };

  function handleBack() {
    navigate(-1);
  }
  function changePostImg(evt){
    setLoading(true)
    const fileName = evt.target.files[0].name
    let idxDot = fileName.lastIndexOf(".") + 1;
    let extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    if (extFile === "jpg" || extFile === "jpeg" || extFile === "png") {
      //TO DO
      const file = evt.target.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setUrl(reader.result)
      }
      setLoading(false)
    } else {
      alert("Only jpg/jpeg and png files are allowed!");
    }
  }
  async function handleUpdate(evt) {
    setLoading(true)
    await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${post._id}`,{userId:user._id,url:url,desc:desc})
    setLoading(false)
    navigate(-1);
  }
  function changeDescription(evt){
    setDesc(evt.target.value)
  }
  return (
    <div className={classes.outterContainer}>
      <div className={classes.container}>
        <div className={classes.card}>
          {props.postUpdate && post ? (
            <div className={classes.postImgContainer} style={{display:post&&post.post.url?'block':'none'}}>
              {loading?<Loading/>:<img src={url?url: post.post.url} className={classes.postImg} alt="" />}
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
            <>{/*cover pic and profile pic*/}</>
          )}
          {props.postUpdate && post ? (
            desc && <input
              type="text"
              className={`${classes.input}`}
              value={desc}
              placeholder="description"
              onChange={changeDescription}
            />
          ) : (
            <div className={classes.inputContainer}>
              <div>
                <span>Name : </span>
                <input
                  type="text"
                  className={`${classes.input}`}
                  value={dummyUser.name}
                />
              </div>
              <div>
                <span>Username : </span>
                <input
                  type="text"
                  className={`${classes.input}`}
                  value={dummyUser.username}
                />
              </div>
              <div>
                <span>Bio : </span>
                <input
                  type="text"
                  className={`${classes.name} ${classes.input}`}
                  value={dummyUser.bio}
                />
              </div>
            </div>
          )}
          <div className={classes.btnContainer} style={{marginTop:'.5rem'}}>
            <button className={classes.btn} onClick={handleBack}>
              Back
            </button>
            <button className={classes.btn} onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
