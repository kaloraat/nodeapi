import React from "react";
import { BrowserRouter } from "react-router-dom";
import MainRouter from "./MainRouter";

const App = () => (
    <BrowserRouter>
        <MainRouter />
    </BrowserRouter>
);

export default App;
