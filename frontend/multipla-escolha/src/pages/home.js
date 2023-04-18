import React from 'react';
import Navbar from '../components/navbar';

function Home() {
    return (
        <div>
            <Navbar />
            <div className='d-flex'>
                <div className="m-auto mt-4">
                    <h1>Homepage</h1>
                </div>
            </div>
        </div>
    );
}
export default Home;