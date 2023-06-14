import React, { useState, useEffect, useRef, useContext } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";

import { UserContext } from "../context/userContext";

import Loading from "./loading";
import Unauthorized from "./unauthorized";

import { formatarData } from "../util/Functions";

function VisualizarNotificacoesComponent() {

    const userContext = useContext(UserContext);

    const [notificacoes, setNotificacoes] = useState(null);

    const [numeroDeNovasNotificacoes, setNumeroDeNovasNotificacoes] = useState(0);

    useEffect(() => {
        if (userContext.userData != null && userContext.userData.numeroDeNotificacoesNaoLidas > 0) {
            setNumeroDeNovasNotificacoes(userContext.userData.numeroDeNotificacoesNaoLidas);
        }
    }, [userContext]);

    useEffect(() => {
        axios.get(baseUrl + 'api/Usuarios/notificacoes',
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        ).then(function (response) {
            setNotificacoes(response.data.notificacoes.reverse())
        })
            .catch(function (error) {

            })
    }, []);

    if (userContext.userSignedIn === false) {
        return <Unauthorized />
    }

    if (notificacoes == null) {
        return (
            <div>
                <div className="d-flex my-4">
                    <h1 className="m-auto">Buscar notificacao</h1>
                </div>
                <Loading />
            </div>
        )
    }

    return (
        <div>
            <div className="d-flex my-4">
                <h1 className="text-dark-gray">NOTIFICAÇÕES</h1>
            </div>
            {
                notificacoes.map((notificacao, index) =>
                    <div key={"notificacao" + index} className="notificacao-card" style={{ minHeight: 180 }}>
                        <div className="d-flex justify-content-between">
                            <div style={{ fontSize: 18 }}><b>{notificacao.titulo}</b></div>
                            <div className="d-flex">
                                {
                                    index < numeroDeNovasNotificacoes ?
                                        <div style={{ fontSize: 18, fontWeight: 'bold', color: 'blue', marginRight: 24 }}>Nova notificação</div>
                                        :
                                        null
                                }
                                <div style={{ fontSize: 18 }}>{formatarData(notificacao.data, true)}</div>
                            </div>
                        </div>
                        <div className="p-2">{notificacao.conteudo}</div>
                    </div>
                )
            }
            {
                notificacoes.length == 0 ? <div className="no-content-warning">Nenhuma notificação encontrada.</div> : null
            }
        </div>
    );
}

export default VisualizarNotificacoesComponent