import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

import { UserContext } from '../context/userContext';

import MinhasTurmasComponent from '../components/minhasTurmasComponent';
import Unauthorized from '../components/unauthorized';

function MinhasTurmas() {  
    
    const userContext = useContext(UserContext);

    if (userContext.userData == null || userContext.userData.perfil != "Professor") {
        return (<Unauthorized/>)
    } 

    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column container'>
                <div className="m-auto mt-4">
                    <h1>Minhas turmas</h1>
                </div>
                <div>
                    <MinhasTurmasComponent/>
                </div> 
            </div>
        </div>
    );
}
export default MinhasTurmas;