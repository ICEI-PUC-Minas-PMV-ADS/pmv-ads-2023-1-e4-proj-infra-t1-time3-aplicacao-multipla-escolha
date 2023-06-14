import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

import { UserContext } from '../context/userContext';

import BuscarTurmasComponent from '../components/buscarTurmasComponent';

function Notificacoes() {  
    
    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column container'>
                <div>
                    <BuscarTurmasComponent/>
                </div> 
            </div>
        </div>
    );
}
export default Notificacoes;