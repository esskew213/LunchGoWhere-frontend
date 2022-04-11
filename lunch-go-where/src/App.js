import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Result from "./pages/Result";
import NewStall from "./pages/NewStall";
import { FavoriteSharp } from "@mui/icons-material";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/new" element={<NewStall />} />
            <Route path="/result/:id" element={<Result />} />
            <Route path="/logout" element={<Navigate replace to="/" />} />
        </Routes>
    );
}

export default App;
