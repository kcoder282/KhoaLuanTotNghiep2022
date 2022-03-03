import React from "react";
import ClassIndex from "./Component/ClassIndex/ClassIndex";
import Layout from "./Layout/Layout";

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
            <ClassIndex/>
        </Layout>
    );
}
