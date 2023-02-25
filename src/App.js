import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Update from './pages/Update'
import axios from 'axios'
import NotificationBar from './components/NotificationBar'
import Navbar from './components/navbar/Navbar'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [n_notifications, setN_notifications] = useState(0);
  const [openSideBar, setOpenSideBar] = useState(false);

  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users?userId=${user._id}`)
      setCurrentUser(res.data)
    }
    if (user) {
      fetchCurrentUser()
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
      {window.location.pathname === '/register' || window.location.pathname === '/login' ? null : user&&<><NotificationBar
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
        <Route path="/" element={user ? currentUser&&<Home {...currentUser} /> : <Login />} />
        <Route path='/login' element={!user && <Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile/:uname' element={currentUser && <Profile {...currentUser} />} />
        <Route path='/update/post/:pid' element={<Update postUpdate={true} />} />
        <Route path='/update/user/:uid' element={currentUser&& <Update postUpdate={false} {...currentUser} />} />
      </Routes>
    </div>
  );
}

export default App;
