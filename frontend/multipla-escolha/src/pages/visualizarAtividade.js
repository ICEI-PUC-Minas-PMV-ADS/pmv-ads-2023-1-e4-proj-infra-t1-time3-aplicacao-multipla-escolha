import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../components/navbar';
import { Link, useParams } from 'react-router-dom';

import { UserContext } from '../context/userContext';

import VisualizarAtividadeComponent from '../components/visualizarAtividadeComponent';
import Unauthorized from '../components/unauthorized';

function VisualizarAtividade() {  
    
    const userContext = useContext(UserContext);

    const params = useParams();

    if (userContext.userData == null || userContext.userData.perfil != "Professor") {
        return (<Unauthorized/>)
    } 

    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column container'>
                <div className="m-auto mt-4">
                    <h1>Visualizar atividade</h1>
                </div>
                <div>
                    <VisualizarAtividadeComponent idAtividade={params.id}/>
                </div> 
            </div>
        </div>
    );
}
export default VisualizarAtividade;