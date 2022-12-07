import Login from './pages/Login'
import Home from './pages/Home'
import {Route,Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/login' element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
