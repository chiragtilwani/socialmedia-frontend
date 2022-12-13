import {Route,Routes} from 'react-router-dom'

import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    <div className="App">
      {(window.location.pathname!=='/register') && (window.location.pathname!=='/login') ? <Navbar/> : null}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/profile/:id' element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
