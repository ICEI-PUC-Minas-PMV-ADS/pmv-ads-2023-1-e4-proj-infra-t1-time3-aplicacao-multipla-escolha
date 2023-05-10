import React, { useState, useEffect, useRef, useContext } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

import Unauthorized from "./unauthorized";
import Loading from "./loading";

import { formatarData, switchBoolean, encurtarTexto } from "../util/Functions";

function VisualizarTurmaComponent({ idTurma }) {

    const userContext = useContext(UserContext);

    const linkRef = useRef();

    const [turma, setTurma] = useState(null);

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
                setTurma(response.data)
            })
            .catch(function (error) {
                setTurma(false)
            })
    }, [turmaLoaded]);

    if (userContext.userSignedIn === false || turma == false) {
        return <Unauthorized />
    }

    if (turma == null) return (
        <div>
            <div className="d-flex my-4">
                <h1 className="m-auto">Visualizar turma</h1>
            </div>
            <Loading />
        </div>
    )

    let donoDaTurma = false;

    if (turma.professor.id == userContext.userData.id) donoDaTurma = true;

    function apagarAtividade(atividadeId) {
        if (window.confirm("Tem certeza que deseja apagar essa atividade?")) {
            axios.delete(baseUrl + 'api/Atividades/' + atividadeId,
                {
                    headers: {
                        "Content-Type": "application/JSON"
                    },
                    withCredentials: true
                }
            )
                .then(function (response) {
                    window.alert("Atividade apagada com sucesso!")
                    setTurmaLoaded(switchBoolean(turmaLoaded));
                })
                .catch(function (error) {
                    window.alert("Não foi possível apagar a atividade!")
                })
        }
    }

    return (
        <div>
            <div className="d-flex my-4">
                <h1 className="m-auto">Visualizar turma</h1>
            </div>
            <div className="container-fluid d-flex">
                <Link ref={linkRef} to="/minhas-turmas" />
                <div className="w-100">
                    <div className="d-flex flex-column mt-4">
                        <p className="h4"><b>Nome:</b> {turma.nome}</p>
                        <p className="h4 break-word"><b>Descrição:</b> {turma.descricao}</p>
                        <p className="h4"><b>Ativa:</b> {turma.ativo ? "Sim" : "Não"}</p>
                    </div>
                    <div className="mt-4">
                        <p className="h4"><b>Atividades:</b></p>
                        <table className="table table-sm table-color table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Descrição</th>
                                    <th style={{ width: 120 }}>Criada em</th>
                                    <th style={{ width: 160 }}>Prazo de entrega</th>
                                    <th style={{ width: 120 }}>Valor</th>
                                    <th style={userContext.userData.id == turma.professor.id ? { width: 220 } : { width: 90 }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    turma.atividades.map((atividade) =>
                                        <tr key={"atividade" + atividade.id}>
                                            <td>{atividade.nome}</td>
                                            <td>{atividade.descricao}</td>
                                            <td>{formatarData(atividade.dataDeCriacao)}</td>
                                            <td>{formatarData(atividade.dataPrazoDeEntrega, true)}</td>
                                            <td>{atividade.valor != 0 ? atividade.valor.toString().replace(".", ",") : "Não avaliativa"}</td>
                                            <td>
                                                <div className="d-flex flex-row">
                                                    <Link to={"/atividades/" + atividade.id} className="btn btn-primary">Abrir</Link>
                                                    {
                                                        userContext.userData.id == turma.professor.id ?
                                                            <>
                                                                <Link to={"/atividades/editar/" + atividade.id} className="btn btn-secondary mx-2">Editar</Link>
                                                                <button className="btn btn-danger" onClick={() => apagarAtividade(atividade.id)}>Apagar</button>
                                                            </>
                                                            :
                                                            null
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                        {
                            turma.atividades.length == 0 ? <div className="no-content-warning">Nenhuma atividade cadastrada.</div> : null
                        }
                        <div className="d-flex flex-row-reverse mb-4">
                            <Link className='btn btn-secondary my-2' to={"/minhas-turmas"}>Voltar</Link>
                            {
                                userContext.userData.id == turma.professor.id ?

                                    <Link className='btn btn-primary m-2' to={"/turmas/" + turma.id + "/criar-atividade"}>Nova atividade</Link>
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualizarTurmaComponent