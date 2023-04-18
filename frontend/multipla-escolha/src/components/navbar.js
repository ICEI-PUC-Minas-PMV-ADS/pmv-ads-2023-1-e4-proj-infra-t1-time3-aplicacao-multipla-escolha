import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../context/userContext";

import axios from "axios";

import { baseUrl } from "../util/Constants";

function Navbar() {

    const userContext = useContext(UserContext);

    useEffect(() => {
        axios.get('https://localhost:7284/api/Usuarios/Info',
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                userContext.setUserData(response.data);
                userContext.setUserSignedIn(true);
            })
            .catch(function (error) {
                userContext.setUserData(null);
                userContext.setUserSignedIn(false);
            })
    }, []);

    function logoff() {
        axios.post(baseUrl + 'api/Usuarios/logout',
            {

            },
            {
                headers: {
                    "Content-Type": "application/JSON"
                },
                withCredentials: true
            }
        )
            .then(function (response) {
                userContext.setUserData(null);
                userContext.setUserSignedIn(false);
            })
            .catch(function (error) {

            })
    }

    return (
        <div className="navbar">
            <div className="mx-4">
                <Link to="/" className="text-decoration-none">
                    <p>Logo</p>
                </Link>
            </div>
            {
                userContext.userData == null ?
                    <div className="mx-4">
                        <Link to="/login" className="text-decoration-none">
                            <p>Login</p>
                        </Link>
                    </div>
                    :
                    <div className="mx-4">
                        <p>Olá, {userContext.userData.nomeCompleto} | <Link to="/accountOptions" className="text-decoration-none" style={{ color: 'white' }}>Opções da conta</Link> | <span className="logoff-button" onClick={() => logoff()}>Logoff</span></p>
                    </div>
            }
        </div>
    );
}

export default Navbar