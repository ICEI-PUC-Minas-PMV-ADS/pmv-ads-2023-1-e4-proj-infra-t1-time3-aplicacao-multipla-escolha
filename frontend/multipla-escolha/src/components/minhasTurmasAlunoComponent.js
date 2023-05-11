import React, { useState, useEffect, useRef, useContext } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";
import { switchBoolean } from "../util/Functions";

import { UserContext } from "../context/userContext";

import Loading from "./loading";
import Unauthorized from "./unauthorized";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { formatarData, encurtarTexto } from "../util/Functions";
import PaginationTabsComponent from "./paginationTabsComponent";

function MinhasTurmasAlunoComponent() {

    const userContext = useContext(UserContext);

    const linkRef = useRef();

    const [turmas, setTurmas] = useState(null);

    const [turmasLoaded, setTurmasLoaded] = useState(true);

    const [query, setQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(0);

    const [pageSize, setPageSize] = useState(6);

    const [lastPage, setLastPage] = useState(1);

    const [hoverCardId, setHoverCardId] = useState(null);

    useEffect(() => {
        axios.get(baseUrl + 'api/Turmas/user-turmas',
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                params: {
                    "ativas": true,
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
    }, [turmasLoaded, currentPage, pageSize]);

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
                    <FontAwesomeIcon className="search-button" icon={faSearch} onClick={() => buscarTurma()}></FontAwesomeIcon>
                    <input className="input-text search-button-input col-3" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar nova turma"></input>
                </div>
                </div>
                <Loading />
            </div>
        )
    }

    function turmaCard(turma) {
        return (
            <Link onMouseEnter={() => setHoverCardId(turma.id)} onMouseLeave={() => setHoverCardId(null)} to={"/turmas/" + turma.id} key={"turma" + turma.id} className="card d-flex justify-content-between text-decoration-none text-dark-gray" style={hoverCardId == turma.id ? {backgroundColor: '#e9e9fe'} : {}}>
                <div style={{ height: 110 }}>
                    <div className="h3 text-dark-gray">{turma.nome}</div>
                    <div style={{ height: 70, overflow: 'hidden' }}>
                        <p>{encurtarTexto(turma.descricao, 110)}</p>
                    </div>
                </div>
                <div className="d-flex flex-row-reverse text-dark-gray" style={{ fontSize: 12 }}>Turma criada em {formatarData(turma.dataDeCriacao)}</div>
            </Link>
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

    function buscarTurma() {
        linkRef.current.click();
    }

    return (
        <div>
            <div className="d-flex my-4 flex-column">
                <div>
                    <h1 className="text-dark-gray">MINHAS TURMAS</h1>
                </div>
                <div className="d-flex flex-row-reverse">
                    <FontAwesomeIcon className="search-button" icon={faSearch} onClick={() => buscarTurma()}></FontAwesomeIcon>
                    <input className="input-text search-button-input col-3" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar nova turma"></input>
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
                            turmas.length == 0 ? <div className="no-content-warning">Usuário não está matriculado em nenhuma turma.</div> : turmaCardPlaceHolders()
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

export default MinhasTurmasAlunoComponent