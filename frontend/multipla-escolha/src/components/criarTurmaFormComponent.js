import React, { useState, useRef, useContext } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";
import Unauthorized from "./unauthorized";

import { UserContext } from "../context/userContext";

function CriarTurmaFormComponent() {
    const userContext = useContext(UserContext);

    const linkRef = useRef();

    const [nome, setNome] = useState("");

    const [descricao, setDescricao] = useState("");

    const [ativo, setAtivo] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");

    function cadastrarTurma() {
        if (nome.trim().length < 1) {
            document.getElementById("nome").focus();
            return setErrorMessage("Preencher nome da turma!");
        }

        if (descricao.trim().length < 1) {
            document.getElementById("descricao").focus();
            return setErrorMessage("Preencher descrição da turma!");
        }

        axios.post(baseUrl + 'api/Turmas',
            {
                "nome": nome,
                "descricao": descricao,
                "ativo": ativo
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
                    window.alert("Turma cadastrada com sucesso!")
                    linkRef.current.click();
                }
            })
            .catch(function (error) {
                setErrorMessage(error.request.response);
            })
    }

    if (userContext.userSignedIn === false) {
        return <Unauthorized />
    }

    return (
        <div>
            <div className="d-flex my-4">
                <h1 className="m-auto">Criar turma</h1>
            </div>
            <div className="container-fluid d-flex">
                <Link ref={linkRef} to="/minhas-turmas" />
                <div className="d-flex flex-column m-auto mt-4">
                    <label for="nome">Nome da turma</label>
                    <input className="mb-2" id="nome" value={nome} onChange={(e) => { setNome(e.target.value); setErrorMessage("") }}></input>
                    <label for="descricao">Descrição</label>
                    <textarea style={{ height: 150, width: 300 }} className="mb-2" id="descricao" value={descricao} onChange={(e) => { setDescricao(e.target.value); setErrorMessage("") }}></textarea>
                    <label for="ativo">Ativa</label>
                    <select className="mb-2" id="ativo" value={ativo} onChange={(e) => { setAtivo(e.target.value == "true" ? true : false); setErrorMessage("") }}>
                        <option value={true}>Sim</option>
                        <option value={false}>Não</option>
                    </select>
                    <div className="d-flex mb-2" style={{ height: 24 }}>
                        <div className="m-auto" style={{ color: 'red' }}>
                            {errorMessage}
                        </div>
                    </div>
                    <div className="m-auto">
                    <button className="btn btn-primary" onClick={() => cadastrarTurma()}>Cadastrar turma</button>
                    <button className="btn btn-secondary mx-2" onClick={() => linkRef.current.click()}>Cancelar</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default CriarTurmaFormComponent