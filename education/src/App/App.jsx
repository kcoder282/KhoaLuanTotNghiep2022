import React from "react";
import ClassIndexManager from "./ClassIndex/ClassIndexManager";
import Layout from "./Layout/Layout";
// import ProgramEducationManager from "./ProgramEducation/ProgramEducationManager";

export default function App(data) {
    return (
        <Layout>
            <div className="p-3">
                <ClassIndexManager/>
            </div>
        </Layout>
    );
}
