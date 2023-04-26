import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import EditarTurmaFormComponent from '../components/editarTurmaFormComponent';


function EditarTurma() {  

    const params = useParams();

    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column container'>
                <div className="m-auto mt-4">
                    <h1>Editar turma</h1>
                </div>
                <div>
                    <EditarTurmaFormComponent idTurma={params.id}/>
                </div> 
            </div>
        </div>
    );
}
export default EditarTurma;