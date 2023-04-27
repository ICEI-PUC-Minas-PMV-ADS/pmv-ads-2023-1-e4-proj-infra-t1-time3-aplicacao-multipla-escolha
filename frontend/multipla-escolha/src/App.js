import './App.css';
import { useState } from 'react';
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
import VisualizarAtividade from './pages/visualizarAtividade';
import EditarAtividade from './pages/editarAtividade';
import FazerAtividade from './pages/fazerAtividade';
import VisualizarResultado from './pages/visualizarResultado';

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
            <Route path="/criar-turma" element={<CriarTurma />}></Route>
            <Route path="/editar-turma/:id" element={<EditarTurma />}></Route>
            <Route path="/minhas-turmas" element={<MinhasTurmas />}></Route>
            <Route path="/turmas/:id" element={<VisualizarTurma />}></Route>
            <Route path="/turmas/:id/criar-atividade" element={<CriarAtividade />}></Route>
            <Route path="/atividades/:id" element={<VisualizarAtividade />}></Route>
            <Route path="/fazer-atividade/:id" element={<FazerAtividade />}></Route>
            <Route path="/atividades/editar/:id" element={<EditarAtividade />}></Route>
            <Route path="/resultados/:id" element={<VisualizarResultado />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
