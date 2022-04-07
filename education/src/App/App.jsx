import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClassIndex from "./Component/ClassIndex/ClassIndex";
import Program from "./Component/Program/Program";
import Layout from "./Layout/Layout";
import PCGD from './Component/PCGD/PCGD';
import Login from './Component/Login';
import Home from './Component/Home';

const api = 'http://127.0.0.1:8000/api/';
export const host = (data, value = {}) => {
    var search = [];
    for (const key in value) {
        search.push(`${key}=${value[key]}`)
    }
    return api + data + '?' + search.join('&');
};
export const format = (data) => data.map((e, i) => ({ 'index': i + 1, 'key': e.id, ...e }));

export default function App(data) {
    return (
        <Layout>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/classIndex" element={<ClassIndex />} />
                    <Route path="/program/:name/:id" element={<Program/>}/>
                    <Route path="/PCGD/:name/:id" element={<PCGD />} /> 
                </Routes>
            </BrowserRouter>
        </Layout>
    );
}
