import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../components/navbar';
import { Link, useParams } from 'react-router-dom';

import VisualizarAtividadeComponent from '../components/visualizarAtividadeComponent';

function VisualizarAtividade() {  
    
    const params = useParams();

    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column container'>
                <div>
                    <VisualizarAtividadeComponent idAtividade={params.id}/>
                </div> 
            </div>
        </div>
    );
}
export default VisualizarAtividade;