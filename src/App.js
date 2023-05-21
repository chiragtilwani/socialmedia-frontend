import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from 'axios'
import * as React from "react";


import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Update from './pages/Update'
import NotificationBar from './components/NotificationBar'
import Navbar from './components/navbar/Navbar'
import BottomNavbar from './components/navbar/BottomNavbar';
import Loading from './components/Loading';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [n_notifications, setN_notifications] = useState(0);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [error, setError] = useState()
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = useState(true)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users?userId=${user._id}`)
        setCurrentUser(res.data)
      } catch (err) {
        setError(err.response || err.response.data || err.response.data.message)
        setOpen(true)
      }
    }
    if (user) {
      fetchCurrentUser()
      setLoading(false)
    }
  }, [user])

  function OpenSideBar() {
    setOpenSideBar(true);
  }
  function CloseSideBar() {
    setOpenSideBar(false);
  }

  function handleNotificationCount(count) {
    setN_notifications(count);
  }

  return (
    <div className="App">
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
      {window.location.pathname === '/register' || window.location.pathname === '/login' ? null : user && <><NotificationBar
        openSideBar={openSideBar}
        CloseSideBar={CloseSideBar}
        currentUser={currentUser}
        handleNotificationCount={handleNotificationCount}
      />
        <Navbar
          currentUser={currentUser}
          OpenSideBar={OpenSideBar}
          n_notifications={n_notifications}
        /></>}
      <Routes>
        <Route path="/" element={user ? currentUser ? <Home {...currentUser} /> : <Loading /> : <Login />} />
        <Route path="/page/:pagenum" element={user ? currentUser ? <Home {...currentUser} /> : <Loading /> : <Login />} />
        <Route path='/login' element={!user && <Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile/:uname' element={currentUser && <Profile {...currentUser} />} />
        <Route path='/update/post/:pid' element={<Update postUpdate={true} />} />
        <Route path='/update/user/:uid' element={currentUser && <Update postUpdate={false} {...currentUser} />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
      </Routes>
      {currentUser && <BottomNavbar currentUser={currentUser}
        OpenSideBar={OpenSideBar}
        n_notifications={n_notifications} />}
    </div>
  );
}

export default App;
