import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

import { UserContext } from '../context/userContext';
import { useParams } from 'react-router-dom';

import VisualizarTurmaComponent from '../components/visualizarTurmaComponent';
import Unauthorized from '../components/unauthorized';


function VisualizarTurma() {  
    
    const userContext = useContext(UserContext);

    const params = useParams();

    if (userContext.userData == null || userContext.userData.perfil != "Professor") {
        return (<Unauthorized/>)
    } 

    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column container'>
                <div className="mt-4">
                    <h1>Visualizar turma</h1>
                </div>
                <div>
                    <VisualizarTurmaComponent idTurma={params.id}/>
                </div> 
            </div>
        </div>
    );
}
export default VisualizarTurma;