import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ClassIndex from "./Component/ClassIndex/ClassIndex";
import Program from "./Component/Program/Program";
import Layout from "./Layout/Layout";
import PCGD from './Component/PCGD/PCGD';
import Login from './Component/Login';
import Home from './Component/Home';
import axios from "axios";

const api = 'http://127.0.0.1:8000/api/';
export const host = (data, value = {}) => {
    var search = [];
    value = {...value, token: key()};
    for (const key in value) {
        search.push(`${key}=${value[key]}`)
    }
    return api + data + '?' + search.join('&') ;
};
export const format = (data) => data.map((e, i) => ({ 'index': i + 1, 'key': e.id, ...e }));
function setCookie(cname, cvalue, extime) {
    const d = new Date();
    d.setTime(d.getTime() + extime * 10000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
export function setKey(value, time) {
    return setCookie("key", value, time);
}
function key() {
    let key = getCookie("key");
    setKey(key, 3600);
    return key;
}
export default function App(data) {
    const [user, setUser] = useState();
    useEffect(() => {
        axios.get(host('user'))
            .then((result) => {
                setUser(result.data)
            })
    }, [])
    return (
        <Layout user={user}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login user={[user, setUser]} />} />
                    <Route path="/" element={user?.id !== undefined ? <Home /> : <Login user={[user, setUser]} />} />
                    <Route path="/classIndex" element={user?.id !== undefined ? <ClassIndex /> : <Login user={[user, setUser]} />} />
                    <Route path="/program/:name/:id" element={user?.id !== undefined ? <Program /> : <Login user={[user, setUser]} />} />
                    <Route path="/PCGD/:name/:id" element={user?.id !== undefined ? <PCGD /> : <Login user={[user, setUser]} />} />
                    <Route path=":all" element={'404'}/>
                </Routes>
            </BrowserRouter>
        </Layout>
    );
}
