import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';

import VisualizarTurmaComponent from '../components/visualizarTurmaComponent';

function VisualizarTurma() {

    const params = useParams();

    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column container'>
                <div>
                    <VisualizarTurmaComponent idTurma={params.id} />
                </div>
            </div>
        </div>
    );
}
export default VisualizarTurma;