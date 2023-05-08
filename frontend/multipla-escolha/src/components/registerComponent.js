import React, { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { baseUrl } from "../util/Constants";

function RegisterComponent() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [repeatPassword, setRepeatPassword] = useState("");

    const [nome, setNome] = useState("");

    const [sobrenome, setSobrenome] = useState("");

    const [email, setEmail] = useState("");

    const [telefone, setTelefone] = useState("");

    const [perfil, setPerfil] = useState(0);

    const [errorMessage, setErrorMessage] = useState("");

    const linkRef = useRef();

    function cadastro() {
        if (username.trim().length < 1) {
            document.getElementById("username").focus();
            return setErrorMessage("Preencher nome de usuário!");
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

        if (password.trim().length < 1) {
            document.getElementById("senha").focus();
            return setErrorMessage("Preencher senha!");
        }

        if (repeatPassword.trim().length < 1) {
            document.getElementById("repetir-senha").focus();
            return setErrorMessage("Repetir senha!");
        }

        if (password.trim() != repeatPassword.trim()) {
            document.getElementById("senha").focus();
            return setErrorMessage("Senha e repetir senha não conferem!");
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

        axios.post(baseUrl + 'api/Usuarios',
            {
                "nomeDeUsuario": username,
                "senha": password,
                "nome": nome,
                "sobrenome": sobrenome,
                "email": email,
                "telefone": telefone,
                "perfil": parseInt(perfil)
            },
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                console.log(response)
                if (response.status == 201) {
                    window.alert("Usuário cadastrado com sucesso!")
                    linkRef.current.click();
                }
            })
            .catch(function (error) {
                setErrorMessage(error.request.response);
            })
    }

    return (
        <div className="register-box">
            <Link ref={linkRef} to="/login" />
            <div className="d-flex text-center my-2">
                <h1 className="text-dark-gray">REGISTRO DE USUÁRIO</h1>
            </div>
            <div className="d-flex flex-column mt-2 w-100">
                <label for="username">Nome de usuário</label>
                <input className="col-12 mb-2 input-text" id="username" value={username} placeholder="Usuário" onChange={e => { setUsername(e.target.value); setErrorMessage("") }}></input>
                <div className="d-flex w-100 justify-content-between">
                    <div className="d-flex flex-column col-6" style={{ paddingRight: 12 }}>
                        <label for="nome">Nome</label>
                        <input className="mb-2 input-text" id="nome" value={nome} placeholder="Nome" onChange={e => { setNome(e.target.value); setErrorMessage("") }}></input>
                    </div>
                    <div className="d-flex flex-column col-6" style={{ paddingLeft: 12 }}>
                        <label for="sobrenome">Sobrenome</label>
                        <input className="mb-2 input-text" id="sobrenome" value={sobrenome} placeholder="Sobrenome" onChange={e => { setSobrenome(e.target.value); setErrorMessage("") }}></input>
                    </div>
                </div>
                <label for="email">Email</label>
                <input className="mb-2 input-text" id="email" value={email} placeholder="usuario@email.com" onChange={e => { setEmail(e.target.value); setErrorMessage("") }}></input>
                <label for="telefone">Telefone</label>
                <input className="mb-2 input-text" id="telefone" value={telefone} placeholder="(99) 99999-9999" onChange={e => { setTelefone(e.target.value); setErrorMessage("") }}></input>
                <div className="d-flex w-100 justify-content-between">
                    <div className="d-flex flex-column col-6" style={{ paddingRight: 12 }}>
                        <label for="senha">Senha</label>
                        <input className="mb-2 input-text" id="senha" placeholder="Senha" type="password" value={password} onChange={e => { setPassword(e.target.value); setErrorMessage("") }}></input>
                    </div>
                    <div className="d-flex flex-column col-6" style={{ paddingLeft: 12 }}>
                        <label for="repetir-senha">Confirme a senha</label>
                        <input className="mb-2 input-text" id="repetir-senha" placeholder="Confirme a senha" type="password" value={repeatPassword} onChange={e => { setRepeatPassword(e.target.value); setErrorMessage("") }}></input>
                    </div>
                </div>
                <div className="m-1">

                    <div className="d-flex align-items-center">
                        <input htmlFor="perfil-professor" type="radio" checked={perfil == 0} onClick={() => setPerfil(0)}></input>
                        <label for="perfil-aluno" className="mx-1" onClick={() => setPerfil(0)}>Perfil de aluno</label>
                    </div>
                    <div className="d-flex align-items-center">
                        <input htmlFor="perfil-professor" type="radio" checked={perfil == 1} onClick={() => setPerfil(1)}></input>
                        <label for="perfil-professor" className="mx-1" onClick={() => setPerfil(1)}>Perfil de professor</label>
                    </div>
                </div>
                <div style={{ width: '100%', height: 32, textAlign: 'center', marginTop: 6, marginBottom: 8, color: 'red' }}>
                    <text>{errorMessage}</text>
                </div>
            </div>
            <div>
                <div className="d-flex mb-4">
                    <button className="btn btn-primary m-auto" style={{ width: 240 }} onClick={() => cadastro()}>Fazer Cadastro</button>
                </div>
            </div>
        </div>
    );
}

export default RegisterComponent