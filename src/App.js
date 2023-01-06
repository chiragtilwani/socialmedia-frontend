import {Route,Routes} from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Update from './pages/Update'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/profile/:id' element={<Profile/>} />
        <Route path='/update/post/:pid' element={<Update postUpdate={true} />} />
        <Route path='/update/user/:uid' element={<Update postUpdate={false} />} />
      </Routes>
    </div>
  );
}

export default App;
