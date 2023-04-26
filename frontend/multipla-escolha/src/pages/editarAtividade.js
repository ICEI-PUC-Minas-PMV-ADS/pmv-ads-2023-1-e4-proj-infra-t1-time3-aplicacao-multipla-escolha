import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../components/navbar';
import { Link, useParams } from 'react-router-dom';

import { UserContext } from '../context/userContext';

import EditarAtividadeFormComponent from '../components/editarAtividadeFormComponent';
import Unauthorized from '../components/unauthorized';

function EditarAtividade() {  
    
    const userContext = useContext(UserContext);

    const params = useParams();

    if (userContext.userData == null || userContext.userData.perfil != "Professor") {
        return (<Unauthorized/>)
    } 

    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column container'>
                <div>
                    <EditarAtividadeFormComponent idAtividade={params.id}/>
                </div> 
            </div>
        </div>
    );
}
export default EditarAtividade;