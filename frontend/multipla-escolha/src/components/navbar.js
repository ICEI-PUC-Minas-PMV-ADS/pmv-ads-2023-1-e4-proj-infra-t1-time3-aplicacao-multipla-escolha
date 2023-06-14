import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../context/userContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

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
            <div style={{ marginLeft: '4vw' }}>
                <Link ref={loginRef} to="/login" />
                <Link to="/" className="text-decoration-none">
                    <p>Multípla Escolha</p>
                </Link>
            </div>
            <div style={{ marginRight: '4vw' }}>
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
                        <div className="d-flex cursor-pointer">
                            <Link to="/notificacoes" style={{ position: 'relative', width: 24, marginTop: 5}}>
                                <FontAwesomeIcon icon={faBell} className="text-white" style={{ fontSize: 21 }}></FontAwesomeIcon>
                                {(userContext.userData.numeroDeNotificacoesNaoLidas == 0 || userContext.userData.numeroDeNotificacoesNaoLidas == null) ?
                                    null
                                    :
                                    <div style={{ position: 'absolute', height: 19, width: 19, borderRadius: 24, backgroundColor: '#6082B6', bottom: 0, right: -6, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {
                                            userContext.userData.numeroDeNotificacoesNaoLidas < 100 ?
                                                (
                                                    userContext.userData.numeroDeNotificacoesNaoLidas < 10 ?
                                                        <span style={{ color: 'white', fontWeight: 'bold', marginBottom: 1 }}>{userContext.userData.numeroDeNotificacoesNaoLidas}</span>
                                                        :
                                                        <span style={{ color: 'white', fontWeight: 'bold', marginBottom: 1, fontSize: 12 }}>{userContext.userData.numeroDeNotificacoesNaoLidas}</span>
                                                )
                                                :
                                                <span style={{ color: 'white', fontWeight: 'bold', fontSize: 10 }}>99+</span>
                                        }
                                    </div>
                                }
                            </Link>
                            <div className="mx-4 d-flex align-items-end cursor-pointer" id="dropdown-menu-click" onClick={() => closeDropdownMenu()}>
                                <p>Olá, {userContext.userData.nomeCompleto}</p>
                                <FontAwesomeIcon icon={menuDropDownIsOpen ? faCaretUp : faCaretDown} className="text-white m-1"></FontAwesomeIcon>
                            </div>
                        </div>
                }
            </div>
            <div className="dropdown-user" id="dropdown-menu" style={menuDropDownIsOpen ? {} : { display: 'none' }}>
                <ul>
                    <li className="my-1"><Link to="/minhas-turmas" className="text-decoration-none" style={{ color: 'white' }} onClick={() => closeDropdownMenu()}><p>Turmas</p></Link></li>
                    <li className="my-1"><Link to="/account-options" className="text-decoration-none" style={{ color: 'white' }} onClick={() => closeDropdownMenu()}><p>Perfil</p></Link></li>
                    <li className="my-1"><span className="cursor-pointer" onClick={() => logoff()} style={{ color: 'white' }}><p>Sair</p></span></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar