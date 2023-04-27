import React, { useState, useRef, useEffect, useContext } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";

import Unauthorized from "./unauthorized";
import Loading from "./loading";
import { ALFABETO } from "../util/Constants";
import { formatarData } from "../util/Functions";
import { UserContext } from "../context/userContext";
import { func } from "prop-types";

function FazerAtividadeComponent({ idAtividade }) {

    const userContext = useContext(UserContext);

    const linkRef = useRef();

    const [atividade, setAtividade] = useState(null);

    const [questoes, setQuestoes] = useState([]);

    const [respostasAluno, setRespostasAluno] = useState([""]);

    const [submissaoLiberada, setSubmissaoLiberada] = useState(false);

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
                setAtividade(response.data)
                setQuestoes(response.data.atividadeMongoDb.questoes)
            })
            .catch(function (error) {

            })
    }, []);

    if (userContext.userSignedIn === false) {
        return <Unauthorized />
    }

    if (atividade == null) return
    (
        <div>
            <div className="d-flex my-4">
                <h1 className="m-auto">Fazer atividade</h1>
            </div>
            <Loading />
        </div>
    )

    function submeterAtividade() {
        axios.post(baseUrl + 'api/Resultados',
            {
                "idAtividade": idAtividade,
                "respostas": respostasAluno,
            },
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                console.log(response.data)
                if (response.status == 200) {
                    window.alert("Respostas submetidas com sucesso!")
                }
            })
            .catch(function (error) {
                if (typeof error.response.data == 'string') {
                    window.alert(error.response.data)                
                }
                else {
                    window.alert("Erro ao submeter respostas!")
                }
            })
    }

    function updateRespostasAluno(index, indexAlternativa) {
        let newRespostasAluno = [];
        let liberarSubmissao = true;
        for (let i = 0; i < questoes.length; i++) {
            if (i === index) {
                newRespostasAluno.push(indexAlternativa);
            }
            else {
                if (typeof respostasAluno[i] != 'undefined') {
                    newRespostasAluno.push(respostasAluno[i]);
                }
                else {
                    liberarSubmissao = false;
                    newRespostasAluno.push("");
                }
            }
        }
        setSubmissaoLiberada(liberarSubmissao);
        setRespostasAluno(newRespostasAluno);
    }

    function radioButtonCheck(index, indexAlternativa) {
        if (respostasAluno.length < index) {
            return false;
        }

        if (respostasAluno[index] === indexAlternativa) {
            return true;
        }
        return false;
    }

    return (
        <div>
            <div className="d-flex my-4">
                <h1 className="m-auto">Fazer atividade</h1>
            </div>
            <div className="container-fluid d-flex flex-column">
                <Link ref={linkRef} to={"/turmas/" + atividade.turma.id} />
                <div className="d-flex m-auto" style={{ width: '80%' }}>
                    <div className="d-flex flex-column m-4 w-100">
                        <div className="d-flex justify-content-between align-items-center my-4">
                        <h2>{atividade.nome}</h2>
                        {
                            questoes.length == 0 ? <div className="no-content-warning mt-4">Nenhuma questão cadastrada.</div> : <div className="mb-2" style={{ fontSize: 20 }}><b>Valor total: </b>{atividade.valor.toFixed(2).replace(".", ",")}</div>
                        }
                        </div>
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
                                                <input checked={radioButtonCheck(index, indexAlternativa)} type="radio" className="mx-2" onClick={() => updateRespostasAluno(index, indexAlternativa)}></input>
                                                <div style={{ width: 20 }}>{ALFABETO[indexAlternativa]})</div>
                                                <div>{alternativa}</div>
                                            </div>
                                        )
                                    }
                                    {
                                        questao.resposta != null ?
                                            <div className="my-2 d-flex flex-row-reverse" style={{ fontSize: 18, color: 'green', fontWeight: 'bold' }}>
                                                Resposta: {ALFABETO[questao.resposta]}
                                            </div>
                                            : null
                                    }

                                </div>
                            )
                        }
                        <div className="d-flex flex-row-reverse my-2">
                            <button className="btn btn-secondary" onClick={() => linkRef.current.click()}>Voltar</button>
                            <button className="btn btn-primary mx-2" style={submissaoLiberada ? null : {opacity: 0.5, backgroundColor: 'gray', borderColor: 'gray'}} onClick={() => {submissaoLiberada? submeterAtividade() : window.alert("Preencha todas as questões!")}}>Submeter</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FazerAtividadeComponent