import React, { useState, useEffect, useRef } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";

function MinhasTurmasComponent() {

    const linkRef = useRef();

    const [turmas, setTurmas] = useState([]);

    const [turmasLoaded, setTurmasLoaded] = useState(false);

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
                setTurmasLoaded(true);
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
                setTurmasLoaded(false);
            })
            .catch(function (error) {
                window.alert("Não foi possível apagar a turma!")
            })
        }
    }

    return (
        <div className="container-fluid d-flex">
            <Link ref={linkRef} to="/" />
            <div className="d-flex flex-column m-auto mt-4 w-100">
                <table className="table table-sm table-color table-striped table-hover">
                    <thead>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Ativa</th>
                        <th style={{width: 240}}></th>
                    </thead>
                    <tbody>
                        {
                            turmas.map((turma) =>
                                <tr key={"turma" + turma.id}>
                                    <td>{turma.nome}</td>
                                    <td>{turma.descricao}</td>
                                    <td>{turma.ativo ? "Sim" : "Não"}</td>
                                    <td>
                                        <button className="btn btn-primary">Abrir</button>
                                        <Link to={"/editar-turma/" + turma.id} className="btn btn-secondary mx-2">Editar</Link>
                                        <button className="btn btn-danger" onClick={() => apagarTurma(turma.id)}>Apagar</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MinhasTurmasComponent