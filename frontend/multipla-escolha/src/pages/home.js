import React from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column container'>
                <div className="m-auto mt-4">
                    <h1>Homepage</h1>
                </div>
                <div className='d-flex flex-column'>
                    <h2 className='mb-4'>Opções</h2>
                    <Link className='btn btn-primary mb-2 col-md-2' to="/turmas">Buscar turma</Link>
                    <Link className='btn btn-primary mb-2 col-md-2' to="/minhas-turmas">Minhas turmas</Link>
                </div> 
            </div>
        </div>
    );
}
export default Home;