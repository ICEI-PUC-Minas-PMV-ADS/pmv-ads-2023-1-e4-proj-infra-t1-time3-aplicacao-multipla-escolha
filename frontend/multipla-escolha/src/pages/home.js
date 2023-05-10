import React from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <Navbar />
            <div className='d-flex flex-column container'>
                <div className="m-auto mt-4">
                    <h1 className='text-dark-gray'>MULTÍPLA ESCOLHA</h1>
                </div>
            </div>
        </div>
    );
}
export default Home;