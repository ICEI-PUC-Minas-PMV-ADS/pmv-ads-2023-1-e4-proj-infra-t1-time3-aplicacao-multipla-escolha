import './App.css';
import { useState } from 'react';
import Navbar from './components/navbar.js';
import axios from 'axios'

import Home from './pages/home';
import Login from './pages/login';
import Cadastro from './pages/cadastro';
import AccountOptions from './pages/accountOptions';
import CriarTurma from './pages/criarTurma';
import EditarTurma from './pages/editarTurma';
import MinhasTurmas from './pages/minhasTurmas';
import VisualizarTurma from './pages/visualizarTurma';
import CriarAtividade from './pages/criarAtividade';

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
            <Route path="/account-options" element={<AccountOptions />}></Route>
            <Route path="/turmas/criar" element={<CriarTurma />}></Route>
            <Route path="/turmas/editar/:id" element={<EditarTurma />}></Route>
            <Route path="/turmas/minhas-turmas" element={<MinhasTurmas />}></Route>
            <Route path="/turmas/:id" element={<VisualizarTurma />}></Route>
            <Route path="/turmas/:id/atividades/criar" element={<CriarAtividade />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
