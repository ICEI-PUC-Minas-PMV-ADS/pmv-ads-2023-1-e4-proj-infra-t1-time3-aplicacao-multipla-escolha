import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar">
            <div className="mx-4">
                <Link to="/">
                    <text>Logo</text>
                </Link>
            </div>
            <div className="mx-4">
                <Link to="/login">
                    <text>Login</text>
                </Link>
            </div>
        </div>
    );
}

export default Navbar