import React, { useState, useRef, useEffect, useContext } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";

import Unauthorized from "./unauthorized";
import Loading from "./loading";
import { ALFABETO } from "../util/Constants";
import { formatarData } from "../util/Functions";
import { UserContext } from "../context/userContext";
import { faL } from "@fortawesome/free-solid-svg-icons";

function VisualizarAtividadeComponent({ idAtividade }) {

    const userContext = useContext(UserContext);

    const linkRef = useRef();

    const [atividade, setAtividade] = useState(null);

    const [questoes, setQuestoes] = useState([]);

    const [indexMaiorNota, setIndexMaiorNota] = useState(0);

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
                let maiorNota = 0;
                let newIndexMaiorNota = 0;
                for (let i = 0; i < response.data.tentativasAnteriores.length; i++) {
                    const porcentagemNotaAluno = response.data.tentativasAnteriores[i].notaDoAluno / response.data.tentativasAnteriores[i].notaMaxima;
                    if (porcentagemNotaAluno >= maiorNota) {
                        maiorNota = porcentagemNotaAluno;
                        newIndexMaiorNota = i;
                    }
                }
                setIndexMaiorNota(newIndexMaiorNota);
            })
            .catch(function (error) {
                setAtividade(false);
            })
    }, []);

    if (userContext.userSignedIn === false || atividade == false) {
        return <Unauthorized />
    }

    if (atividade == null) {
        return (
            <div>
                <div className="d-flex my-4">
                    <h1 className="m-auto">Visualizar atividade</h1>
                </div>
                <Loading />
            </div>
        )
    }

    function checarPrazoDeEntregaExpirado(prazo) {
        const currentDate = new Date().toLocaleString();
        const separateFullDate = currentDate.split(", ");
        const separateDate = separateFullDate[0].split("/");
        const formatedCurrentDate = separateDate[2] + "-" + separateDate[1] + "-" + separateDate[0] + "T" + separateFullDate[1];

        console.log(prazo)
        console.log(formatedCurrentDate)

        if (prazo < formatedCurrentDate) {
            return true;
        }
        return false;
    }

    return (
        <div>
            <div className="d-flex my-4">
                <h1 className="m-auto">Visualizar atividade</h1>
            </div>
            <div className="container-fluid d-flex flex-column">
                <Link ref={linkRef} to={"/turmas/" + atividade.turma.id} />
                <div className="d-flex m-auto" style={{ width: '80%' }}>
                    <div className="d-flex flex-column m-4 w-100">
                        <div><b>Nome:</b> {atividade.nome}</div>
                        <div><b>Descrição:</b> {atividade.descricao}</div>
                        <div className="d-flex">
                        <div><b>Prazo de entrega:</b> {atividade.dataPrazoDeEntrega == null ? "Sem prazo" : formatarData(atividade.dataPrazoDeEntrega, true)}</div>
                        {
                            (atividade.dataPrazoDeEntrega != null && checarPrazoDeEntregaExpirado(atividade.dataPrazoDeEntrega)) ? <div style={{color: 'red', marginLeft: 8}}>- Prazo esgotado!</div> : null
                        }
                        </div>
                        <div><b>Turma: </b> <Link to={"/turmas/" + atividade.turma.id}>{atividade.turma.nome}</Link></div>
                        {
                            atividade.podeSerRealizada ?
                                <div className="d-flex flex-row-reverse my-2">
                                    <Link to={"/fazer-atividade/" + idAtividade} className="btn btn-primary">Fazer atividade</Link>
                                </div>
                                :
                                null
                        }
                        {
                            questoes.length == 0 ? <div className="no-content-warning mt-4">Nenhuma questão cadastrada.</div> : <div className="mb-2" style={{ fontSize: 16 }}><b>Valor total: </b>{atividade.valor.toFixed(2).replace(".", ",")}</div>
                        }
                        <div className="d-flex"><b>Tentativas permitidas: </b>
                        <div className="mx-1">{atividade.tentativasPermitidas == null ? "Sem limite" : atividade.tentativasPermitidas}</div>
                            {
                                (atividade.tentativasPermitidas != null && atividade.tentativasAnteriores.length >= atividade.tentativasPermitidas) ? <div style={{color: 'red'}}>- Tentativas esgotadas!</div> : null
                            }
                        </div>

                        {
                            atividade.tentativasAnteriores.length > 0 ?
                                <div className="mt-3">
                                    <div className="h4">Tentativas anteriores: {atividade.tentativasAnteriores.length}</div>
                                    <div className="h5">Nota mantida: {parseFloat(atividade.tentativasAnteriores[indexMaiorNota].notaDoAluno).toFixed(2).toString().replace(".", ",") + "/" + parseFloat(atividade.tentativasAnteriores[indexMaiorNota].notaMaxima).toFixed(2).toString().replace(".", ",")}</div>
                                    <table className="table table-sm table-color table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Data da tentativa</th>
                                                <th>Nota</th>
                                                <th style={{ width: 120 }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {atividade.tentativasAnteriores.map((tentativa) =>
                                                <tr key={"tentativa " + tentativa.numeroDaTentativa}>
                                                    <td>{formatarData(tentativa.dataDaTentativa, true)}</td>
                                                    <td>{parseFloat(tentativa.notaDoAluno).toFixed(2).toString().replace(".", ",") + "/" + parseFloat(tentativa.notaMaxima).toFixed(2).toString().replace(".", ",")}</td>
                                                    <td><Link to={"/resultados/" + tentativa.id} className="btn btn-primary">Visualizar</Link></td>
                                                </tr>
                                            )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                :
                                null
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisualizarAtividadeComponent