import React, { useState, useEffect, useRef } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";

function EditarTurmaFormComponent({idTurma}) {

    const linkRef = useRef();

    const [nome, setNome] = useState("");

    const [descricao, setDescricao] = useState("");

    const [ativo, setAtivo] = useState(true);

    const [errorMessage, setErrorMessage] = useState("");

    const [turmaLoaded, setTurmaLoaded] = useState(false);

    useEffect(() => {
        axios.get(baseUrl + 'api/Turmas/' + idTurma,
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                const turma = response.data;
                setNome(turma.nome);
                setDescricao(turma.descricao);
                setAtivo(turma.ativo);
                setTurmaLoaded(true);
            })
            .catch(function (error) {

            })
    }, []);

    function atualizarTurma() {
        if (nome.trim().length < 1) {
            document.getElementById("nome").focus();
            return setErrorMessage("Preencher nome da turma!");
        }

        if (descricao.trim().length < 1) {
            document.getElementById("descricao").focus();
            return setErrorMessage("Preencher descrição da turma!");
        }

        axios.put(baseUrl + 'api/Turmas',
            {
                "id": idTurma,
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
                    window.alert("Turma atualizada com sucesso!")
                    linkRef.current.click();
                }
            })
            .catch(function (error) {
                setErrorMessage(error.request.response);
            })
    }

    if (turmaLoaded != true) {
        return <div></div>
    }

    return (
        <div className="container-fluid d-flex">
            <Link ref={linkRef} to="/turmas/minhas-turmas" />
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
                    <button className="btn btn-primary" onClick={() => atualizarTurma()}>Atualizar dados</button>
                    <button className="btn btn-secondary mx-2" onClick={() => linkRef.current.click()}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default EditarTurmaFormComponent