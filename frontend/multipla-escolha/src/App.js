import './App.css';
import Navbar from './components/navbar.js';
import axios from 'axios'

import Home from './pages/home';
import Login from './pages/login';
import Cadastro from './pages/cadastro';

import { Route, Routes, BrowserRouter as Router, BrowserRouter } from "react-router-dom";

axios.defaults.withCredentials = true;


function App() {

  function axiosteste() {
    
    axios.get('https://localhost:7284/api/Turmas',
      {
        headers: {
          "Content-Type": "application/JSON" 
        },
        withCredentials: true
      }
    )
      .then(function (response) {
        // aqui acessamos o corpo da resposta:
        console.log(response.data);
      })
      .catch(function (error) {
        // aqui temos acesso ao erro, quando alguma coisa inesperada acontece:
        console.log(error);
      })
  }

  return (
    <BrowserRouter>
    <div className='main' style={{height: '100vh'}}>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/cadastro" element={<Cadastro />}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
