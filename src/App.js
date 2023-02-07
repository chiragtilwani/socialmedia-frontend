import { Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Update from './pages/Update'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/users?userId=6394c7dbe63735002feff0de`)
      setCurrentUser(res.data)
    }
    fetchCurrentUser()
  }, [])

  return (

    <div className="App">
      <Routes>
        <Route path="/" element={currentUser && <Home {...currentUser} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile/:uname' element={currentUser && <Profile {...currentUser} />} />
        <Route path='/update/post/:pid' element={<Update postUpdate={true} />} />
        <Route path='/update/user/:uid' element={<Update postUpdate={false} />} />
      </Routes>
    </div>
  );
}

export default App;
