import React from 'react'

export default function Layout({ children }) {

    return (
        <div className='d-flex flex-column' style={{height:'100vh'}}>
            <header className="shadow py-2 px-3 position-sticky bg-light" style={{ top: 0 }}>
                <div className="text-uppercase h3 text-primary m-0 d-flex align-items-center">
                    Education
                </div>
            </header>    
            {children}
        </div>
    )
}
