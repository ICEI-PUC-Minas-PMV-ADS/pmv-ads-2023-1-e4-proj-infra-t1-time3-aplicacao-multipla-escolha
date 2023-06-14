import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

import { UserContext } from '../context/userContext';

import VisualizarNotificacoesComponent from '../components/visualizarNotificacoesComponent';

function Notificacoes() {  
    
    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column container'>
                <div>
                    <VisualizarNotificacoesComponent/>
                </div> 
            </div>
        </div>
    );
}
export default Notificacoes;