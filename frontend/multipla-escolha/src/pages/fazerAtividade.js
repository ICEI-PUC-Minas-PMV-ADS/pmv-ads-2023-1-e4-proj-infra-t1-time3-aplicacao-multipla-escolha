import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../components/navbar';
import { Link, useParams } from 'react-router-dom';

import FazerAtividadeComponent from '../components/fazerAtividadeComponent';

function FazerAtividade() {  
    
    const params = useParams();

    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column container'>
                <div>
                    <FazerAtividadeComponent idAtividade={params.id}/>
                </div> 
            </div>
        </div>
    );
}
export default FazerAtividade;