import React from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

import image1 from "../images/ImgHomePage1.png";
import image2 from "../images/ImgHomePage2.png";
import image3 from "../images/ImgHomePage3.png";
import image4 from "../images/ImgHomePage4.png";

function Home() {
  return (
    <div>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ margin: "auto", marginTop: "5rem" }}>
          <h1 style={{ fontSize: "40px" }}>MULTIPLA ESCOLHA</h1>
        </div>
        <img
          src={image1}
          alt="Imagem 1"
          style={{
            margin: "auto",
            display: "block",
            width: "400px",
            height: "auto",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "6rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0 5rem",
            }}
          >
            <img
              src={image2}
              alt="Imagem 2"
              style={{ width: "250px", height: "auto" }}
            />
            <p style={{ textAlign: "center" }}>
              Uma plataforma amigável para alunos e professores.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0 5rem",
            }}
          >
            <img
              src={image3}
              alt="Imagem 3"
              style={{ width: "250px", height: "auto" }}
            />
            <p style={{ textAlign: "center" }}>
              Acompanhe o seu progresso junto com o professor.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0 5rem",
            }}
          >
            <img
              src={image4}
              alt="Imagem 4"
              style={{ width: "250px", height: "auto" }}
            />
            <p style={{ textAlign: "center", width: 320 }}>
              Realize suas atividades e avaliações de qualquer lugar, pelo
              computador ou celular.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "4rem",
            width: 400,
          }}
        >
          <h2 style={{ fontSize: "35px", color: "#555", textAlign: "center" }}>
            Caso tenha dúvidas, não hesite em nos contatar.
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "4rem",
            marginBottom: 200,
          }}
        >
          <h2 style={{ fontSize: "35px", color: "#555", textAlign: "center" }}>
            Adoramos ajudar pessoas.
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
