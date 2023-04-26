import React, {useState, useEffect, useContext} from 'react';
import Navbar from '../components/navbar';

import CriarTurmaFormComponent from '../components/criarTurmaFormComponent';

function CriarTurma() {  

    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column container'>
                <div>
                    <CriarTurmaFormComponent />
                </div> 
            </div>
        </div>
    );
}
export default CriarTurma;