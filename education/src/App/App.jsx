import React from "react";
import Layout from "./Layout/Layout";
import ProgramEducationManager from "./ProgramEducation/ProgramEducationManager";

export default function App(data) {
    return (
        <Layout>
            <div className="p-3">
                <ProgramEducationManager/>
            </div>
        </Layout>
    );
}
