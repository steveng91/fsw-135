import React, {useContext} from 'react';
import{Navigate} from 'react-router-dom'
import{Route} from 'react-router-dom'
import{Routes} from 'react-router-dom'
import{UserContext} from './context/UserProvider'
import Navbar from './components/NavBar'
import  Auth  from './components/Auth'
import Profile from './components/Profile'
import ThreadView from './components/ThreadView'
import './App.css';

export default function App() {
  const{token, logout} = useContext(UserContext)
  return (
    <div className="App">
      <Navbar logout = {logout}/>
      <Routes>
        <Route
          exact path = '/'
          element={ token ? <Navigate to= '/profile'/> : <Auth/>}/>
        <Route
          exact path = '/profile'
          element = {<Profile/>}/>
        <Route
          path='/ThreadView'
          element = {<ThreadView/>}/>
      </Routes>
    </div>
  );
}


