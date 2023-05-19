import React, { useState, useEffect, useRef, useContext } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

import Unauthorized from "./unauthorized";
import Loading from "./loading";

import { formatarData, switchBoolean, encurtarTexto } from "../util/Functions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPen, faTrash, faFilePen, faChartLine } from '@fortawesome/free-solid-svg-icons'

function VisualizarTurmaComponent({ idTurma }) {

    const userContext = useContext(UserContext);

    const linkRef = useRef();

    const [turma, setTurma] = useState(null);

    const [turmaLoaded, setTurmaLoaded] = useState(false);

    const [hoverCardId, setHoverCardId] = useState(null);

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

    function fazerMatricula() {
        axios.put(baseUrl + 'api/Turmas/' + idTurma + '/matricular',
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                setTurmaLoaded(switchBoolean(turmaLoaded));
                window.alert("Matrícula realizada com sucesso!");
            })
            .catch(function (error) {
                window.alert("Erro ao realizar matrícula!");
            })
    }

    function cancelarMatricula() {
        axios.put(baseUrl + 'api/Turmas/' + idTurma + '/desmatricular',
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                setTurmaLoaded(switchBoolean(turmaLoaded));
                window.alert("Matrícula cancelada com sucesso!");
            })
            .catch(function (error) {
                window.alert("Erro ao cancelar matrícula!");
            })
    }

    console.log(turma)

    function atividadeCard(atividade) {
        if (turma.professor.id == userContext.userData.id) {
            return (
                <div key={"atividade" + atividade.id} className="card d-flex justify-content-between text-decoration-none text-dark-gray" style={hoverCardId == atividade.id ? { backgroundColor: '#e9e9fe' } : {}}>
                    {
                        atividade.dataPrazoDeEntrega == null ?
                            <div className="d-flex flex-row-reverse text-dark-gray" style={{ fontSize: 14 }}>Sem prazo</div>
                            :
                            <div className="d-flex flex-row-reverse text-dark-gray" style={{ fontSize: 14 }}>Prazo {formatarData(atividade.dataPrazoDeEntrega)}</div>
                    }
                    <div style={{ height: 120 }}>
                        <div className="h3 text-dark-gray">{atividade.nome}</div>
                        <div className="h5 text-dark-gray">{atividade.valor.toString().replace(".", ",")} Pontos</div>
                        <div style={{ height: 70, overflow: 'hidden' }}>
                            <p>{encurtarTexto(atividade.descricao, 90)}</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row-reverse text-dark-gray align-items-center" style={{ fontSize: 12 }}>
                        <button className="btn btn-danger" onClick={() => apagarAtividade(atividade.id)}><FontAwesomeIcon icon={faTrash} /></button>
                        <Link to={"/atividades/editar/" + atividade.id} className="btn btn-secondary mx-2"><FontAwesomeIcon icon={faPen} /></Link>
                        <Link to={"/atividades/" + atividade.id} className="btn btn-primary">Abrir</Link>
                        Tarefa criada em {formatarData(atividade.dataDeCriacao)}
                    </div>
                </div>
            );
        }

        return (
            <Link onMouseEnter={() => setHoverCardId(atividade.id)} onMouseLeave={() => setHoverCardId(null)} to={"/atividades/" + atividade.id} key={"atividade" + atividade.id} className="card d-flex justify-content-between text-decoration-none text-dark-gray" style={hoverCardId == atividade.id ? { backgroundColor: '#e9e9fe' } : {}}>
                {
                    atividade.status == "Entregue" ?
                        <div className="d-flex flex-row-reverse text-dark-gray" style={{ fontSize: 14, fontWeight: 700, color: 'green' }}>Entregue</div>
                        :
                        (
                            atividade.dataPrazoDeEntrega == null ?
                                <div className="d-flex flex-row-reverse text-dark-gray" style={{ fontSize: 14 }}>Sem prazo</div>
                                :
                                <div className="d-flex flex-row-reverse text-dark-gray" style={{ fontSize: 14 }}>Prazo {formatarData(atividade.dataPrazoDeEntrega)} <span className="mx-2" style={atividade.status == "Atividade pendente" ? { color: 'darkblue', fontWeight: 700 } : { color: 'darkred', fontWeight: 700 }}>{atividade.status}</span></div>
                        )
                }
                <div style={{ height: 120 }}>
                    <div className="h3 text-dark-gray">{atividade.nome}</div>
                    <div className="h5 text-dark-gray">{atividade.valor.toString().replace(".", ",")} Pontos</div>
                    <div style={{ height: 70, overflow: 'hidden' }}>
                        <p>{encurtarTexto(atividade.descricao, 90)}</p>
                    </div>
                </div>
                <div className="d-flex flex-row-reverse text-dark-gray align-items-center" style={{ fontSize: 12 }}>
                    Tarefa criada em {formatarData(atividade.dataDeCriacao)}
                </div>
            </Link>
        );
    }

    function atividadeCardPlaceHolders() {
        const placeholders = [];

        for (let i = 0; i < turma.atividades.length % 3; i++) {
            placeholders.push(<div className="card d-flex" style={{ opacity: 0 }}></div>)
        }

        return (
            placeholders
        );
    }

    return (
        <div>
            <div className="turma-info-container d-flex">
                <div className="d-flex justify-content-start align-items-center col-4">
                    <div className="d-flex flex-column">
                        <div className="h1">
                            Professor:
                        </div>
                        <div className="h2">
                            {turma.professor.nome} {turma.professor.sobrenome}
                        </div>
                        <div>
                            {turma.professor.email}
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-column p-4 col-8 justify-content-between">
                    <div>
                        <p className="h1">{turma.nome}</p>
                        <p className="break-word">{turma.descricao}</p>
                    </div>
                    <div className="d-flex flex-row-reverse align-items-center justify-content-between">
                        {
                            turma.matriculado == null ?
                                null
                                :
                                (
                                    turma.matriculado == false ?
                                        <button className='btn btn-primary' onClick={() => fazerMatricula()}>Fazer matrícula</button>
                                        :
                                        <button className='btn btn-danger' onClick={() => cancelarMatricula()}>Cancelar matrícula</button>
                                )
                        }
                        <div>Turma criada em: {formatarData(turma.dataDeCriacao)}</div>
                    </div>
                </div>

            </div>
            <div style={{ marginTop: 320 }}>
                {
                    turma.professor.id == userContext.userData.id ?
                        <div className="d-flex flex-row-reverse">
                            <Link className="text-decoration-none btn-white-text" to={"/turmas/" + turma.id + "/criar-atividade"}><div className="btn-white" style={{ width: 180, marginLeft: 16 }}><FontAwesomeIcon icon={faFilePen} style={{ position: "absolute" }}></FontAwesomeIcon><div className="d-flex justify-content-center w-100 no-text-break" style={{ marginLeft: 12 }}>CRIAR ATIVIDADE</div></div></Link>
                            <Link className="text-decoration-none btn-white-text" to={"/turmas/" + turma.id + "/notas-alunos"}><div className="btn-white"><FontAwesomeIcon icon={faChartLine} style={{ position: "absolute" }}></FontAwesomeIcon><div className="d-flex justify-content-center w-100 no-text-break" style={{ marginLeft: 12 }}>NOTAS</div></div></Link>
                        </div>
                        :
                        <div className="d-flex flex-row-reverse">

                            <Link className="text-decoration-none btn-white-text" to={"/turmas/" + turma.id + "/notas-alunos/" + userContext.userData.id}><div className="btn-white" style={{ width: 180 }}><FontAwesomeIcon icon={faChartLine} style={{ position: "absolute" }}></FontAwesomeIcon><div className="d-flex justify-content-center w-100 no-text-break" style={{ marginLeft: 12 }}>NOTAS</div></div></Link>
                        </div>
                }
                <div className="container-fluid d-flex">
                    <Link ref={linkRef} to={"/minhas-turmas"} />
                    <div>
                        <div className="d-flex flex-wrap justify-content-around m-auto mt-4 w-100" style={{ minWidth: '50vw' }}>
                            {
                                turma.atividades.map((atividade) =>
                                    atividadeCard(atividade)
                                )
                            }
                            {
                                turma.atividades.length == 0 ? <div className="no-content-warning">Nenhuma atividade cadastrada.</div> : atividadeCardPlaceHolders()
                            }
                        </div>
                        <div className="d-flex flex-row-reverse" style={{ marginBottom: 120 }}>
                            <Link className='btn btn-secondary my-2' to={"/minhas-turmas"}>Voltar</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualizarTurmaComponent