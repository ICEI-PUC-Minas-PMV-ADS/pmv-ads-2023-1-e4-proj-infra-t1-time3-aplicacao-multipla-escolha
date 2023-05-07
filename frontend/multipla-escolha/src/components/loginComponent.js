import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

function LoginComponent() {

    const userContext = useContext(UserContext);

    const baseUrl = 'https://localhost:7284/';

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const linkRef = useRef();

    function login() {
        if (username.trim().length < 1) {
            document.getElementById("username").focus();
            return setErrorMessage("Inserir nome de usuário!");
        }

        if (password.trim().length < 1) {
            document.getElementById("senha").focus();
            return setErrorMessage("Inserir senha!");
        }

        axios.post(baseUrl + 'api/Usuarios/authenticate',
            {
                "nomeDeUsuario": username,
                "senha": password
            },
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                if (response.status == 200) {
                    userContext.setUserSignedIn(true);
                    linkRef.current.click();
                }
            })
            .catch(function (error) {
                if (error.request.status == 401) {
                    setErrorMessage("Usuário ou senha incorretos!");
                };
            })

    }

    if (userContext.userSignedIn == null) {
        return (
            <div className="m-auto mt-4">
                
            </div>
        )
    }
    
    if (userContext.userSignedIn) {
        return (
            <div className="m-auto mt-4">
                <h1>Usuário já esta logado</h1>
            </div>
        )
    }

    return (
        <div className="login-box">
            <Link ref={linkRef} to="/minhas-turmas" />
            <div className="my-2">
                <h1>Login</h1>
            </div>
            <div className="d-flex flex-column mt-2">
                <label for="username">Nome de usuário</label>
                <input className="mb-2" id="username" value={username} onChange={e => { setUsername(e.target.value); setErrorMessage("") }}></input>
                <label for="username">Senha</label>
                <input id="senha" type="password" value={password} onChange={e => { setPassword(e.target.value); setErrorMessage("") }}></input>
                <div style={{ width: 260, height: 32, textAlign: 'center', marginTop: 6, color: 'red' }}>
                    <text>{errorMessage}</text>
                </div>
            </div>
            <div>
                <div className="d-flex mb-3">
                    <button className="btn btn-primary m-auto" onClick={() => login()}>Fazer Login</button>
                </div>
                <div className="mb-4">
                    <text>Não possui uma conta? </text>
                    <Link to="/cadastro">Cadastre-se.</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent