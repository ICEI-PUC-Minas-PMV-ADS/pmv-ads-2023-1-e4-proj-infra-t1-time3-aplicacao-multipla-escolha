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
                <div className=''>
                    <h2 className='mb-4'>Opções do professor</h2>
                    <Link className='btn btn-primary mb-2' to="/minhas-turmas">Minhas turmas</Link>
                </div> 
            </div>
        </div>
    );
}
export default Home;