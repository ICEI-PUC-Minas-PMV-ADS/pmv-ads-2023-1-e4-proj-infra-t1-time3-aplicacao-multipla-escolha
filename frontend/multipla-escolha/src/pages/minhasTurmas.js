import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

import { UserContext } from '../context/userContext';

import MinhasTurmasProfessorComponent from '../components/minhasTurmasProfessorComponent';
import MinhasTurmasAlunoComponent from '../components/minhasTurmasAlunoComponent';

function MinhasTurmas() {  
    
    const userContext = useContext(UserContext);

    if (userContext == null || userContext.userData == null || userContext.userData.perfil == null){
        return (
            <div>
                <Navbar />
                <div className='d-flex flex-column container'>
                </div>
            </div>
        );
    }

    if (userContext.userData.perfil == "Professor") {
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

        return (
            <div>
                <Navbar />
                <div className='d-flex flex-column container'>
                    <div>
                        <MinhasTurmasAlunoComponent/>
                    </div> 
                </div>
            </div>
        );
}
export default MinhasTurmas;