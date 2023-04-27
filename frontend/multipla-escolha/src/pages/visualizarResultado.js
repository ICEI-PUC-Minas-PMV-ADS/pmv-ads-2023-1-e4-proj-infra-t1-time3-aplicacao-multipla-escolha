import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../components/navbar';
import { Link, useParams } from 'react-router-dom';

import VisualizarResultadoComponent from '../components/visualizarResultadoComponent';

function VisualizarResultado() {  
    
    const params = useParams();

    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column container'>
                <div>
                    <VisualizarResultadoComponent idResultado={params.id}/>
                </div> 
            </div>
        </div>
    );
}
export default VisualizarResultado;