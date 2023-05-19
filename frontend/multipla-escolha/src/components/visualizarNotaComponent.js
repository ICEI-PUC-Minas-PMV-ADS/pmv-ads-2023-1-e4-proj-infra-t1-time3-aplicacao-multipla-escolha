import React, { useState, useRef, useEffect, useContext } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";

import Unauthorized from "./unauthorized";
import Loading from "./loading";
import { ALFABETO } from "../util/Constants";
import { formatarData, normalizeString } from "../util/Functions";
import { UserContext } from "../context/userContext";

function VisualizarNotaComponent({ idTurma, idAluno }) {

    const userContext = useContext(UserContext);

    const linkRef = useRef();

    const [turma, setTurma] = useState(null);

    const [atividades, setAtividades] = useState(null);

    const [searchString, setSearchString] = useState("");

    const [infoAluno, setInfoaluno] = useState(null);

    useEffect(() => {
        axios.get(baseUrl + 'api/Turmas/' + idTurma,
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                params: {
                    idAluno: idAluno,
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                setTurma(response.data)
                setAtividades(response.data.atividades)
                setSearchString("");
                const aluno = response.data.alunosTurma.find(at => at.idAluno = idAluno).aluno;
                setInfoaluno(aluno);
            })
            .catch(function (error) {
                setTurma(false);
            })
    }, []);

    useEffect(() => {
        if (turma != null && turma.atividades != null) {
            let newAtividades = [];
            for (let i = 0; i < turma.atividades.length; i++) {
                if (normalizeString(turma.atividades[i].nome).includes(normalizeString(searchString))) {
                    newAtividades.push(turma.atividades[i]);
                }
            }
            setAtividades(newAtividades);
        }
    }, [searchString]);

    if (userContext.userSignedIn === false || turma == false || (turma != null && turma.professor.id != userContext.userData.id && infoAluno != null && infoAluno.id != userContext.userData.id)) {
        return <Unauthorized />
    }

    if (turma == null) {
        return (
            <div>
                <div className="d-flex my-4">
                    <h1 className="text-dark-gray mt-4">VISUALIZAR NOTAS</h1>
                </div>
                <Loading />
            </div>
        )
    }

    function getStatusColor(status) {
        if (status == "Entregue") return {color: 'green', fontWeight: 700};
        if (status == "Atividade pendente") return {color: 'darkblue', fontWeight: 700};
        if (status == "Atividade atrasada") return {color: 'darkred', fontWeight: 700};
    }

    return (
        <div>
            <div className="d-flex my-4 flex-column">
                <h1 className="text-dark-gray mt-4">VISUALIZAR NOTAS ({turma.nome})</h1>
                <h2 className="text-dark-gray m-2">Aluno {infoAluno != null? infoAluno.nome + " " + infoAluno.sobrenome : null}</h2>
            </div>
            <div className="d-flex flex-column my-4">
                <label htmlFor="buscar-aluno">Buscar atividade</label>
                <input type="text" id="buscar-aluno" placeholder="Nome da atividade" className="input-text col-4" value={searchString} onChange={(e) => setSearchString(e.target.value)}></input>
            </div>
            <div className="container-fluid d-flex flex-column mt-2">
                <table className="table table-sm table-color table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Prazo</th>
                            <th>Status</th>
                            <th>Nota máxima</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            atividades.map((atividade) =>
                                <tr key={"atividade" + atividade.id}>
                                    <td>{atividade.nome}</td>
                                    <td>{atividade.dataPrazoDeEntrega == null? "Sem prazo" : formatarData(atividade.dataPrazoDeEntrega, true)}</td>
                                    <td style={getStatusColor(atividade.status)}>{atividade.status}</td>
                                    <td>{atividade.valor.toString().replace(".", ",")}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
                {
                    atividades.length == 0 ? <div className="no-content-warning">Nenhuma turma cadastrada.</div> : null
                }
            </div>
            <div className="d-flex flex-row-reverse my-4">
                {
                    turma.professor.id == userContext.userData.id ?
                    <Link className="btn btn-secondary" to={"/turmas/" + idTurma + "/notas-alunos"}>Voltar</Link>
                    :
                    <Link className="btn btn-secondary" to={"/turmas/" + idTurma}>Voltar</Link>
                }
            </div>
        </div>
    );
}

export default VisualizarNotaComponent;