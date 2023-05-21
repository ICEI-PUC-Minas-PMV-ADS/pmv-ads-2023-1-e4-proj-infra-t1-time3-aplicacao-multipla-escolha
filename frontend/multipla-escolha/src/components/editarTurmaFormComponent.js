import React, { useState, useEffect, useRef, useContext } from "react";
import { baseUrl } from "../util/Constants";
import axios from "axios";
import { Link } from "react-router-dom";

import Loading from "./loading";
import Unauthorized from "./unauthorized";
import { UserContext } from "../context/userContext";

function EditarTurmaFormComponent({ idTurma }) {
  const userContext = useContext(UserContext);

  const linkRef = useRef();

  const [nome, setNome] = useState("");

  const [descricao, setDescricao] = useState("");

  const [ativo, setAtivo] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  const [turmaLoaded, setTurmaLoaded] = useState(null);

  useEffect(() => {
    axios
      .get(baseUrl + "api/Turmas/" + idTurma, {
        headers: {
          "Content-Type": "application/JSON",
        },
        withCredentials: true,
      })
      .then(function (response) {
        const turma = response.data;
        setNome(turma.nome);
        setDescricao(turma.descricao);
        setAtivo(turma.ativo);
        setTurmaLoaded(true);
      })
      .catch(function (error) {});
  }, []);

  function atualizarTurma() {
    if (nome.trim().length < 1) {
      document.getElementById("nome").focus();
      return setErrorMessage("Preencher nome da turma!");
    }

    if (descricao.trim().length < 1) {
      document.getElementById("descricao").focus();
      return setErrorMessage("Preencher descrição da turma!");
    }

    axios
      .put(
        baseUrl + "api/Turmas",
        {
          id: idTurma,
          nome: nome,
          descricao: descricao,
          ativo: ativo,
        },
        {
          headers: {
            "Content-Type": "application/JSON",
          },
          withCredentials: true,
        }
      )
      .then(function (response) {
        window.alert("Turma atualizada com sucesso!");
        linkRef.current.click();
      })
      .catch(function (error) {
        setErrorMessage(error.request.response);
      });
  }

  if (userContext.userSignedIn === false || turmaLoaded == false) {
    return <Unauthorized />;
  }

  if (turmaLoaded == null) return;
  <div>
    <Loading />
  </div>;

  return (
    <div className="register-box">
      <div className="d-flex text-center my-2">
        <h1 className="text-dark-gray">Editar turma</h1>
      </div>
      <div>
        <Link ref={linkRef} to="/minhas-turmas" />
        <div className="d-flex flex-column m-auto mt-4 w-100">
          <label for="nome">Nome da turma</label>
          <input
            className="mb-2 input-text"
            id="nome"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              setErrorMessage("");
            }}
          ></input>
          <label for="descricao">Descrição</label>
          <textarea
            style={{ height: 150, width: 750 }}
            className="mb-2 input-text"
            id="descricao"
            value={descricao}
            onChange={(e) => {
              setDescricao(e.target.value);
              setErrorMessage("");
            }}
          ></textarea>

          <div className="m-1">
            <div className="d-flex align-items-center">
              <input
                htmlFor="turma-ativa"
                type="radio"
                checked={ativo}
                onClick={() => setAtivo(true)}
              ></input>
              <label
                for="turma-ativa"
                className="mx-1"
                onClick={() => setAtivo(true)}
              >
                Turma Ativa
              </label>
            </div>
            <div className="d-flex align-items-center">
              <input
                htmlFor="turma-inativa"
                type="radio"
                checked={!ativo}
                onClick={() => setAtivo(false)}
              ></input>
              <label
                for="turma-inativa"
                className="mx-1"
                onClick={() => setAtivo(false)}
              >
                Turma Inativa
              </label>
            </div>
          </div>
          <div className="d-flex mb-2" style={{ height: 24 }}>
            <div className="m-auto" style={{ color: "red" }}>
              {errorMessage}
            </div>
          </div>
          <div className="m-auto">
            <button
              className="btn btn-primary"
              onClick={() => atualizarTurma()}
            >
              Atualizar dados
            </button>
            <button
              className="btn btn-secondary mx-2"
              onClick={() => linkRef.current.click()}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarTurmaFormComponent;
