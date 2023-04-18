import React from 'react';
import RegisterComponent from '../components/registerComponent';

import Navbar from '../components/navbar';

function Cadastro() {
    return (
        <div>
            <Navbar />
            <div className="d-flex" style={{height: '80vh', minHeight: 700}}>
                <RegisterComponent />
            </div>
        </div>
    );
}
export default Cadastro;