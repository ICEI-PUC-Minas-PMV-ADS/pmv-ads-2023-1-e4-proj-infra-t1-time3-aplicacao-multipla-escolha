import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

import { UserContext } from '../context/userContext';

import MinhasTurmasProfessorComponent from '../components/minhasTurmasProfessorComponent';

function MinhasTurmas() {  
    
    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column container'>
                <div>
                    <MinhasTurmasProfessorComponent/>
                </div> 
            </div>
        </div>
    );
}
export default MinhasTurmas;