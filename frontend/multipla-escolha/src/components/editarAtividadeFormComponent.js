import React, { useState, useRef, useEffect, useContext } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "./loading";
import Unauthorized from "./unauthorized";

import { ALFABETO } from "../util/Constants";
import { UserContext } from "../context/userContext";


function EditarAtividadeFormComponent({ idAtividade }) {

    const userContext = useContext(UserContext);

    const linkRef = useRef();

    const [atividade, setAtividade] = useState(null);

    const dataDeEntregaRef = useRef();

    const [nome, setNome] = useState("");

    const [descricao, setDescricao] = useState("");

    const [dataDeEntrega, setDataDeEntrega] = useState("");

    const [valorAtividade, setValorAtividade] = useState(0);

    const [errorMessage, setErrorMessage] = useState("");

    const [questoes, setQuestoes] = useState([]);

    const [valorQuestao, setValorQuestao] = useState(0);

    const [enunciado, setEnunciado] = useState("");

    const [tentativasIlimitadas, setTentativasIlimitadas] = useState(false);

    const [tentativasPermitidas, setTentativasPermitidas] = useState(1);

    const [numeroAlternativas, setNumeroAlternativas] = useState(4);

    const [alternativas, setAlternativas] = useState([]);

    const [resposta, setResposta] = useState(0);

    const [showModal, setShowModal] = useState(false);

    const [editIndexQuestao, setEditIndexQuestao] = useState(null);

    const [skipScroll, setSkipScroll] = useState(true);

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
                setNome(response.data.nome)
                setDescricao(response.data.descricao)
                setValorAtividade(response.data.valor)
                setDataDeEntrega(response.data.dataPrazoDeEntrega)
                if (response.data.tentativasPermitidas == null) {
                    setTentativasIlimitadas(true)
                }
                else {
                    setTentativasPermitidas(response.data.tentativasPermitidas)
                }
                setQuestoes(response.data.atividadeMongoDb.questoes)
            })
            .catch(function (error) {
                setAtividade(false);
            })
    }, []);

    useEffect(() => {
        if (!skipScroll) {
            window.scrollTo({
                top: document.body.scrollHeight,
                left: 0,
                behavior: 'instant',
            });
            setSkipScroll(false);
        }
    }, [questoes]);

    useEffect(() => {
        for (let i = 0; i < numeroAlternativas; i++) {
            let inputQuestao = document.getElementById("editQuestao " + i);
            if (inputQuestao != null) {
                inputQuestao.value = alternativas[i];
            }
        }
    }, [editIndexQuestao]);

    function editarAtividade() {
        if (nome.trim().length < 1) {
            document.getElementById("nome").focus();
            return setErrorMessage("Preencher nome da atividade!");
        }

        if (descricao.trim().length < 1) {
            document.getElementById("descricao").focus();
            return setErrorMessage("Preencher descrição da atividade!");
        }

        if (questoes.length < 1) {
            return setErrorMessage("Adicionar ao menos uma questão!");
        }

        axios.put(baseUrl + 'api/Atividades',
            {
                "id": idAtividade,
                "nome": nome,
                "descricao": descricao,
                "tentativasPermitidas": tentativasPermitidas > 0 && !tentativasIlimitadas ? tentativasPermitidas : null,
                "atividadeMongoDb": { "questoes": questoes },
                "dataPrazoDeEntrega": (dataDeEntrega == null || dataDeEntrega.length > 0) ? dataDeEntrega : null,
                "valor": valorAtividade
            },
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                window.alert("Atividade atualizada com sucesso!")
                linkRef.current.click();
            })
            .catch(function (error) {
                setErrorMessage(error.request.response);
            })
    }

    function adicionarQuestao() {

        if (enunciado.trim().length < 1) return window.alert("Preencher enunciado!")

        if (alternativas.length < 1) return window.alert("Preencher alternativa A!")

        let newAlternativas = [];

        for (let i = 0; i < numeroAlternativas; i++) {
            if (alternativas[i] == null || alternativas[i].trim().length < 1) return window.alert("Preencher alternativa " + ALFABETO[i] + "!")
            newAlternativas.push(alternativas[i])
        }

        const model = {
            "valor": Math.abs(parseFloat(valorQuestao)).toFixed(2),
            "enunciado": enunciado,
            "imagem": "",
            "alternativas": newAlternativas,
            "resposta": resposta
        };

        setEnunciado("");

        setValorQuestao(0);

        setNumeroAlternativas(4);

        setResposta(0);

        setAlternativas([]);

        let questoesCopy = [];

        let newValorAtividade = 0;

        if (editIndexQuestao == null) {
            setSkipScroll(false);

            for (let i = 0; i < questoes.length; i++) {
                questoesCopy.push(questoes[i]);
                newValorAtividade += parseFloat(questoes[i].valor);
            }

            questoesCopy.push(model);
            newValorAtividade += parseFloat(model.valor);
        }
        else {
            for (let i = 0; i < questoes.length; i++) {
                if (i != editIndexQuestao) {
                    questoesCopy.push(questoes[i]);
                    newValorAtividade += parseFloat(questoes[i].valor);
                }
                else {
                    questoesCopy.push(model);
                    newValorAtividade += parseFloat(model.valor);
                }
            }
        }

        setQuestoes(questoesCopy);

        setValorAtividade(newValorAtividade);

        setEditIndexQuestao(null);

        setShowModal(false);
    }

    function fecharModal() {
        setEnunciado("");
        setValorQuestao(0);
        setNumeroAlternativas(4);
        setAlternativas([]);
        setResposta(0);
        setEditIndexQuestao(null);
        setSkipScroll(false);
        setShowModal(false);
    }

    function updateNumeroAlternativas(valor) {

        valor = parseInt(valor);

        if (valor > 26) valor = 26;

        if (valor < 2) valor = 2;

        setNumeroAlternativas(valor);
    }

    function renderQuestoes() {

        let selectResposta = [];

        let questoes = [];

        for (let i = 0; i < numeroAlternativas; i++) {
            questoes.push(
                <div key={"alternativa" + i} className="d-flex align-items-center w-100">
                    <div style={{ width: 16 }}>{ALFABETO[i]}.</div>
                    <input id={"editQuestao " + i} className="m-2 col-10" onChange={(e) => updateAlternativas(i, e.target.value)} />
                </div>
            );

            selectResposta.push(
                <option key={"opcao-resposta " + i} value={i}>{ALFABETO[i]}</option>
            );
        }

        return (<div className="w-100">
            <label htmlFor="select-resposta">Resposta</label>
            <br />
            <select id="select-resposta" value={resposta} onChange={(e) => setResposta(e.target.value)}>
                {selectResposta}
            </select>
            <div className="my-4 w-100">
                {questoes}
            </div>
        </div>)
    }

    function updateAlternativas(index, newValue) {

        let newAlternativas = [];
        for (let i = 0; i < numeroAlternativas; i++) {
            if (i == index) {
                newAlternativas.push(newValue)
            }
            else {
                if (typeof alternativas[i] != 'undefined') {
                    newAlternativas.push(alternativas[i]);
                }
                else {
                    newAlternativas.push("");
                }
            }
        }
        setAlternativas(newAlternativas);
    }

    function apagarQuestao(index) {

        if (window.confirm("Tem certeza que deseja apagar a questão?")) {

            let newQuestoes = [];

            let newValorAtividade = 0;

            for (let i = 0; i < questoes.length; i++) {
                if (i != index) {
                    newQuestoes.push(questoes[i]);
                    newValorAtividade += parseFloat(questoes[i].valor);
                }
            }

            setValorAtividade(newValorAtividade);

            setQuestoes(newQuestoes);
        }
    }

    function editarQuestao(index) {

        setSkipScroll(true);

        setEditIndexQuestao(index);

        setEnunciado(questoes[index].enunciado)

        setValorQuestao(parseFloat(questoes[index].valor))

        setResposta(questoes[index].resposta)

        setNumeroAlternativas(questoes[index].alternativas.length)

        setAlternativas(questoes[index].alternativas);

        setShowModal(true);

        setErrorMessage("");
    }

    if (userContext.userSignedIn === false || atividade == false) {
        return <Unauthorized />
    }

    if (atividade == null) return (
        <div>
            <div className="d-flex my-4">
                <h1 className="m-auto">Editar atividade</h1>
            </div>
            <Loading />
        </div>
    )

    if (userContext.userData.id != atividade.turma.professor.id) {
        return <Unauthorized />
    }

    return (
        <div>
            <div className="d-flex my-4">
                <h1 className="m-auto">Editar atividade</h1>
            </div>
            <div className="container-fluid d-flex flex-column">
                <Link ref={linkRef} to={"/turmas/" + atividade.turma.id} />
                <div className="d-flex m-auto">
                    <div className="d-flex flex-column m-4">
                        <div className="h2">Informações gerais</div>
                        <label htmlFor="nome">Nome da atividade</label>
                        <input className="mb-2" style={{ maxWidth: 400 }} id="nome" value={nome} onChange={(e) => { setNome(e.target.value); setErrorMessage("") }}></input>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea style={{ height: 150, width: '50vw' }} className="mb-2" id="descricao" value={descricao} onChange={(e) => { setDescricao(e.target.value); setErrorMessage("") }}></textarea>
                        <label htmlFor="prazo">Prazo de entrega</label>
                        <div>
                            <input ref={dataDeEntregaRef} style={{ width: 400 }} type="datetime-local" className="mb-2" id="prazo" value={dataDeEntrega} onChange={(e) => { setDataDeEntrega(e.target.value); setErrorMessage("") }}></input>
                            <button className="btn btn-primary p-1 mx-2" onClick={() => { setDataDeEntrega(""); dataDeEntregaRef.current.value = null }}>Sem prazo</button>
                        </div>
                        <label>Tentativas ilimitadas?</label>
                        <div>
                            <input checked={tentativasIlimitadas} onClick={() => setTentativasIlimitadas(true)} className="m-2" type="radio" style={{ maxWidth: 60 }} id="tentativas-ilimitadas-sim" value={tentativasPermitidas} min={1} onChange={(e) => { setTentativasPermitidas(e.target.value); setErrorMessage("") }}></input>
                            <label htmlFor="tentativas-ilimitadas-sim">Sim</label>
                            <input checked={!tentativasIlimitadas} onClick={() => setTentativasIlimitadas(false)} className="m-2" type="radio" style={{ maxWidth: 60 }} id="tentativas-ilimitadas-nao" value={tentativasPermitidas} min={1} onChange={(e) => { setTentativasPermitidas(e.target.value); setErrorMessage("") }}></input>
                            <label htmlFor="tentativas-ilimitadas-nao">Não</label>
                        </div>
                        {
                            tentativasIlimitadas ?
                                null
                                :
                                <>
                                    <label htmlFor="tentativas-permitidas">Tentativas permitidas</label>
                                    <input className="mb-2" type="number" style={{ maxWidth: 60 }} id="tentativas-permitidas" value={tentativasPermitidas} min={1} onChange={(e) => { setTentativasPermitidas(e.target.value); setErrorMessage("") }}></input>
                                    <div className="h2 mt-4">Visualização</div>
                                </>
                        }
                        <div className="h2 mt-4">Visualização</div>
                        {
                            questoes.length == 0 ? <div className="no-content-warning mt-4">Nenhuma questão cadastrada.</div> : <div className="my-2" style={{ fontSize: 20 }}><b>Valor total: </b>{valorAtividade.toFixed(2).replace(".", ",")}</div>
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
                                    <div className="d-flex flex-row-reverse mt-4">
                                        <button className="btn btn-danger" onClick={() => apagarQuestao(index)}>Apagar</button>
                                        <button className="btn btn-secondary mx-2" onClick={() => editarQuestao(index)}>Editar</button>
                                    </div>
                                </div>
                            )
                        }
                        <div className="d-flex">
                            <button className="btn btn-primary m-auto mt-3" onClick={() => { setShowModal(true); setErrorMessage("") }}>Adicionar questão</button>
                        </div>
                        {errorMessage.length > 0 ? <div className="error-message-warning mt-4">{errorMessage}</div> : null}
                    </div>
                </div>
                <div className="w-100 d-flex flex-row-reverse m-4">
                    <button className="btn btn-secondary" onClick={() => linkRef.current.click()}>Cancelar</button>
                    <button className="btn btn-primary mx-2" onClick={() => editarAtividade()}>Atualizar atividade</button>
                </div>
                {
                    showModal ?
                        <div className="modal-background">
                            <div className="d-flex flex-column m-auto modal-layout" style={numeroAlternativas > 4 ? { overflowY: 'scroll' } : null}>
                                <div className="d-flex flex-row-reverse">
                                    <button onClick={() => fecharModal()}>X</button>
                                </div>
                                <div className="d-flex flex-column p-3">
                                    <div className="h2">{editIndexQuestao == null ? "Adicionar questão" : "Editar questão"}</div>
                                    <label htmlFor="valor-questao">Valor</label>
                                    <input className="mb-2" type="number" style={{ maxWidth: 60 }} id="valor-questao" value={valorQuestao} min={0} onChange={(e) => { setValorQuestao(e.target.value); setErrorMessage("") }}></input>
                                    <label htmlFor="enunciado">Enunciado</label>
                                    <textarea style={{ height: 150, width: 500 }} className="mb-2" id="enunciado" value={enunciado} onChange={(e) => { setEnunciado(e.target.value); setErrorMessage("") }}></textarea>
                                    <label htmlFor="numero-alternativas">Número de alternativas</label>
                                    <input className="mb-2" type="number" style={{ maxWidth: 60 }} id="numero-alternativas" value={numeroAlternativas} onChange={(e) => { updateNumeroAlternativas(e.target.value); setErrorMessage("") }}></input>
                                    {renderQuestoes()}
                                    <div className="d-flex flex-row-reverse">
                                        <button className="btn btn-secondary mx-1" onClick={() => fecharModal()}>Cancelar</button>
                                        <button className="btn btn-primary mx-1" onClick={() => adicionarQuestao()}>{editIndexQuestao == null ? "Adicionar questão" : "Editar questão"}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        </div>
    );
}

export default EditarAtividadeFormComponent