import React from "react";
import ClassIndexManager from "./ClassIndexManager";
import Layout from "./Layout/Layout";

export default function App(data) {
    return (
        <Layout>
            <div className="p-3">
                <ClassIndexManager/>
            </div>
        </Layout>
    );
}
