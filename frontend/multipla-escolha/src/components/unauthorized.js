import React from "react";
import Navbar from "./navbar";

function Unauthorized() {
    return(
    <div>
        <Navbar />
    <div className="d-flex">
        <div className="m-auto">
            <h1 className="mt-4 pt-4">Não autorizado</h1>
        </div>
    </div>
    </div>
    );
}

export default Unauthorized