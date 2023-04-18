import React from 'react';
import LoginComponent from '../components/loginComponent';

import Navbar from '../components/navbar';

function Login() {
    return (
        <div>
            <Navbar />
            <div className="d-flex" style={{height: '70vh', minHeight: 400}}> 
                <LoginComponent />
            </div>
        </div>
    );
}
export default Login;