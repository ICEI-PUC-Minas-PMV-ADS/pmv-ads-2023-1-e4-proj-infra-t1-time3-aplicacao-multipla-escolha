import React, { useState, useEffect, useRef, useContext } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

function VisualizarTurmaComponent({ idTurma }) {

    const userContext = useContext(UserContext);

    const linkRef = useRef();

    const [turma, setTurma] = useState(null);

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
                console.log(response.data)
                setTurma(response.data)
            })
            .catch(function (error) {

            })
    }, []);

    if (turma == null) {
        return <div></div>
    }

    function formatarData(data, showHours = false) {

        if (data == null) return "Sem prazo";

        let separateData = data.split("-");

        let newData = separateData[2].substr(0, 2) + "/" + separateData[1] + "/" + separateData[0].substr(2,4);

        if (showHours) {
            newData += " - " + separateData[2].substr(3,5);
        }

        return newData;
    }

    if (turma == null) return null;

    let donoDaTurma = false;

    if (turma.professor.id == userContext.userData.id) donoDaTurma = true; 

    return (
        <div className="container-fluid d-flex">
            <Link ref={linkRef} to="/minhas-turmas" />
            <div className="w-100">

                <div className="d-flex flex-column mt-4">
                    <p className="h4"><b>Nome:</b> {turma.nome}</p>
                    <p className="h4"><b>Descrição:</b> {turma.descricao}</p>
                    <p className="h4"><b>Ativa:</b> {turma.ativo ? "Sim" : "Não"}</p>
                </div>
                <div className="mt-4">
                    <p className="h4"><b>Atividades:</b></p>
                    <table className="table table-sm table-color table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Descrição</th>
                                <th>Criada em</th>
                                <th>Prazo de entrega</th>
                                <th>Valor</th>
                                <th></th>
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
                                        <td>{atividade.valor != 0 ? atividade.valor : "Não avaliativa"}</td>
                                        <td>
                                            <Link to={"/turmas/" + turma.id} className="btn btn-primary">Abrir</Link>
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
                        <Link className='btn btn-primary my-2' to={"/turmas/" + turma.id + "/atividades/criar"}>Nova atividade</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualizarTurmaComponent