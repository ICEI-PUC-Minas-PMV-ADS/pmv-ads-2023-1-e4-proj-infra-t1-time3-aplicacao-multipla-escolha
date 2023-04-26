import React, { useState, useRef, useEffect } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";

import { ALFABETO } from "../util/Constants";
import { formatarData } from "../util/Functions";

function VisualizarAtividadeComponent({idAtividade }) {


    const linkRef = useRef();

    const [atividade, setAtividade] = useState(null);

    const [questoes, setQuestoes] = useState([]);

    const [editIndexQuestao, setEditIndexQuestao] = useState(null);

    useEffect(() => {
        axios.get(baseUrl + 'api/Atividades/' + idAtividade,
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                console.log(response.data)
                setAtividade(response.data)
                setQuestoes(response.data.atividadeMongoDb.questoes)
            })
            .catch(function (error) {

            })
    }, []);

    if (atividade == null) return <div></div>

    return (
        <div className="container-fluid d-flex flex-column">
            <Link ref={linkRef} to={"/turmas/" + atividade.turma.id} />
            <div className="d-flex m-auto" style={{width: '80%'}}>
                <div className="d-flex flex-column m-4 w-100">
                    <div><b>Nome:</b> {atividade.nome}</div>
                    <div><b>Descrição:</b> {atividade.descricao}</div>
                    <div><b>Prazo de entrega:</b> {atividade.dataPrazoDeEntrega == null? "Sem prazo" : formatarData(atividade.dataPrazoDeEntrega, true)}</div>
                    <div><b>Turma: </b> <Link to={"/turmas/" + atividade.turma.id}>{atividade.turma.nome}</Link></div>                
                    {
                        questoes.length == 0 ? <div className="no-content-warning mt-4">Nenhuma questão cadastrada.</div> : <div className="mb-2" style={{ fontSize: 16 }}><b>Valor total: </b>{atividade.valor.toFixed(2).replace(".", ",")}</div>
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
                                        <div style={indexAlternativa == questao.resposta ? { color: 'green', fontWeight: 'bold' } : null} key={"questao" + (index + 1) + "alternativa " + (indexAlternativa + 1)} className="alternativa-container d-flex align-items-center">
                                            <div style={{ width: 20 }}>{ALFABETO[indexAlternativa]})</div>
                                            <div>{alternativa}</div>
                                        </div>
                                    )
                                }
                                <div className="my-2 d-flex flex-row-reverse" style={{ fontSize: 18, color: 'green', fontWeight: 'bold' }}>
                                    Resposta: {ALFABETO[questao.resposta]}
                                </div>

                            </div>
                        )
                    }
                    <div className="d-flex flex-row-reverse my-2">
                        <button className="btn btn-secondary" onClick={() => linkRef.current.click()}>Voltar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualizarAtividadeComponent