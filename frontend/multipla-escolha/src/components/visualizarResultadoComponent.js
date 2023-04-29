import React, { useState, useRef, useEffect, useContext } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";

import Unauthorized from "./unauthorized";
import Loading from "./loading";
import { ALFABETO } from "../util/Constants";
import { formatarData } from "../util/Functions";
import { UserContext } from "../context/userContext";

function VisualizarResultadoComponent({ idResultado }) {

    const userContext = useContext(UserContext);

    const linkRef = useRef();

    const [resultado, setResultado] = useState(null);

    const [questoes, setQuestoes] = useState([]);

    useEffect(() => {
        axios.get(baseUrl + 'api/Resultados/' + idResultado,
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                setResultado(response.data)
                setQuestoes(response.data.atividadeMongoDb.questoes)
            })
            .catch(function (error) {
                setResultado(false);
            })
    }, []);

    if (userContext.userSignedIn === false || resultado == false) {
        return <Unauthorized />
    }

    if (resultado == null) {
        return (
            <div>
                <div className="d-flex my-4">
                    <h1 className="m-auto">Visualizar resultado</h1>
                </div>
                <Loading />
            </div>
        )
    }

    return (
        <div>
            <div className="d-flex my-4">
                <h1 className="m-auto">Visualizar resultado</h1>
            </div>
            <div className="container-fluid d-flex flex-column">
                <Link ref={linkRef} to={"/atividades/" + resultado.atividade.id} />
                <div className="d-flex m-auto" style={{ width: '80%' }}>
                    <div className="d-flex flex-column m-4 w-100">
                        <div><b>Atividade: </b><Link to={"/atividades/" + resultado.atividade.id}>{resultado.atividade.nome}</Link></div>
                        <div><b>Turma: </b><Link to={"/turmas/" + resultado.atividade.turma.id}>{resultado.atividade.turma.nome}</Link></div>
                        <div className="my-3">
                            <div><b>Número da tentativa:</b> {resultado.numeroDaTentativa}</div>
                            <div><b>Data da tentativa:</b> {resultado.dataDaTentativa == null ? "Sem prazo" : formatarData(resultado.dataDaTentativa, true)}</div>
                        </div>
                        {
                            questoes.length == 0 ? <div className="no-content-warning mt-4">Nenhuma questão cadastrada.</div> :
                                <div>
                                    <div className="mb-2" style={{ fontSize: 16 }}><b>Nota obtida: </b>{resultado.notaDoAluno.toFixed(2).replace(".", ",") + "/" + resultado.notaMaxima.toFixed(2).replace(".", ",")}</div>
                                </div>
                        }
                        {
                            questoes.map((questao, index) =>
                                <div key={"questao" + (index + 1)} className="questao-container">
                                    <div className="d-flex justify-content-between w-100">
                                        <div className="h5">{"Questão " + (index + 1)}</div>
                                        <div className="h5">{"Valor " + parseFloat(questao.valor).toFixed(2).replace(".", ",")}</div>
                                    </div>
                                    <div className="my-4 p-2">
                                        {questao.enunciado}
                                    </div>
                                    {
                                        questao.alternativas.map((alternativa, indexAlternativa) =>
                                            <div style={indexAlternativa == questao.resposta ? (questao.alunoAcertouResposta == true ? { color: 'green', fontWeight: 'bold' } : { color: 'red', fontWeight: 'bold' }) : null} key={"questao" + (index + 1) + "alternativa " + (indexAlternativa + 1)} className="alternativa-container d-flex align-items-center">
                                                <div style={{ width: 20 }}>{ALFABETO[indexAlternativa]})</div>
                                                <div>{alternativa}</div>
                                            </div>
                                        )
                                    }
                                    {
                                        questao.alunoAcertouResposta == true ?
                                            <div className="my-2 d-flex flex-row-reverse" style={{ fontSize: 18, color: 'green', fontWeight: 'bold' }}>
                                                Resposta correta!
                                            </div>
                                            :
                                            <div className="my-2 d-flex flex-row-reverse" style={{ fontSize: 18, color: 'red', fontWeight: 'bold' }}>
                                                Resposta incorreta!
                                            </div>
                                    }

                                </div>
                            )
                        }
                        <div className="d-flex flex-row-reverse my-2">
                            <button className="btn btn-secondary" onClick={() => linkRef.current.click()}>Voltar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualizarResultadoComponent