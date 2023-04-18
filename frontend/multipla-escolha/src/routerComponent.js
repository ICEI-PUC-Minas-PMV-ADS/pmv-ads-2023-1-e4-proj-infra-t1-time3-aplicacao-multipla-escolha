import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/home";

function RouterComponent() {
    return (
        <BrowserRouter>
            <Routes>
                <Route component = { Home }  path="/a" exact />
            </Routes>
        </BrowserRouter>
    );
}

export default RouterComponent;