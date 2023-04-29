import React, { useState, useEffect, useRef, useContext } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";
import { switchBoolean } from "../util/Functions";

import { UserContext } from "../context/userContext";

import Loading from "./loading";
import Unauthorized from "./unauthorized";

function MinhasTurmasProfessorComponent() {

    const userContext = useContext(UserContext);

    const linkRef = useRef();

    const [turmas, setTurmas] = useState(null);

    const [turmasLoaded, setTurmasLoaded] = useState(true);

    useEffect(() => {
        axios.get(baseUrl + 'api/Turmas/user-turmas',
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                setTurmas(response.data);
            })
            .catch(function (error) {

            })
    }, [turmasLoaded]);

    function apagarTurma(turmaId) {
        if (window.confirm("Tem certeza que deseja apagar essa turma?")) {
            axios.delete(baseUrl + 'api/Turmas/' + turmaId,
                {
                    headers: {
                        "Content-Type": "application/JSON"
                    },
                    withCredentials: true
                }
            )
                .then(function (response) {
                    window.alert("Turma apagada com sucesso!")
                    setTurmasLoaded(switchBoolean(turmasLoaded));
                })
                .catch(function (error) {
                    window.alert("Não foi possível apagar a turma!")
                })
        }
    }

    if (userContext.userSignedIn === false) {
        return <Unauthorized />
    }

    if (turmas == null) {
        return(

            <div>
            <div className="d-flex my-4">
                <h1 className="m-auto">Minhas turmas</h1>
            </div>
            <Loading />
        </div>
        )
    }

    return (
        <div>
            <div className="d-flex my-4">
                <h1 className="m-auto">Minhas turmas</h1>
            </div>
            <div className="container-fluid d-flex">
                <Link ref={linkRef} to="/" />
                <div className="d-flex flex-column m-auto mt-4 w-100">
                    <table className="table table-sm table-color table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Ativa</th>
                                <th style={{ width: 240 }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                turmas.map((turma) =>
                                    <tr key={"turma" + turma.id}>
                                        <td>{turma.nome}</td>
                                        <td>{turma.descricao}</td>
                                        <td>{turma.ativo ? "Sim" : "Não"}</td>
                                        <td>
                                            <Link to={"/turmas/" + turma.id} className="btn btn-primary">Abrir</Link>
                                            <Link to={"/editar-turma/" + turma.id} className="btn btn-secondary mx-2">Editar</Link>
                                            <button className="btn btn-danger" onClick={() => apagarTurma(turma.id)}>Apagar</button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    {
                        turmas.length == 0 ? <div className="no-content-warning">Nenhuma turma cadastrada.</div> : null
                    }
                    <div className="d-flex flex-row-reverse">
                        <Link className='btn btn-secondary my-2' to={"/"}>Voltar</Link>
                        <Link className='btn btn-primary m-2' to="/criar-turma">Nova turma</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MinhasTurmasProfessorComponent