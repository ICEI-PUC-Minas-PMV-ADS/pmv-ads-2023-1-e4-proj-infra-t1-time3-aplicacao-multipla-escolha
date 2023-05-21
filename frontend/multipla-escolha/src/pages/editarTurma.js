import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

import EditarTurmaFormComponent from "../components/editarTurmaFormComponent";

function EditarTurma() {
  const params = useParams();

  return (
    <div>
      <Navbar />
      <EditarTurmaFormComponent idTurma={params.id} />
    </div>
  );
}
export default EditarTurma;
