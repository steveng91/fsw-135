import React, {useContext} from 'react';
import{Navigate, Route, Routes} from 'react-router-dom'
import{UserContext} from './context/UserProvider'
import Navbar from './components/NavBar'
import  Auth  from './components/Auth'
import Profile from './components/Profile'
import ThreadView from './components/ThreadView'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css';

export default function App() {
  const{token, logout} = useContext(UserContext)
  return (
    <div className="App">
      {token && <Navbar logout = {logout}/>}
      <Routes>
        <Route
          exact path = '/'
          element={ token ? <Navigate to= '/profile'/> : <Auth/>}/>
          <Route
          path='/profile'
          element = {<ProtectedRoute
            component={Profile}
            navigateTo='/'
            token={token}
          />}
          />
          <Route
          path='/ThreadView'
          element = {<ProtectedRoute
            component={ThreadView}
            navigateTo='/'
            token={token}
          />}
          />
      </Routes>
    </div>
  );
}


