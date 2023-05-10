import React, { useState, useEffect, useRef, useContext } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";
import { switchBoolean } from "../util/Functions";

import { UserContext } from "../context/userContext";

import Loading from "./loading";
import Unauthorized from "./unauthorized";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faCalendarMinus, faFilePen, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { formatarData, encurtarTexto } from "../util/Functions";
import PaginationTabsComponent from "./paginationTabsComponent";

function MinhasTurmasProfessorComponent() {

    const userContext = useContext(UserContext);

    const linkRef = useRef();

    const [turmas, setTurmas] = useState(null);

    const [turmasLoaded, setTurmasLoaded] = useState(true);

    const [query, setQuery] = useState("");

    const [ativas, setAtivas] = useState("true");

    const [currentPage, setCurrentPage] = useState(0);

    const [pageSize, setPageSize] = useState(6);

    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        axios.get(baseUrl + 'api/Turmas/user-turmas',
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                params: {
                    "ativas": ativas == "true" ? true : false,
                    "pageNumber": currentPage,
                    "pageSize": pageSize,                      
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                setTurmas(response.data.items);
                setLastPage(response.data.totalPages);
                if (currentPage > lastPage) {
                    setCurrentPage(response.data.totalPages);
                }
            })
            .catch(function (error) {

            })
    }, [turmasLoaded, ativas, currentPage, pageSize]);

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
        return (

            <div>
                <div className="d-flex my-4 flex-column">
                    <div>
                        <h1 className="text-dark-gray">MINHAS TURMAS</h1>
                    </div>
                    <div className="d-flex flex-row-reverse">
                        <Link className="text-decoration-none btn-white-text" to="/criar-turma"><div className="btn-white"><FontAwesomeIcon icon={faFilePen} style={{ position: "absolute" }}></FontAwesomeIcon><div className="d-flex justify-content-center w-100 no-text-break" style={{ marginLeft: 12 }}>NOVA TURMA</div></div></Link>
                        <div className="btn-white mx-4" onClick={() => setAtivas("false")} style={ativas == "false" ? { backgroundColor: '#e9e9fe' } : null}><FontAwesomeIcon icon={faCalendarMinus} style={{ position: "absolute" }}></FontAwesomeIcon><div className="d-flex justify-content-center w-100">INATIVAS</div></div>
                        <div className="btn-white" onClick={() => setAtivas("true")} style={ativas == "true" ? { backgroundColor: '#e9e9fe' } : null}><FontAwesomeIcon icon={faGraduationCap} style={{ position: "absolute" }}></FontAwesomeIcon><div className="d-flex justify-content-center w-100">ATIVAS</div></div>
                    </div>
                </div>
                <Loading />
            </div>
        )
    }

    function turmaCard(turma) {
        return (
            <div key={"turma" + turma.id} className="card d-flex justify-content-between">
                <div className="d-flex flex-row-reverse text-dark-gray" style={{ fontSize: 12 }}>Turma criada em {formatarData(turma.dataDeCriacao)}</div>
                <div style={{ height: 110 }}>
                    <div className="h3 text-dark-gray">{turma.nome}</div>
                    <div style={{ height: 70, overflow: 'hidden' }}>
                        <p>{encurtarTexto(turma.descricao, 110)}</p>
                    </div>
                </div>
                <div className="d-flex flex-row-reverse mt-2">
                    <button className="btn btn-danger" onClick={() => apagarTurma(turma.id)}><FontAwesomeIcon icon={faTrash} /></button>
                    <Link to={"/editar-turma/" + turma.id} className="btn btn-secondary mx-2"><FontAwesomeIcon icon={faPen} /></Link>
                    <Link to={"/turmas/" + turma.id} className="btn btn-primary">Abrir</Link>
                </div>
            </div>
        );
    }

    function turmaCardPlaceHolders() {
        const placeholders = [];

        for (let i = 0; i < (pageSize - turmas.length); i++) {
            placeholders.push(<div className="card d-flex" style={{opacity: 0}}></div>)
        }

        return (
            placeholders
        );
    }

    return (
        <div>
            <div className="d-flex my-4 flex-column">
                <div>
                    <h1 className="text-dark-gray">MINHAS TURMAS</h1>
                </div>
                <div className="d-flex flex-row-reverse">
                    <Link className="text-decoration-none btn-white-text" to="/criar-turma"><div className="btn-white"><FontAwesomeIcon icon={faFilePen} style={{ position: "absolute" }}></FontAwesomeIcon><div className="d-flex justify-content-center w-100 no-text-break" style={{ marginLeft: 12 }}>NOVA TURMA</div></div></Link>
                    <div className="btn-white mx-4" onClick={() => setAtivas("false")} style={ativas == "false" ? { backgroundColor: '#e9e9fe' } : null}><FontAwesomeIcon icon={faCalendarMinus} style={{ position: "absolute" }}></FontAwesomeIcon><div className="d-flex justify-content-center w-100">INATIVAS</div></div>
                    <div className="btn-white" onClick={() => setAtivas("true")} style={ativas == "true" ? { backgroundColor: '#e9e9fe' } : null}><FontAwesomeIcon icon={faGraduationCap} style={{ position: "absolute" }}></FontAwesomeIcon><div className="d-flex justify-content-center w-100">ATIVAS</div></div>
                </div>
            </div>
            <div className="container-fluid d-flex">
                <Link ref={linkRef} to={"/turmas" + (query.length > 0 ? ("?search=" + query) : "")} />
                <div>
                    <div className="d-flex flex-wrap justify-content-around m-auto mt-4 w-100" style={{minWidth: '60vw'}}>
                        {
                            turmas.map((turma) =>
                                turmaCard(turma)
                            )
                        }
                        {
                            turmas.length == 0 ? <div className="no-content-warning">Nenhuma turma cadastrada.</div> : turmaCardPlaceHolders()
                        }
                    </div>
                    <PaginationTabsComponent currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage} />
                    <div className="d-flex flex-row-reverse" style={{marginBottom: 120}}>
                        <Link className='btn btn-secondary my-2' to={"/"}>Voltar</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MinhasTurmasProfessorComponent