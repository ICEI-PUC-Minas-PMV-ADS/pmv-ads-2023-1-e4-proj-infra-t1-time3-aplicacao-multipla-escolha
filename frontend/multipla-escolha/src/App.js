import './App.css';
import { useState } from 'react';
import Navbar from './components/navbar.js';
import axios from 'axios'

import Home from './pages/home';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import AccountOptions from './pages/accountOptions';

import { Route, Routes, BrowserRouter as Router, BrowserRouter } from "react-router-dom";

import { UserContext } from './context/userContext';

axios.defaults.withCredentials = true;
function App() {

  const [userData, setUserData] = useState(null);
  const [userSignedIn, setUserSignedIn] = useState(null);

  return (
    <UserContext.Provider value={{userData: userData, setUserData: setUserData, userSignedIn: userSignedIn, setUserSignedIn: setUserSignedIn}}>
      <BrowserRouter>
        <div className='main' style={{ height: '100vh' }}>          
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/cadastro" element={<Cadastro />}></Route>
            <Route path="/accountOptions" element={<AccountOptions />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
