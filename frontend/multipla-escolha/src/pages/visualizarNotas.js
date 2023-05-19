import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../components/navbar';
import { Link, useParams } from 'react-router-dom';

import VisualizarNotaComponent from '../components/visualizarNotaComponent';
import VisualizarAlunosTurmaComponent from '../components/visualizarAlunosTurmaComponent';

function VisualizarNotas() {  
    
    const params = useParams();

    if (params.idAluno == null) {
        return (
            <div>
                <Navbar />
                <div className='d-flex flex-column container'>
                    <div>
                        <VisualizarAlunosTurmaComponent idTurma={params.id}/>
                    </div> 
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column container'>
                <div>
                    <VisualizarNotaComponent idAluno={params.idAluno} idTurma={params.id}/>
                </div> 
            </div>
        </div>
    );
}
export default VisualizarNotas;