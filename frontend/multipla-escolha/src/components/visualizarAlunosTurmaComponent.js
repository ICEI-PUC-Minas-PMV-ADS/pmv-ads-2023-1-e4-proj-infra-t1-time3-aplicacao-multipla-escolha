import React, { useState, useRef, useEffect, useContext } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";

import Unauthorized from "./unauthorized";
import Loading from "./loading";
import { ALFABETO } from "../util/Constants";
import { formatarData, normalizeString } from "../util/Functions";
import { UserContext } from "../context/userContext";

function VisualizarAlunosTurmaComponent({ idTurma }) {

    const userContext = useContext(UserContext);

    const linkRef = useRef();

    const [turma, setTurma] = useState(null);

    const [alunos, setAlunos] = useState(null);

    const [searchString, setSearchString] = useState("");

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
                setAlunos(response.data.alunosTurma)
                setSearchString("");
            })
            .catch(function (error) {
                setTurma(false);
            })
    }, []);

    useEffect(() => {
        if (turma != null && turma.alunosTurma != null) {
            let newAlunos = [];
            for (let i = 0; i < turma.alunosTurma.length; i++) {
                if (normalizeString(turma.alunosTurma[i].aluno.nome + " " + turma.alunosTurma[i].aluno.sobrenome + " " + turma.alunosTurma[i].aluno.email).includes(normalizeString(searchString))) {
                    newAlunos.push(turma.alunosTurma[i]);
                }
            }
            setAlunos(newAlunos);
        }
    }, [searchString]);

    if (userContext.userSignedIn === false || turma == false || (turma != null && turma.professor.id != userContext.userData.id)) {
        return <Unauthorized />
    }

    if (turma == null) {
        return (
            <div>
                <div className="d-flex my-4">
                    <h1 className="m-auto">Selecionar aluno</h1>
                </div>
                <Loading />
            </div>
        )
    }

    return (
        <div>
            <div className="d-flex my-4">
                <h1 className="text-dark-gray my-4">VISUALIZAR NOTAS ({turma.nome})</h1>
            </div>
            <div className="d-flex flex-column my-4">
                <label htmlFor="buscar-aluno">Buscar aluno</label>
                <input type="text" id="buscar-aluno" placeholder="Nome ou email do aluno" className="input-text col-4" value={searchString} onChange={(e) => setSearchString(e.target.value)}></input>
            </div>
            <div className="container-fluid d-flex flex-column">
            <table className="table table-sm table-color table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                alunos.map((alunosTurma) =>
                                    <tr key={"aluno" + alunosTurma.alunoId}>
                                        <td>{alunosTurma.aluno.nome} {alunosTurma.aluno.sobrenome}</td>
                                        <td>{alunosTurma.aluno.email}</td>
                                        <td style={{width: 200}}><Link className="btn btn-primary" to={"/turmas/" + idTurma + "/notas-alunos/" + alunosTurma.alunoId}>Visualizar notas</Link></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    {
                        alunos.length == 0 ? <div className="no-content-warning">Nenhuma turma cadastrada.</div> : null
                    }
            </div>
            <div className="d-flex flex-row-reverse my-4">
                <Link className="btn btn-secondary" to={"/turmas/" + idTurma}>Voltar</Link>
            </div>
        </div>
    );
}

export default VisualizarAlunosTurmaComponent