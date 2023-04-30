import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

import Loading from "./loading";
import Unauthorized from "./unauthorized";

import { baseUrl } from "../util/Constants";

function AccountOptionsComponent() {

    const userContext = useContext(UserContext);

    const [username, setUsername] = useState("");

    const [oldPassword, setOldPassword] = useState("");

    const [password, setPassword] = useState("******");

    const [repeatPassword, setRepeatPassword] = useState("");

    const [nome, setNome] = useState("");

    const [sobrenome, setSobrenome] = useState("");

    const [email, setEmail] = useState("");

    const [telefone, setTelefone] = useState("");

    const [perfil, setPerfil] = useState(0);

    const [errorMessage, setErrorMessage] = useState("");

    const [askForPassword, setAskForPassword] = useState(false);

    const [changePassword, setChangePassword] = useState(false);

    const [loaded, setLoaded] = useState(false);

    const linkRef = useRef();

    useEffect(() => {
        axios.get(baseUrl + 'api/Usuarios/Current',
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                const user = response.data;
                setUsername(user.nomeDeUsuario);
                setNome(user.nome);
                setSobrenome(user.sobrenome);
                setEmail(user.email);
                setTelefone(user.telefone);
                setPerfil(user.perfil);
                setLoaded(true);
            })
            .catch(function (error) {

            })
    }, []);

    function cadastro() {

        if (oldPassword.trim().length < 1) {
            document.getElementById("senha-antiga").focus();
            return setErrorMessage("Preencher senha!");
        }

        if (changePassword && repeatPassword.trim().length < 1) {
            document.getElementById("repetir-senha").focus();
            return setErrorMessage("Repetir senha!");
        }

        if (changePassword && password.trim() != repeatPassword.trim()) {
            document.getElementById("senha").focus();
            return setErrorMessage("Senha e repetir senha não conferem!");
        }

        if (nome.trim().length < 1) {
            document.getElementById("nome").focus();
            return setErrorMessage("Preencher nome!");
        }

        if (sobrenome.trim().length < 1) {
            document.getElementById("sobrenome").focus();
            return setErrorMessage("Preencher sobrenome!");
        }

        if (email.trim().length < 1) {
            document.getElementById("email").focus();
            return setErrorMessage("Preencher email!");
        }

        let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!emailRegex.test(email.trim())) {
            document.getElementById("email").focus();
            return setErrorMessage("Email inválido!");
        }

        if (telefone.trim().length < 1) {
            document.getElementById("telefone").focus();
            return setErrorMessage("Preencher telefone!");
        }

        let telefoneRegex = /^\(\d{2}\)\d{4,5}-?\d{4}$/g;

        if (!telefoneRegex.test(telefone.replace(/\s/g, ''))) {
            document.getElementById("telefone").focus();
            return setErrorMessage("Telefone inválido!");
        }

        axios.put(baseUrl + 'api/Usuarios',
            {
                "nomeDeUsuario": "null",
                "senha": changePassword ? password : oldPassword,
                "senhaAntiga": oldPassword,
                "nome": nome,
                "sobrenome": sobrenome,
                "email": email,
                "telefone": telefone,
                "perfil": 0
            },
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                window.alert("Dados atualizados com sucesso!")
                linkRef.current.click();
            })
            .catch(function (error) {
                setErrorMessage(error.request.response);
            })
    }

    if (userContext.userSignedIn === false) {
        return <div className="d-flex w-100"><div className="m-auto"><Unauthorized /></div></div>
    }

    if (userContext.userSignedIn !== true) {
        return <div className="d-flex w-100"><div className="m-auto"><Loading /></div></div>
    }

    function apagarConta() {
        if (window.confirm("Tem certeza que deseja apagar permanentemente a sua conta?") == true) {
            confirmarApagar();
        }
    }

    function confirmarApagar() {
        axios.delete(baseUrl + 'api/Usuarios/delete-account',
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                window.alert("Conta apagada!")
                linkRef.current.click();
            })
            .catch(function (error) {
                window.alert("Erro ao apagar conta!");
            })
    }

    if (!loaded) {
        return <div></div>
    }

    return (
        <div className="login-box">
            <Link ref={linkRef} to="/" />
            <div className="my-2">
                <h1>Dados pessoais</h1>
            </div>
            <div className="d-flex flex-column mt-2">
                <label for="username">Nome de usuário</label>
                <input disabled className="mb-2" id="username" value={username}></input>
                <label for="senha">Senha</label>
                <input className="mb-2" id="senha" type="password" value={password} onChange={e => { setPassword(e.target.value); setErrorMessage(""); setAskForPassword(true); setChangePassword(true) }}></input>
                <label for="nome">Nome</label>
                <input className="mb-2" id="nome" value={nome} onChange={e => { setNome(e.target.value); setErrorMessage(""); setAskForPassword(true) }}></input>
                <label for="sobrenome">Sobrenome</label>
                <input className="mb-2" id="sobrenome" value={sobrenome} onChange={e => { setSobrenome(e.target.value); setErrorMessage(""); setAskForPassword(true) }}></input>
                <label for="email">Email</label>
                <input className="mb-2" id="email" value={email} placeholder="usuario@email.com" onChange={e => { setEmail(e.target.value); setErrorMessage(""); setAskForPassword(true) }}></input>
                <label for="telefone">Telefone</label>
                <input className="mb-2" id="telefone" value={telefone} placeholder="(99) 99999-9999" onChange={e => { setTelefone(e.target.value); setErrorMessage(""); setAskForPassword(true) }}></input>
                <label for="perfil">Perfil</label>
                <select disabled id="perfil" value={perfil}>
                    <option value={0}>Aluno</option>
                    <option value={1}>Professor</option>
                </select>

                {
                    askForPassword ?
                        <div className="d-flex flex-column">
                            <br />
                            <h3>Inserir senha atual</h3>
                            {
                                changePassword ?
                                    <div className="d-flex flex-column">
                                        <label for="repetir-senha">Repetir nova senha</label>
                                        <input className="mb-2" id="repetir-senha" type="password" value={repeatPassword} onChange={e => { setRepeatPassword(e.target.value); setErrorMessage("") }}></input>
                                    </div>
                                    :
                                    <div></div>
                            }
                            <label for="senha">Senha atual</label>
                            <input id="senha-antiga" type="password" value={oldPassword} onChange={e => { setOldPassword(e.target.value); setErrorMessage("") }}></input>
                        </div>
                        :
                        <div></div>
                }
                <div style={{ width: 260, height: 32, textAlign: 'center', marginTop: 6, color: 'red' }}>
                    <text>{errorMessage}</text>
                </div>
            </div>
            <div>
                {
                    askForPassword ?
                        <div className="d-flex mb-4">
                            <button className="btn btn-primary m-auto" onClick={() => cadastro()}>Atualizar dados</button>
                        </div>
                        :
                        <div></div>
                }
            </div>
            <div className="d-flex m-4">
                <button className="btn btn-danger m-auto" onClick={() => apagarConta()}>Apagar conta</button>
            </div>
        </div>
    );
}

export default AccountOptionsComponent