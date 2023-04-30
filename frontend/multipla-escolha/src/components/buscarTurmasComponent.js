import React, { useState, useEffect, useRef, useContext } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";
import { switchBoolean } from "../util/Functions";

import { UserContext } from "../context/userContext";

import Loading from "./loading";
import Unauthorized from "./unauthorized";
import PaginationTabsComponent from "./paginationTabsComponent";

function BuscarTurmasComponent() {

    const userContext = useContext(UserContext);

    const linkRef = useRef();

    const [turmas, setTurmas] = useState(null);

    const [turmasLoaded, setTurmasLoaded] = useState(true);

    const [currentPage, setCurrentPage] = useState(0);

    const [lastPage, setLastPage] = useState(0);

    const [searchStringTurma, setSearchStringTurma] = useState("");
    const [searchStringProfessor, setSearchStringProfessor] = useState("");

    useEffect(() => {
        axios.get(baseUrl + 'api/Turmas',
            {
                params: {
                    "pageNumber": currentPage,
                    "searchStringTurma": searchStringTurma.trim(),
                    "searchStringProfessor": searchStringProfessor.trim()
                },
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                console.log(response.data);
                setLastPage(response.data.totalPages)
                if (currentPage >= response.data.totalPages) {
                    setCurrentPage(0);
                }
                setTurmas(response.data.items);
            })
            .catch(function (error) {

            })
    }, [currentPage, searchStringTurma, searchStringProfessor]);

    if (userContext.userSignedIn === false) {
        return <Unauthorized />
    }

    if (turmas == null) {
        return (

            <div>
                <div className="d-flex my-4">
                    <h1 className="m-auto">Buscar turma</h1>
                </div>
                <Loading />
            </div>
        )
    }

    return (
        <div>
            <div className="d-flex my-4">
                <h1 className="m-auto">Buscar turma</h1>
            </div>
            <div className="container-fluid d-flex">
                <Link ref={linkRef} to="/" />
                <div className="d-flex flex-column m-auto mt-4 w-100">
                    <div className="d-flex flex-column">
                    <label htmlFor="search-turma">Buscar por nome da turma:</label>
                    <input id="search-turma" className="col-md-4" value={searchStringTurma} onChange={(e) => setSearchStringTurma(e.target.value)}></input>
                    <label htmlFor="search-professor" className="mt-2">Buscar por nome/email do professor:</label>
                    <input id="search-professor" className="col-md-4 mb-2" value={searchStringProfessor} onChange={(e) => setSearchStringProfessor(e.target.value)}></input>
                    </div>
                    <table className="table table-sm table-color table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Professor</th>
                                <th style={{ width: 90 }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                turmas.map((turma) =>
                                    <tr key={"turma" + turma.id}>
                                        <td>{turma.nome}</td>
                                        <td>{turma.descricao}</td>
                                        <td>{turma.professor.nome + " (" + turma.professor.email + ")"}</td>
                                        <td>
                                            <Link to={"/turmas/" + turma.id} className="btn btn-primary">Abrir</Link>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    {
                        turmas.length == 0 ? <div className="no-content-warning">Nenhuma turma cadastrada.</div> : null
                    }
                    <PaginationTabsComponent currentPage={currentPage} setCurrentPage={setCurrentPage} lastPage={lastPage}/>
                    <div className="d-flex flex-row-reverse">
                        <Link className='btn btn-secondary my-2' to={"/"}>Voltar</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuscarTurmasComponent