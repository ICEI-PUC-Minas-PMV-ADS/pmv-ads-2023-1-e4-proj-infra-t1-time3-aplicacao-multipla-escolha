import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../context/userContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCaretUp, faL } from '@fortawesome/free-solid-svg-icons'

import axios from "axios";

import { baseUrl } from "../util/Constants";

function Navbar() {

    const userContext = useContext(UserContext);

    const loginRef = useRef();

    const [menuDropDownIsOpen, setMenuDropDownIsOpen] = useState(false);

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

    useEffect(() => {
        window.addEventListener('click', function (e) {
            if (!document.getElementById('dropdown-menu').contains(e.target) && !document.getElementById('dropdown-menu-click').contains(e.target)) {
                setMenuDropDownIsOpen(false);
            }
            else {
                setMenuDropDownIsOpen(true);
            }
        });
    }, []);

    function logoff() {
        closeDropdownMenu();
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
                loginRef.current.click();
            })
            .catch(function (error) {

            })
    }

    function closeDropdownMenu() {
        if (menuDropDownIsOpen) {
            setTimeout(() => setMenuDropDownIsOpen(false), 1);
        }
    }

    return (
        <div className="navbar">
            <div className="mx-4">
                <Link ref={loginRef} to="/login" />
                <Link to="/" className="text-decoration-none">
                    <p>Multípla Escolha</p>
                </Link>
            </div>
            {
                userContext.userData == null ?
                    <div className="mx-4 d-flex">
                        <Link to="/" className="text-decoration-none">
                            <p>INÍCIO</p>
                        </Link>
                        <Link to="/" className="text-decoration-none mx-4">
                            <p className="mx-4">SOBRE</p>
                        </Link>
                        <Link to="/login" className="text-decoration-none" >
                            <p>LOGIN</p>
                        </Link>
                        <span id="dropdown-menu-click"></span>
                    </div>
                    :
                    <div className="mx-4 d-flex align-items-end cursor-pointer" id="dropdown-menu-click" onClick={() => closeDropdownMenu()}>
                        <p>Olá, {userContext.userData.nomeCompleto}</p>
                        <FontAwesomeIcon icon={menuDropDownIsOpen ? faCaretUp : faCaretDown} className="text-white m-1"></FontAwesomeIcon>
                    </div>
            }
            <div className="dropdown-user" id="dropdown-menu" style={menuDropDownIsOpen ? {} : { display: 'none' }}>
                <ul>
                    <li className="my-1"><Link to="/minhas-turmas" className="text-decoration-none" style={{ color: 'white'}} onClick={() => closeDropdownMenu()}>Turmas</Link></li>
                    <li className="my-1"><Link to="/account-options" className="text-decoration-none" style={{ color: 'white' }} onClick={() => closeDropdownMenu()}>Perfil</Link></li>
                    <li className="my-1"><span className="cursor-pointer" onClick={() => logoff()} style={{ color: 'white' }}>Sair</span></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar